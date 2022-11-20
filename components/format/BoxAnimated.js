import styled from "styled-components"
import {motion} from 'framer-motion'

const Outer = styled(motion.div)`
    box-shadow: 0px 5px 30px rgba(237, 255, 130, 0.25);
`

const Container = styled.div`
    background: ${props => props.theme.colors.transparent};
    min-width: 200px;
    min-height: 200px;
    padding: 5%;
    font-size: 1em;
    font-family: 'Montserrat';
`

export const RewardAnimatedBox = ({text}) => {
    return <>
    {text === '' ? null : 
    <Outer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.9,
            scale: [0, 1, 0.5, 1],
          }}>
        <Container>
            {text}
        </Container>
    </Outer>}
    </>
}

