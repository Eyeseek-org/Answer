import styled from "styled-components"

const Box = styled.div`
  text-align: center;
  padding: 1%;
  background: black;
  border: 1px solid ${(props) => props.color};
  border-radius: 45px;
  padding-left: 15px;
  padding-right: 15px;
`

const Text = styled.div`
  font-family: "Neucha";
  font-style: normal;
  font-weight: 300;
  font-size: 0.9em;
  letter-spacing: 0.5px;
  color: white;
`

const Tag = ({ tag, color }) => {
  return (
    <>
      <Box color={color}>
        <Text>{tag}</Text>
      </Box>
    </>
  )
}

export default Tag
