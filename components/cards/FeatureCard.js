import styled from 'styled-components';
import { motion } from 'framer-motion';
import {FeatureTitle} from '../typography/Titles';
import {FeatureDescription} from '../typography/Descriptions';

const Card = styled(motion.div)`
  position: relative;
  background: ${(props) => props.theme.colors.transparent};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 15px;
  padding-left: 2em;
  padding-right: 1em;
  width: 40%;
  max-width: 800px;
  padding-top: 2em;
  margin: 2em;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
    background: rgba(5, 0, 0, 0.4);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;


const RightAnimation = styled(motion.div)`
  position: absolute;
  right: 0;
  opacity: 0;
  top: 0;
`;

const FeatureCard = ({ title, description, icon, onClick, anim }) => {
  return (
    <Card whileHover={{ scale: 1.05 }} onClick={onClick}>
      <div>{icon} </div>
      <RightAnimation whileHover={{ opacity: 1, scale: 1.3 }} transition={{ duration: 2 }} exit={{ opacity: 0 }}>
        {anim}
      </RightAnimation>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </Card>
  );
};

export default FeatureCard;
