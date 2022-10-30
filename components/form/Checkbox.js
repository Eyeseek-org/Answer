import styled from "styled-components"

const Container = styled.input`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: all 150ms;
  padding: 1px;
`

/// TBD refactor

const CheckBox = ({checked, onChange}) => {

    return  <Container type="checkbox" checked={checked} onChange={onChange}/>

}

export default CheckBox
