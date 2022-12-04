import { useState, useEffect } from 'react';
import { useApp } from '../utils/appContext';
import Image from 'next/image';
import { usePrepareContractWrite, useContractEvent, useContractWrite, useNetwork, useAccount, useSwitchNetwork } from 'wagmi';
import axios from 'axios';
import {useTheme} from 'styled-components';
import SectionTitle from '../../components/typography/SectionTitle';
import { RulesContainer, RulesTitle, WarningBox, Li, Row, ImageBox, Summary, Err, SumTitle, SumValue, SumHalf, SumRow, SumHead, EyeBox} from './StylesCreate';
import FaqCard from '../../components/cards/FaqCard';
import { BookIcon } from '../../components/icons/Common';
import donation from '../../abi/donation.json';
import Eye10 from '../../public/Eye10.png';
import Rainbow from '../../components/buttons/Rainbow';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { BetweenRow, Col, RowEnd } from '../../components/format/Row';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { MainContainer } from '../../components/format/Box';
import LogResult from '../LogResult';
import { ChainName } from '../../helpers/MultichainHelpers';
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'
import {pushDiscordProject} from '../../data/discord/projectData'

const texts = [
  {
    title: 'Rules to follow to be eligible of Eyeseek funding',
    points: [
      'Owner has to inform regularly backers with project updates',
      'Projects must create something to share with others',
      'Projects and backer statistics must be honest and clearly presented',
      "Projects can't involve prohibited items",
    ],
  },
];

const Create = ({ setStep }) => {
  const { appState } = useApp();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [chainName, setChainName] = useState()
  const { pTitle, pDesc, category, subcategory, pm1, pType, pChain, pSocial, pWeb, pm1Desc, pYt } = appState;
  const [ev, setEv] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [oid, setOid] = useState(null);
  const [ready, setReady] = useState(false);
  const { switchNetwork } = useSwitchNetwork();
  const [add, setAdd] = useState("");
  const theme = useTheme()
  const dispatch = useDispatch() 

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  };


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const res = GetProjectFundingAddress(pChain);
    if (res){
      setAdd(res)
    }
  
    if (!chainName){
      setChainName(ChainName(pChain))
    }
  
  }, []);

  // Update project with PID retrieved from blockchain
  const handleUpdateMoralis = async (pid) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`,
        {
          pid: pid,
          state: 1, // Set active
        },
        moralisApiConfig
      );
      setSuccess(true);
      setApiError(false);
      noti("Congratulations, now you should spam your achievement :)", "success")
      if (process.env.NEXT_PUBLIC_ENV === "production"){
        pushDiscordProject(pTitle, pDesc, category, subcategory, pm1, pType, pChain, pSocial, pWeb, address, oid);
      }
    } catch (err) {
      setApiError(true);
      noti("Error while creating project, we will take a look", "error")
    }
  };


  // Event upon successful project creation on blockchain
  // Update state and project id (pid) as key between web2/web3
  const useEv = async (event) => {
    const pid = event - 1;
    handleUpdateMoralis(pid);
    // if (Array.isArray(event)) {
    //     const pid = parseInt(event[2] && event[2]) - 1;
    // }
    await setEv(true);
  };

  const Six = pm1 * 1000000;

  const { config, isError } = usePrepareContractWrite({
    address: add,
    abi: donation.abi,
    functionName: 'createFund',
    chainId: pChain,
    args: [Six]
  });

  const { write, error, data } = useContractWrite(config);

  const handleContract = async () => {
    write?.();
  };

  const handleMoralis = async (st) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DAPP}/classes/Project`,
        {
          title: pTitle,
          description: pDesc,
          category: category,
          subcategory: subcategory,
          urlProject: pSocial,
          urlSocials: pWeb,
          youtube: pYt,
          goal: Number(pm1),
          descM: pm1Desc,
          type: pType,
          owner: address,
          state: st,
          chainId: pChain,
          bookmarks: [address], // Add owner to bookmark
          verified: false,
        },
        moralisApiConfig
      );
      setOid(res.data.objectId);
      setApiError(false);
      if (pType === 'Stream'){
        setSuccess(true)
      }
    } catch (err) {
      console.log(err);
      setApiError(true);
    }
  };

  const handleSubmit = async () => {
      setReady(true);
      if (pType !== 'Stream') {
        await handleMoralis(0);
        await handleContract();
      } else if (pType === 'Stream') {
        await handleMoralis(1);
        noti("GJ, dude that was quick...you should spam it :)", "success")
      }
  }

  useContractEvent({
    address: add,
    abi: donation.abi,
    eventName: 'FundCreated',
    chainId: pChain,
    listener: (event) => useEv(event),
    once: true,
  });

  return (
    <MainContainer>
      <SectionTitle title="Create project" subtitle="Meet crowdfunding rules" />
      <RulesContainer>
        <RulesTitle>Conditions and rules</RulesTitle>
        <WarningBox> 
          <Li>
            If any of your goals are not met in 30 days of crowdfunding period, collected resources will be returned back to the backers. No
            fees will be collected by Eyeseek.
          </Li>
          <Li>If your project is sucessfully funded, Eyeseek will collect 1% fee from the funding total.</Li>
          <Row>
            <ImageBox>
              <BookIcon width={150} color={theme.colors.icon} />
            </ImageBox>
            <FaqCard answer={texts[0].title} points={texts[0].points} />
          </Row>
        </WarningBox>
        {address ? (
          <Summary>
            <SumHead>Summary</SumHead>
            <SumRow>
              <SumHalf align={'left'}>
                <Col><SumTitle>Funding type</SumTitle> <SumValue>{pType}</SumValue></Col>
                <Col><SumTitle>Title</SumTitle><SumValue>{pTitle}</SumValue></Col>
                <Col><SumTitle>Category</SumTitle><SumValue> {category}-{subcategory}</SumValue></Col>
             {chainName && <Col><SumTitle>Destination chain</SumTitle><SumValue>{chainName}</SumValue></Col>}
                <Col><SumTitle>Funding goal</SumTitle><SumValue>${pm1}</SumValue></Col>
               <Col><SumTitle>Owner</SumTitle><SumValue> {address}</SumValue></Col>
              </SumHalf>
              <EyeBox>
                <Image src={Eye10} alt="Eye" width={'200px'} height={'150px'} />{' '}
              </EyeBox>
              <SumHalf align={'right'}></SumHalf>
            </SumRow>
          </Summary>
        ) : (
          <Rainbow />
        )}
        {!ready ? (
          <>
            {chain && pChain === chain.id ? (
              <BetweenRow>
                <ButtonAlt onClick={handleBack} text='Back'/>
              {pType === 'Stream' ? (
                  <ButtonAlt onClick={handleSubmit} text='Create project'/>
                ) : <>
                    {error ?
                        <>
                          <ErrText text="Transaction failed or rejected" />
                          <ButtonAlt onClick={handleSubmit} text='Retry'/>
                        </> : <ButtonAlt disabled={!write} onClick={handleSubmit} text='Create project'/>
                      }
                    </>
                }
              </BetweenRow>
            ) : (
              <ButtonAlt onClick={() => { switchNetwork(pChain)}} text ='Wrong network' />
      )}
          </>
        ) : (
          <>
            {pType === 'Stream' ? (
               <LogResult apiError={apiError} type={'Stream project initialized'}/>
            ) : (
              <LogResult ev={ev} err={error} apiError={apiError} success={success} type={'Project creation initiated'} data={data}/>
            )}
          </>
        )}
         {success &&
         <RowEnd>
            <ButtonAlt text="Back to homepage" onClick={() => window.location.href = `/`}/> 
            <ButtonAlt text="Go to project" onClick={() => window.location.href = `/project/${oid}`}/>
         </RowEnd>}
        
        {isError && pType !== 'Stream' && <Err>Smart contract error, check if all your data inputs are valid</Err>}
      </RulesContainer>
    </MainContainer>
  );
};

export default Create;
