import styled from "styled-components"
import {motion} from 'framer-motion'

const Outer = styled(motion.div)`
    box-shadow: 0px 5px 30px rgba(255, 255, 255, 0.25);
    background: ${props => props.theme.colors.transparentCard};
    margin-right: 18%;
`

const Container = styled.div`
    min-width: 300px;
    min-height: 200px;
    padding: 5%;
    font-size: 1em;
    font-family: 'Montserrat';
`

export const RewardAnimatedBox = ({text}) => {
    return <>
    {text === '' ? null : 
    <Outer
          initial={ { opacity: 0 }}
          animate={{ x:50 ,opacity: 1 }}
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

