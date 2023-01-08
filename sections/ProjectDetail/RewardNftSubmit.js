import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import multi from '../../abi/multi.json';
import ApproveNftUniversal from '../../components/buttons/ApproveNftUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import ErrText from '../../components/typography/ErrText';
import { useReward } from '../utils/rewardContext';
import { notify } from 'reapop'
import { useDispatch } from 'react-redux'
import { errAnim, loadingAnim } from '../../components/animated/Animations';
import Lottie from 'react-lottie';
import { AbsoluteRight } from '../../components/format/Box';
import { Row } from '../../components/format/Row';


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

const RewardNftSubmit = ({ add, home, pid, tokenAddress, nftId, cap, pledge }) => {
  const [ev, setEv] = useState(false);

  const { rewardState, setRewardState } = useReward();
  const { loading } = rewardState;
  const dispatch = useDispatch()

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }

  const handleSubmit = async () => {
    console.log(add, home, pid, tokenAddress, nftId, cap)
    write?.();
    setRewardState((prev) => ({ ...prev, loading: true }))
  };

  const listened = async () => {
    setEv(true);
    noti('NFT Approved', 'success')
    setRewardState((prev) => ({ ...prev, loading: false }))
  };

  useContractEvent({
    address: tokenAddress,
    abi: multi.abi,
    eventName: 'ApprovalForAll',
    listener: (event) => listened(event),
    once: true,
  });

  const { write, error } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: diamondAbi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, nftId, pledge * 1000000, tokenAddress, 2],
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
        /> : <ButtonAlt text={
          <div>
            {error ? <Row>Repeat request  <Lottie height={50} width={50} options={errAnim} /></Row> :
              <Row>Waiting for blockchain...  <AbsoluteRight><Lottie height={50} width={50} options={loadingAnim} /></AbsoluteRight></Row>}
          </div>}
          onClick={() => { handleSubmit() }}
          disabled={true} />}
      </ButtonBox>
      {error && <ErrText text={'Missing/Incorrect parameter'} />}
    </Container>
  );
};

export default RewardNftSubmit;
