import { useContractWrite } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { RowEnd, ColRight } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';
import { loadingAnim } from '../../components/animated/Animations';
import Lottie from 'react-lottie';

const RewardClassicSubmit = ({ add, home, pid, cap }) => {
  const { rewardState, setRewardState } = useReward();
  const {  loading } = rewardState;

  const handleSubmit = async () => {
    write?.();
    setRewardState((prev) => ({ ...prev, loading: true }))
  };

  const {write} = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: add,
    abi: diamondAbi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, 1, "0x0000000000000000000000000000000000000000", 0],
  })

  return (
    <ColRight>
      <RowEnd>
      {!loading ? <ButtonAlt
            text={'Create reward'}
            onClick={() => {
              handleSubmit();
            }}
            /> : <ButtonAlt text={<div>Waiting for blockchain... <Lottie height={50} width={50} options={loadingAnim} /></div>} disabled={true} />}
      </RowEnd>
    </ColRight>
  );
};

export default RewardClassicSubmit;
