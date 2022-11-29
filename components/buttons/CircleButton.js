
import styled from 'styled-components'
import {motion} from 'framer-motion'

const Container = styled(motion.div)`
    display: flex;
    justify-content: center;
    font-family: 'Neucha';
    align-items: center;
    border-radius: 45px;
    padding-left: 5px;
    padding-right: 5px;
    transition: 0.1s;
    &:hover {
        cursor: pointer;
        background: ${props => props.theme.colors.gray};
    }
`


const CircleButton = ({icon, color, onClick}) => {
    return <Container color={color} onClick={onClick}
    >{icon}</Container>
}

export default CircleButton
