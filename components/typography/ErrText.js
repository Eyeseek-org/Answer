import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin-top: 5%;
    color: red;
    letter-spacing: 0.2px;
    font-family: 'Neucha';
`

const ErrText = ({ text }) => {
    return <Container>
        {text}
    </Container>
}

export default ErrText