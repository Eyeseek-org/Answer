import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 45px;
`

const IconButton = ({ icon }) => {
  return <Container>{icon}</Container>
}

export default IconButton
