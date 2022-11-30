import { useContractWrite } from 'wagmi';
import donation from '../../abi/donation.json';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { RowEnd, ColRight } from '../../components/format/Row';

const RewardClassicSubmit = ({ add, home, pid, cap }) => {

  const handleSubmit = async () => {
    await write?.();
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
          <ButtonAlt
            text={'Create reward'}
            onClick={() => {
              handleSubmit();
            }}
          />
      </RowEnd>
    </ColRight>
  );
};

export default RewardClassicSubmit;
