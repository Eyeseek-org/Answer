import styled from "styled-components";
import { motion } from "framer-motion";
import Subtitle from "../typography/Subtitle";


const AnimatedModal = styled(motion.div)`
    position: absolute;
    top: 35%;
    left: 0;
    width: 17.2%;
    z-index: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    max-height: 100%;
    @media (max-width: 768px) {
        display: none;
    }
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 1px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colors.border};
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #9bffff;
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