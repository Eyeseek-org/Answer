import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1em;
  font-family: 'Neucha';
`
const NoFound = ({text}) => {
    return <Container>
        {text}
    </Container>
}

export default NoFound