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
import { Row, RowEnd } from '../../components/format/Row';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ErrText from '../../components/typography/ErrText';


const Metrics = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const DonateWrapper = ({ pid, bookmarks, currencyAddress, curr, add, home, rid }) => {
  const { address } = useAccount();
  const [explorer, setExplorer] = useState('https://mumbai.polygonscan.com/tx/');
  const [success, setSuccess] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // @ts-ignore
  const { appState } = useApp();
  const { rewMAmount, rewDAmount } = appState;
  const sum = rewMAmount + rewDAmount;

  const router = useRouter();
  const { objectId } = router.query;
  const [spender, setSpender] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);

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
    args: [rewMAmount, rewDAmount, pid, curr, rid],
  });

  const { write, data } = useContractWrite(config);

  const handleSubmit = async () => {
    await write?.();
    if (home === 80001) {
      setExplorer('https://mumbai.polygonscan.com/tx/');
    } else if (home === 97) {
      setExplorer('https://bscscan.com/tx/');
    } else if (home === 4002) {
      setExplorer('https://testnet.ftmscan.com/tx');
    }
  };

  const updateBookmark = async (bookmarks) => {
    const newBookmarks = [...bookmarks, address];
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${objectId}`, { bookmarks: newBookmarks }, moralisApiConfig);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {chain && home === chain.id ? (
        <RowEnd>
          {success ? (
            <SuccessIcon width={50} />
          ) : (
            <>
              {address && (
                <Metrics>
                  <Row>Balance: <BalanceComponent address={address} token={currencyAddress} /></Row>
                  <Row>Approved: <ApprovedComponent address={address} currencyAddress={currencyAddress} /></Row>
                </Metrics>
              )}
             {rid === 0 && <ApproveUniversal amount={sum} tokenContract={currencyAddress} spender={spender} />}
             {rid > 0 && <ApproveUniversal amount={sum} tokenContract={currencyAddress} spender={spender} />}
            </>
          )}
          <div>
            {!success && (
              <>
                {all && all < sum ? (
                  <Button text="Donate" width={'200px'} onClick={() => handleSubmit()} error />
                ) : (
                  <>
                    {rid === 0 && <Button onClick={() => handleSubmit()} text="Donate" width={'200px'} /> }
                    {rid > 0 && <Button onClick={() => handleSubmit()} text="Donate" width={'200px'} /> }
                  </>
                )}
              </>
            )}
            {!error && success && (
              <a href={`${explorer}${data.hash}`} target="_blank" rel="noopener noreferrer">
                <Button text="Transaction detail" />
              </a>
            )}
          </div>
          {error ? <ErrText>Insufficient balance or allowance</ErrText> : null}
        </RowEnd>
      ) : (
        <Button text="Wrong network" onClick={() => switchNetwork(home)} width={'200px'} />
      )}
    </div>
  );
};

export default DonateWrapper;
