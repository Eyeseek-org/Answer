import styled from 'styled-components';
import { CopyIcon, SuccessIcon } from '../icons/Common';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Container = styled.div``;
const CopyRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: transparent;
  border: 1px solid #2f2f2f;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 25px;
  font-size: 0.8em;
  letter-spacing: 0.3px;
  transition: all 0.1s ease;
  font-family: 'Neucha';
  color: ${(props) => props.theme.colors.font};
  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 5px rgba(255, 255, 255, 0.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const IconBox = styled(motion.div)`
  position: absolute;
  right: 5px;
`;

const Address = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  let addressFirs6CharLast4Char = address.slice(0, 6) + '...' + address.slice(-4);

  return (
    <Container>
      <CopyRow
        onClick={() => {
          handleCopy();
        }}
      >
        {addressFirs6CharLast4Char}
        {!copied ? (
          <IconBox>
            <CopyIcon width={10} />
          </IconBox>
        ) : (
          <IconBox
            initial={{ scale: 0.8 }}
            animate={{ y: -4 }}
            transition={{
              duration: 0.1,
              scale: [0, 1, 0.5, 1],
            }}
          >
            <SuccessIcon width={15} height={15} />
          </IconBox>
        )}
      </CopyRow>
    </Container>
  );
};
export default Address;
