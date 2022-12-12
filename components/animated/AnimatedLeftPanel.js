import styled from "styled-components";
import { motion } from "framer-motion";
import Subtitle from "../typography/Subtitle";

const AnimatedModal = styled(motion.div)`
    position: fixed;
    top: 35%;
    left: 0;
    width: 18%;
    z-index: 100;
    @media (max-width: 768px) {
        display: none;
    }
`;

const AnimatedLeftPanel = ({title, component}) => {
    return <AnimatedModal
        initial={{ scale: 0.8, opacity: 0}}
        animate={{
            y: -50,
            opacity: 1
        }}
        transition={{
            duration: 0.3,
            opacity: 1,
        }}
    >
       <Subtitle text={title}/>  {component}
    </AnimatedModal>
}

export default AnimatedLeftPanel
