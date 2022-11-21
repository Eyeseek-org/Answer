import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useContractEvent } from 'wagmi';
import donation from '../../abi/donation.json';
import token from '../../abi/token.json';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';

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

const RewardTokenSubmit = ({ add, home, pid, tokenAddress, cap, tokenAmount }) => {
  const [ev, setEv] = useState(false);

  var total = cap * tokenAmount;

  const listened = async () => {
    await setEv(true);
  };

  const handleSubmit = async () => {
    await write?.();
  };

  useContractEvent({
    address: tokenAddress,
    abi: token.abi,
    eventName: 'Approval',
    listener: (event) => listened(event),
    once: true,
  });

  // Total, Reward AMount
  const { config, error } = usePrepareContractWrite({
    address: add,
    abi: donation.abi,
    chainId: home,
    functionName: 'createReward',
    args: [pid, cap, total, tokenAddress, 1],
  });


  const { write } = useContractWrite(config);
  
  return (
    <Container>
      <ButtonBox>
        <ApproveUniversal tokenContract={tokenAddress} spender={add} amount={total} />
          <ButtonAlt
            text={'Submit'}
            onClick={() => {
              handleSubmit();
            }}
          />
      </ButtonBox>
    </Container>
  );
};

export default RewardTokenSubmit;
