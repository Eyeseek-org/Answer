import styled from "styled-components"

const Container = styled.div`
  padding-bottom: 2%;
  padding-top: 2%;
`

const I = styled.input`
  padding: 1%;
  padding-left: 2%;
`

export const NumInput = ({ placeholder, onChange, min }) => {
  return (
    <Container>
      <I type={"number"} placeholder={placeholder} onChange={onChange} min={min} />
    </Container>
  )
}
