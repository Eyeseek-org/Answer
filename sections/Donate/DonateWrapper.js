import styled from 'styled-components';
import { useContractWrite, useAccount, useContractEvent, useNetwork, useContractRead} from 'wagmi';
import { useState, useEffect } from 'react';
import { useApp } from '../../sections/utils/appContext';
import axios from 'axios';
import BalanceComponent from '../../components/functional/BalanceComponent';
import ApprovedComponent from '../../components/functional/ApprovedComponent';
import donation from '../../abi/donation.json';
import token from '../../abi/token.json';
import { useRouter } from 'next/router';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { Row, RowCenter} from '../../components/format/Row';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ErrText from '../../components/typography/ErrText';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { DonateErrIcon, DonateFormIcon } from '../../components/icons/Project';
import { MainContainer } from '../../components/format/Box';
import Tooltip from '../../components/Tooltip';
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'
import Socials from '../../components/buttons/Socials';
import LoaderSmall from '../../components/animated/LoaderSmall'

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10%;
  gap: 5%;
  animation: fadeIn 1.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Metrics = styled.div`
  font-family: 'Gemunu Libre';
  @media (max-width: 768px) {
    display: none;
  }
`;

const DonateWrapper = ({ pid, bookmarks, currencyAddress, curr, add, home }) => {
  const { address } = useAccount();
  const [apiError, setApiError] = useState(false)
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const { chain } = useNetwork();
  // @ts-ignore
  const { appState } = useApp();
  const { rewMAmount, rewDAmount, rewEligible, rewObjectId, rewId, rewDonors } = appState;
  const sumWei  = (parseInt(rewMAmount) + parseInt(rewDAmount))
  const sum = (parseInt(rewMAmount) + parseInt(rewDAmount)) * 1000000;
  const router = useRouter();
  const { objectId } = router.query;
  const [spender, setSpender] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const [donateTooltip, setDonateTooltip] = useState(false);
  const dispatch = useDispatch() 


  const noti = (text, type) => {
    dispatch(notify(text, type))
  }

  useEffect(() => {
    setSpender(GetProjectFundingAddress(home));
  }, []);

  var all = 0;

  const allowance = useContractRead({
    address: currencyAddress,
    abi: token.abi,
    functionName: 'allowance',
    chainId: home,
    args: [address, add],
    watch: true,
  });

  if (allowance.data) {
    all = Number(allowance.data.toString()) / 1000000;
  }

  const useEv = async() => {
    setSuccess(true);
    updateBookmark(bookmarks);
    setReady(false)
    if (rewEligible > 0){
      await updateReward(rewDonors);
    }
    noti("It worked, GREAT JOB!!... now you can spam it to increase project chances :)", "success")
  };

  useContractEvent({
    address: add,
    abi: donation.abi,
    chainId: home,
    eventName: 'Donated',
    listener: (event) => useEv(event),
    once: true,
  });

  useContractEvent({
    address: add,
    abi: donation.abi,
    chainId: home,
    eventName: 'MicroCreated',
    listener: (event) => useEv(event),
    once: true,
  });

  const sixDonate = rewDAmount * 1000000; 
  const sixMicro = rewMAmount * 1000000; 
 
  const {write} = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'contribute',
    args: [sixMicro, sixDonate, pid, curr, rewId],
  })

  const handleSubmit = async () => {
    setReady(true)
    write?.();
  };

  const updateBookmark = async (bookmarks) => {
    const newBookmarks = [...bookmarks, address];
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${objectId}`, { bookmarks: newBookmarks }, moralisApiConfig);
      setApiError(false)
    } catch (er) {
      setApiError(true)
    }
  };


  const updateReward = async (donors) => {
    const newDonors = [...donors, {address: address, status: 0, id: donors.length}];
    try{
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward/${rewObjectId}`, { eligibleActual: rewEligible - 1, donors: newDonors}, moralisApiConfig);
      setApiError(false)
    } catch (er) {
      setApiError(true)
      noti("Reward was not claimed, contact us, we will solve it", "error")
    }
  }

  return <>
    <MainContainer>
      {chain && home === chain.id ? (
        <RowCenter>
          {success ? null : (
            <>
              {address && (
                <Metrics>
                  <Row>Balance: <BalanceComponent address={address} token={currencyAddress}  /></Row>
                  <Row><div>Approved: </div><ApprovedComponent address={address} currencyAddress={currencyAddress} /></Row>
                  {all < sumWei && <ErrText text={'Insufficient allowance'}/> }
                </Metrics>
              )}
             {rewId === 0 && <ApproveUniversal amount={sumWei} tokenContract={currencyAddress} spender={spender} dec={6} />}
             {rewId > 0 && <ApproveUniversal amount={sumWei} tokenContract={currencyAddress} spender={spender} dec={6}/>}
            </>
          )}
          <div>
            {!success && (
              <>
                {all && all < sumWei ? (
                  <ButtonAlt text={<><DonateErrIcon width={30}/></>}  onClick={() => handleSubmit()} />
                ) : <>
                    {sum === 0 ? null :                 
                  <Row onMouseEnter={()=>{setDonateTooltip(true)}} onMouseLeave={()=>{setDonateTooltip(false)}}>
                    {donateTooltip && <Tooltip text='Donate to this project' margin={'-40px'} /> }
                    {rewId === 0 && <ButtonAlt onClick={() => handleSubmit()} text={<><DonateFormIcon width={30}/></>} /> }
                    {rewId > 0 && <ButtonAlt onClick={() => handleSubmit()} text={<><DonateFormIcon width={30}/></>}  /> }
                    {ready && <LoaderSmall/>}
                  </Row> }
                </> }
              </>
            )}
          </div>
        </RowCenter>
      ) : null}   
      {success && <ButtonBox>
          <Socials text='I just donated to this project via Eyeeseek, come join me to support this cool idea'/>
          <ButtonAlt text="Back to homepage" onClick={() => window.location.href = `/`}/> 
        </ButtonBox>}
    </MainContainer>
  </>
};

export default DonateWrapper;
