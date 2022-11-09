import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin-top: 5%;
    color: red;
    font-family: 'Neucha';
`

const ErrText = ({ text }) => {
    return <Container>
        {text}
    </Container>
}

export default ErrText