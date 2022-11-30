import styled from 'styled-components';
import { motion } from 'framer-motion';
import {FeatureTitle} from '../typography/Titles';
import {FeatureDescription} from '../typography/Descriptions';
import { YouTubeIcon } from '../icons/Socials';

const Card = styled(motion.div)`
  position: relative;
  background: ${(props) => props.theme.colors.projectCard};
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
    background: rgba(5, 0, 0, 0.4);
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const YTBox = styled(motion.div)`
  position: absolute;
  right: 7px;
  bottom: 5px;
`

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
      <YTBox  whileHover={{ opacity: 1, scale: 1.7 }} transition={{ duration: 0.2 }}><YouTubeIcon width={20}/></YTBox>
    </Card>
  );
};

export default FeatureCard;
