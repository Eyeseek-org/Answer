import styled from "styled-components"
import {motion} from 'framer-motion'

const Outer = styled(motion.div)`
    position: absolute;
    background: ${props => props.theme.colors.black};
    box-shadow: 0px 5px 30px rgba(255, 255, 255, 0.25);
    z-index: 100;
    margin-right: 18%;
`

const Container = styled.div`
    min-width: 300px;
    min-height: 150px;
    padding: 5%;
    font-size: 1em;
    font-family: 'Montserrat';
`

export const RewardAnimatedBox = ({text}) => {
    return <>
    {text === '' ? null : 
    <Outer
          initial={ { opacity: 0 }}
          animate={{ y: 150 ,opacity: 1 }}
          transition={{
            duration: 0.4,
            scale: [0, 1, 0.5, 1],
          }}>
        <Container>
            {text}
        </Container>
    </Outer>}
    </>
}

