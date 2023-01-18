import { motion } from "framer-motion";
import styled from "styled-components";

const AnimatedCircle = styled(motion.circle)`
    transition : all 0.4s ease-in-out;
    &:hover{
        fill: ${props => props.theme.colors.border};
    }
`

const Circle = ({ color, onClick, active, value, stroke }) => {
    return <>
        <AnimatedCircle
            onClick={onClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                ease: "easeInOut",
                duration: 0.3,
                delay: 0.1,
            }}
            r={active === value ? 20 : 10}
            fill={color}
            stroke={active === value ? stroke : "transparent"}
        />
    </>
}

export default Circle;