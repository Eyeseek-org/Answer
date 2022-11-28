import styled from 'styled-components';
import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import donation from '../../abi/donation.json';
import token from '../../abi/token.json';
import ApproveUniversal from '../../components/buttons/ApproveUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { ColRight } from '../../components/format/Row';

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
          <ButtonAlt
            text={'Submit'}
            onClick={() => {
              handleSubmit();
            }}
          />
      </ButtonBox>
    </ColRight>
  );
};

export default RewardTokenSubmit;
