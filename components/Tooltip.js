import styled from 'styled-components';
import {motion} from 'framer-motion'
import { Tooltip } from 'react-tooltip'

const Container = styled(motion.div)`
  position: absolute;
  top: ${(props) => (props.margin ? `${props.margin}` : '-30px')};
  background: ${(props) => props.theme.colors.black};
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.colors.font};
  min-width: 200px;
  text-align: center;
  letter-spacing: 0.6px;
  font-size: 0.8em;
  font-family: 'Neucha';
  border: 1px solid ${(props) => props.theme.colors.border};
  @media (min-width: 1580px) {
    font-size: 1.2em;
    min-width: 300px;
  }
  &:hover{
    cursor: pointer;
  }
`;

const MyTooltip = ({ text, margin }) => {
  return <Container margin={margin} id="tooltip" data-tooltip-content={text}
    initial={{ x: -100 }}
    animate={{
        x: -20,
    }}
  transition={{  duration: 0.3 }}
    ><Tooltip anchorId="tooltip" /></Container>;
};

export default MyTooltip;
