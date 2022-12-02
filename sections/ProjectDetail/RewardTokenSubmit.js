import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import donation from '../../abi/donation.json';
import token from '../../abi/token.json';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { ColRight } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
`;

const RewardTokenSubmit = ({ add, home, pid, tokenAddress, cap, tokenAmount }) => {
  const [ev, setEv] = useState(false);
  const { rewardState, setRewardState } = useReward();
  const {  loading } = rewardState;
  const dispatch = useDispatch() 

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }


  var total = cap * tokenAmount;

  const listened = async () => {
    setEv(true);
    noti('NFT Approved', 'success')
  };

  const handleSubmit = async () => {
    write?.();
    setRewardState((prev) => ({ ...prev, loading: true }))
  };

  useContractEvent({
    address: tokenAddress,
    abi: token.abi,
    eventName: 'Approval',
    listener: (event) => listened(event),
    once: true,
  });

  const {write} = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, total, tokenAddress, 1],
  })


  
  return (
    <ColRight>
      <ButtonBox>
        <ApproveUniversal tokenContract={tokenAddress} spender={add} amount={total} dec={1} />
        {!loading ? <ButtonAlt
            text={'Create reward'}
            onClick={() => {
              handleSubmit();
            }}
          /> : <ButtonAlt text={'Loading...'} disabled={true} />}
      </ButtonBox>
    </ColRight>
  );
};

export default RewardTokenSubmit;
