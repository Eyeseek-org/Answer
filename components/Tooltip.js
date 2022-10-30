import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: ${props => props.margin ? `${props.margin}` : '-30px'} ;
  background: black;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.8em;
  font-family: 'Neucha';
  border: 1px solid #2F2F2F;
`

const Tooltip = ({text, margin}) => {
    return <Container margin={margin}>
        {text}
    </Container>
}

export default Tooltip