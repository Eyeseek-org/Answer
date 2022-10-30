import styled from 'styled-components'
import { SuccessIcon } from './icons/Common'

const Container = styled.div`
    background: ${props => props.background};
    border: 5px solid ${props => props.color};
    border-radius: 15px;
    width: 300px;
    min-height: 100px;
    padding: 2%;
`

const Title = styled.div`
    font-family: "Staatliches";
    font-size: 1.5em;
    color: ${props => props.color};
    margin-left: 1%;
`

const Description = styled.div`
    font-size: 1.2em;
    font-family: "Neucha";
    color: black;
    margin-top: 1%;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Toast = ({ text, type }) => {
    return <>
    {type === 'success' && <Container color={'#009962'} background={'rgba(168, 255, 208, 0.8)'}> 
        <Row><SuccessIcon width={30}/> <Title color={'#025700'}>Success</Title></Row>
        <Description>{text}</Description>
    </Container>}
    </>
}

export default Toast;