import { useState } from 'react';
import {
    motion,
} from "framer-motion";
import styled, {useTheme} from 'styled-components';
import { Row } from '../format/Row';
import { ToggleDesc } from '../typography/Descriptions';



const ToggleBackground = styled(motion.div)`
    position: relative;
    width: 60px;
    height: 25px;
    display: flex;
    justify-content: flex-start;
    border-radius: 50px;
    padding: 10px;
    cursor: pointer;
`;

const ToggleCircle = styled(motion.div)`
    position: absolute;
    top: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 40px;
`;

const Toggle = ({left, right, onClick}) => {
    const [toggleDirection, setToggleDirection] = useState(0)
    const theme = useTheme();
    const primary = theme.colors.primary
    const gray = theme.colors.lightGray
    const back = theme.colors.body
    const toggleOn = () => {
        setToggleDirection(toggleDirection === 0 ? 20 : 0)
    }

    return (
        <Row onClick={onClick}>
            <ToggleDesc>{left}</ToggleDesc>
            <ToggleBackground
                onTap={toggleOn}
                style={{
                    background: toggleDirection ? gray : primary
                }}
            >
                <ToggleCircle 
                      whileHover={{ scale: 0.88 }} 
                    onTap={toggleOn}
                    animate={{
                        x: toggleDirection
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30
                    }}
                    style={{
                        background: toggleDirection ? back : back
                    }}
                />
            </ToggleBackground>
            <ToggleDesc>{right}</ToggleDesc>
        </Row>
    )
}

export default Toggle;