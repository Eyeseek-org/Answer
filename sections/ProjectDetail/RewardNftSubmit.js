import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import donation from '../../abi/donation.json';
import multi from '../../abi/multi.json';
import ApproveNftUniversal from '../../components/buttons/ApproveNftUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import ErrText from '../../components/typography/ErrText';
import { useReward } from '../utils/rewardContext';
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
`;

const RewardNftSubmit = ({ add, home, pid, pledge, tokenAddress, nftId, cap }) => {
  const [ev, setEv] = useState(false);

  const { rewardState, setRewardState } = useReward();
  const {  loading } = rewardState;
  const dispatch = useDispatch() 

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }

  const handleSubmit = async () => {
    write?.();
    setRewardState((prev) => ({ ...prev, loading: true }))
  };

  const listened = async () => {
    setEv(true);
    noti('NFT Approved', 'success')
  };

  useContractEvent({
    address: tokenAddress,
    abi: multi.abi,
    eventName: 'ApprovalForAll',
    listener: (event) => listened(event),
    once: true,
  });

  const {write, error} = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'createNftReward',
    args: [pid, cap, tokenAddress, nftId, 1],
  })


  return (
    <Container>
      <ButtonBox>
        <ApproveNftUniversal tokenContract={tokenAddress} spender={add} cap={cap} nftId={nftId} />
        {!loading ? <ButtonAlt
            text={'Create reward'}
            onClick={() => {
              handleSubmit();
            }}
          /> : <ButtonAlt text={<div>Waiting for blockchain... <Lottie height={50} width={50} options={loadingAnim} /></div>} disabled={true} />}
      </ButtonBox>
      {error && <ErrText text={'Missing/Incorrect parameter'} />}
    </Container>
  );
};

export default RewardNftSubmit;
