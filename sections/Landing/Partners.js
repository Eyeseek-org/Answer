import styled, {useTheme} from 'styled-components'
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Subtitle from '../../components/typography/Subtitle';
import { RowCenter } from '../../components/format/Row';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12%;
    margin-bottom: 12%;
`

const MovingRow = styled(motion.div)`
    display: flex;
    justify-content: space-around;
`

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
    const x = useTransform(baseX, (v) => `${wrap(0, -45, v)}%`);
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });

    return <div className="parallax">
    <motion.div className="scroller" style={{ x }}>
      <span>{children} </span>
    </motion.div>
  </div>
}


const Card = styled.span`
    background: ${props => props.theme.colors.cardGradient};
    margin: 1%; 
    padding: 15px;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 8px;
`

const Partners = () => {
    const PartnerCard = ({name, logo}) => {
      <Card><RowBetween><div>{name}</div> <div>{logo}</div></RowBetween></Card>
    }
    
    return <Container>
      <RowCenter><Subtitle text='Partners'/></RowCenter>
        <ParallaxText baseVelocity={-5}><MovingRow>
            <Card>👁️ It could be you 👁️ </Card>
            <Card>👁️ It could be you 👁️ </Card>
            <Card>👁️ It could be you 👁️ </Card>
        </MovingRow></ParallaxText>
      <ParallaxText baseVelocity={5}>        <MovingRow>
            <Card>👁️ It could be you 👁️ </Card>
            <Card>👁️ It could be you 👁️ </Card>
            <Card>👁️ It could be you 👁️ </Card>
        </MovingRow></ParallaxText>
    </Container>
}

export default Partners