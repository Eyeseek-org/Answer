import { motion } from 'framer-motion';
import styled from 'styled-components';

const MyButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  display: inline-block;
  font-family: 'Gemunu Libre', sans-serif;
  letter-spacing: 0.5px;
  font-size: 1.1em;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: ${(props) => props.width};
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    margin: 0;
  }
  @media (min-width: 1580px) {
    font-size: 1.4em;
  }
`;

const ButtonAlt = ({ text, onClick, width }) => {
  return (
    <>
      <MyButton  whileHover={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 500, damping: 3 }} onClick={onClick} width={width}>
        {text}
      </MyButton>
    </>
  );
};

export default ButtonAlt;
