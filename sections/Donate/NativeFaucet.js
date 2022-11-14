import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import polygon from '../../public/icons/donate/polygon.png';
import ftm from '../../public/icons/donate/ftm.png';
import bnb from '../../public/icons/donate/bnb.png';
import Button from '../../components/buttons/Button';

const ImageBox = styled(motion.div)`
  position: absolute;
`;

const Container = styled.div`
  position: relative;
  margin-top: 15%;
`;

const NativeFaucet = () => {
  const { chain } = useNetwork();
  const [faucet, setFaucet] = useState('matic');
  const [link, setLink] = useState('https://faucet.matic.network/');

  useEffect(() => {
    if (chain && chain.id === 80001) {
      setFaucet('matic');
      setLink('https://faucet.matic.network/');
    } else if (chain && chain.id === 97) {
      setFaucet('bnb');
      setLink('https://testnet.binance.org/faucet-smart');
    } else if (chain && chain.id === 4002) {
      setFaucet('ftm');
      setLink('https://faucet.ftm.tools/');
    } else {
      setFaucet('');
    }
  }, []);

  return (
    <Container>
      {faucet === '' ? null : (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button
            text={
              <>
                Get test {faucet}
                <ImageBox
                  initial={{ opacity: 1 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 2, type: 'spring', stiffness: 500, damping: 3 }}
                  exit={{ opacity: 0 }}
                >
                  {faucet === 'matic' && <Image src={polygon} alt={faucet} width={30} height={30} />}
                  {faucet === 'bnb' && <Image src={bnb} alt={faucet} width={30} height={30} />}
                  {faucet === 'ftm' && <Image src={ftm} alt={faucet} width={30} height={30} />}
                </ImageBox>
              </>
            }
          />
        </a>
      )}
    </Container>
  );
};

export default NativeFaucet;
