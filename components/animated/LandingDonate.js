import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useContractEvent } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import { diamond } from '../../data/contracts/core';

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
`;

const Tag = styled(motion.div)`
  text-align: center;
  font-family: 'Neucha';
  color: green;
  font-size: 28px;
`;

const LandingDonate = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [add, setAdd] = useState();

  const handleContractListener = () => {
    setShowDonate(!showDonate);
    setTimeout(() => {
      setShowDonate(false);
    }, 2000);
  };

  useContractEvent({
    address: add,
    abi: diamondAbi,
    eventName: 'Donated',
    listener: (_event) => handleContractListener(),
    once: false,
  });

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== 'production'){
      setAdd(diamond.mumbai)
    } else {
      setAdd(diamond.polygon);
    }
  }, []);

  /// Use it for rewards
  return (
    <Container>
      {showDonate && (
        <Tag
          initial={{ scale: 0.8 }}
          animate={{
            y: -359,
          }}
          transition={{
            duration: 2,
            scale: [0, 1, 0.5, 1],
          }}
        >
          Donate
        </Tag>
      )}
    </Container>
  );
};

export default LandingDonate;
