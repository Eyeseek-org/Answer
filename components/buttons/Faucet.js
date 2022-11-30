import styled from 'styled-components';
import { useState } from 'react';
import Button from './Button';
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi';
import faucet from '../../abi/faucet.json';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SuccessIcon } from '../icons/Common';
import usdc from '../../public/icons/usdc.png';
import usdt from '../../public/icons/usdt.png';

const Container = styled.div`
  margin-top: 15%;
`;

const ImageBox = styled(motion.div)`
  position: absolute;
`;
const Faucet = ({ address, currency }) => {
  const [done, setDone] = useState(false);
  const { config } = usePrepareContractWrite({
    address: address,
    abi: faucet.abi,
    functionName: 'requestTokens',
  });

  const listened = async () => {
    await setDone(true);
  };
  useContractEvent({
    address: address,
    abi: faucet.abi,
    eventName: 'FaucetReceived',
    listener: (event) => listened(event),
    once: true,
  });

  const { write } = useContractWrite(config);

  const handleFaucet = async () => {
    await write?.();
  };

  return (
    <Container>
      {address === '' ? null : (
        <Button
          onClick={() => {
            handleFaucet();
          }}
          text={
            <>
              Get test {currency}
              {!done ? (
                <ImageBox
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 2, type: 'spring', stiffness: 500, damping: 3 }}
                  exit={{ opacity: 0 }}
                >
                  {currency === 'USDC' && <Image src={usdc} alt={currency} width={30} height={30} />}
                  {currency === 'USDT' && <Image src={usdt} alt={currency} width={30} height={30} />}
                </ImageBox>
              ) : (
                <ImageBox>
                  <SuccessIcon width={40} />
                </ImageBox>
              )}{' '}
            </>
          }
        />
      )}
    </Container>
  );
};

export default Faucet;
