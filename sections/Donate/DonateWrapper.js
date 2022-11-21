import styled from 'styled-components';
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useContractEvent,
  useNetwork,
  useSwitchNetwork,
  useContractRead,
} from 'wagmi';
import { useState, useEffect } from 'react';
import { useApp } from '../../sections/utils/appContext';
import axios from 'axios';
import BalanceComponent from '../../components/functional/BalanceComponent';
import ApprovedComponent from '../../components/functional/ApprovedComponent';
import Button from '../../components/buttons/Button';
import { SuccessIcon } from '../../components/icons/Common';
import donation from '../../abi/donation.json';
import token from '../../abi/token.json';
import { useRouter } from 'next/router';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { Row, RowCenter } from '../../components/format/Row';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ErrText from '../../components/typography/ErrText';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { DonateActiveIcon } from '../../components/icons/Project';
import { MainContainer } from '../../components/format/Box';
import Tooltip from '../../components/Tooltip';
import LogResult from '../LogResult'


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
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // @ts-ignore
  const { appState } = useApp();
  const { rewMAmount, rewDAmount, rewEligible, rewObjectId, rewId } = appState;
  const sum = parseInt(rewMAmount) + parseInt(rewDAmount);
  const router = useRouter();
  const { objectId } = router.query;
  const [spender, setSpender] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const [ready,setReady] = useState(false)
  const [donateTooltip, setDonateTooltip] = useState(false);

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
    all = Number(allowance.data.toString());
  }

  const useEv = () => {
    setSuccess(true);
    updateBookmark(bookmarks);
    if (rewEligible > 0){
      updateReward();
    }
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

  const { config, error } = usePrepareContractWrite({
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'contribute',
    args: [rewMAmount, rewDAmount, pid, curr, rewId],
  });

  const { write, data } = useContractWrite(config);

  const handleSubmit = async () => {
    await write?.();
    if (!error){
      await setReady(true)
    }
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


  const updateReward = async () => {
    const [newDonors] = [...newDonors, address];
    try{
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward/${rewObjectId}`, { eligibleActual: rewEligible - 1, donors: newDonors }, moralisApiConfig);
      setApiError(false)
    } catch (er) {
      setApiError(true)
    }
  }

  return <>
    <MainContainer>
      {chain && home === chain.id ? (
        <RowCenter>
          {success ? (
            <SuccessIcon width={50} />
          ) : (
            <>
              {address && (
                <Metrics>
                  <Row>Balance: <BalanceComponent address={address} token={currencyAddress} /></Row>
                  <Row><div>Approved: </div><ApprovedComponent address={address} currencyAddress={currencyAddress} /></Row>
                  {error ? <ErrText text={'Insufficient balance or allowance'}/> : null}
                </Metrics>
              )}
             {rewId === 0 && <ApproveUniversal amount={sum} tokenContract={currencyAddress} spender={spender} />}
             {rewId > 0 && <ApproveUniversal amount={sum} tokenContract={currencyAddress} spender={spender} />}
            </>
          )}
          <div>
            {!success && (
              <>
                {all && all < sum ? (
                  <Button text={<><DonateActiveIcon width={30}/></>}  onClick={() => handleSubmit()} error />
                ) : <>
                    {sum === 0 ? <>Cannot donate 0</> :                 
                  <div onMouseEnter={()=>{setDonateTooltip(true)}} onMouseLeave={()=>{setDonateTooltip(false)}}>
                    {donateTooltip && <Tooltip text='Donate to this project' margin={'-40px'} /> }
                    {rewId === 0 && <ButtonAlt onClick={() => handleSubmit()} text={<><DonateActiveIcon width={30}/></>} /> }
                    {rewId > 0 && <ButtonAlt onClick={() => handleSubmit()} text={<><DonateActiveIcon width={30}/></>}  /> }
                  </div> }
                </> }
              </>
            )}
          </div>
        </RowCenter>
      ) : (
        <Button text="Wrong network" onClick={() => switchNetwork(home)} width={'200px'} />
      )}   
    </MainContainer>
        {ready && <LogResult ev={success} error={error} apiError={apiError} success={success} type={'Donation initialized'} data={data}/>}
  </>
};

export default DonateWrapper;
