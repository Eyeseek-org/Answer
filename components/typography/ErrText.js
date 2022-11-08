import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin-top: 5%;
`

const ErrText = ({ text }) => {
    return <Container>
        {text}
    </Container>
}

export default ErrText