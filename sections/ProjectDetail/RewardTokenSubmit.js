import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import token from '../../abi/token.json';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { ColRight } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';
import { notify } from 'reapop'
import { useDispatch } from 'react-redux'
import { loadingAnim } from '../../components/animated/Animations';
import Lottie from 'react-lottie';
import ApprovedComponent from '../../components/functional/ApprovedComponent';


const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
`;

const RewardTokenSubmit = ({ add, home, pid, tokenAddress, cap, tokenAmount }) => {
  const [ev, setEv] = useState(false);
  const { rewardState, setRewardState } = useReward();
  const { loading } = rewardState;
  const dispatch = useDispatch()

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }


  var total = cap * tokenAmount;

  const listened = async () => {
    setEv(true);
    noti('ERC20 Approved', 'success')
    setRewardState((prev) => ({ ...prev, loading: false }))
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

  const { write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: diamondAbi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, total, tokenAddress, 1],
  })



  return (
    <ColRight>
      <ButtonBox>
        <ApprovedComponent address={add} tokenAddress={tokenAddress}  />
        <ApproveUniversal tokenContract={tokenAddress} spender={add} amount={total}  />
        {!loading ? <ButtonAlt
          text={'Create reward'}
          onClick={() => {
            handleSubmit();
          }}
        /> : <ButtonAlt text={
          <div>
            {error ? <Row>Repeat request  <Lottie height={50} width={50} options={errAnim} /></Row> :
              <Row>Waiting for blockchain...  <Lottie height={50} width={50} options={loadingAnim} /></Row>}
          </div>}
          onClick={() => { handleSubmit() }}
          disabled={true} />}
      </ButtonBox>
    </ColRight>
  );
};

export default RewardTokenSubmit;
