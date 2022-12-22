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


const PartnerCard = styled.span`
    background: ${props => props.theme.colors.cardGradient};
`

const Partners = () => {
    return <Container>
        <ParallaxText baseVelocity={-5}><MovingRow>
            <PartnerCard>Partner card </PartnerCard>
            <PartnerCard>Partner card </PartnerCard>
            <PartnerCard>Partner card </PartnerCard>
        </MovingRow></ParallaxText>
      <ParallaxText baseVelocity={5}>        <MovingRow>
            <PartnerCard>Partner card </PartnerCard>
            <PartnerCard>Partner card </PartnerCard>
            <PartnerCard>Partner card </PartnerCard>
        </MovingRow></ParallaxText>
    </Container>
}

export default Partners