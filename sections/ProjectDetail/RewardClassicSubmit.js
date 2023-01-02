import { useContractWrite } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { RowEnd, ColRight, Row } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';
import { errAnim, loadingAnim } from '../../components/animated/Animations';
import Lottie from 'react-lottie';
import { AbsoluteRight } from '../../components/format/Box';

const RewardClassicSubmit = ({ add, home, pid, cap, pledge }) => {
  const { rewardState, setRewardState } = useReward();
  const { loading } = rewardState;

  const handleSubmit = async () => {
    write?.();
    setRewardState((prev) => ({ ...prev, loading: true }))
  };

  const { error, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: diamondAbi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, 1, pledge, "0x0000000000000000000000000000000000000000", 0],
  })

  return (
    <ColRight>
      <RowEnd>
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
      </RowEnd>
    </ColRight>
  );
};

export default RewardClassicSubmit;
