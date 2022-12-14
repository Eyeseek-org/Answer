import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useContractEvent, useNetwork } from 'wagmi';
import masterFacet from '../../abi/masterFacet.json';
import { GetFundingAddress } from '../../helpers/GetContractAddress';
import { diamond } from '../../data/contracts';

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
  const [add, setAdd] = useState(diamond.mumbai.masterFacet);
  const { chain } = useNetwork();

  const handleContractListener = () => {
    setShowDonate(!showDonate);
    setTimeout(() => {
      setShowDonate(false);
    }, 2000);
  };

  useContractEvent({
    address: add,
    abi: masterFacet.abi,
    eventName: 'Donated',
    listener: (_event) => handleContractListener(),
    once: false,
  });

  useEffect(() => {
    setAdd(GetFundingAddress(chain));
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
