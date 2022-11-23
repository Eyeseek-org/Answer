import styled from 'styled-components';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import donation from '../../abi/donation.json';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { RowEnd } from '../../components/format/Row';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;


const RewardClassicSubmit = ({ add, home, pid, cap }) => {

  const handleSubmit = async () => {
    await write?.();
  };

  const { config } = usePrepareContractWrite({
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, 1, "0x0000000000000000000000000000000000000000", 0],
  });


  const { write } = useContractWrite(config);
  
  return (
    <Container>
      <RowEnd>
          <ButtonAlt
            text={'Create reward'}
            onClick={() => {
              handleSubmit();
            }}
          />
      </RowEnd>
    </Container>
  );
};

export default RewardClassicSubmit;
