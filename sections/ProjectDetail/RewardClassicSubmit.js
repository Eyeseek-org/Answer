import { useContractWrite } from 'wagmi';
import donation from '../../abi/donation.json';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { RowEnd, ColRight } from '../../components/format/Row';
import { useReward } from '../utils/rewardContext';

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
    abi: donation.abi,
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
          /> : <ButtonAlt text={'Loading...'} disabled={true} />}
      </RowEnd>
    </ColRight>
  );
};

export default RewardClassicSubmit;
