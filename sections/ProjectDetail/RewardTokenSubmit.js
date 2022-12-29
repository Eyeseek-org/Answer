import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import token from '../../abi/token.json';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { ColRight, Row } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';
import { notify } from 'reapop'
import { useDispatch } from 'react-redux'
import { errAnim, loadingAnim } from '../../components/animated/Animations';
import Lottie from 'react-lottie';
import ApprovedComponent from '../../components/functional/ApprovedComponent';
import { AbsoluteRight } from '../../components/format/Box';


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

  const { write, error } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: diamondAbi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, tokenAmount * 1000000, tokenAddress, 1],
  })

  return (
    <ColRight>
      <ButtonBox>
        <ApprovedComponent address={add} tokenAddress={tokenAddress} dec={1} />
        <ApproveUniversal tokenContract={tokenAddress} spender={add} amount={tokenAmount} dec={1} />
        {!loading ? <ButtonAlt
          text={'Create reward'}
          onClick={() => {
            handleSubmit();
          }}
        /> : <ButtonAlt text={
          <div>
            {error ? <Row>Repeat request  <Lottie height={50} width={50} options={errAnim} /></Row> :
              <Row>Waiting for blockchain...  <AbsoluteRight><Lottie height={50} width={50} options={loadingAnim} /></AbsoluteRight></Row>}
          </div>}
          onClick={() => { handleSubmit() }}
          disabled={true} />}
      </ButtonBox>
    </ColRight>
  );
};

export default RewardTokenSubmit;
