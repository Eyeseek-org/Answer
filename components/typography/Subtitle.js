import styled from "styled-components"

const Box = styled.div`
  font-size: 1.6em;
  font-family: "Neucha";
  font-style: normal;
  letter-spacing: 0.5px;
  font-weight: 300;
  @media (max-width: 1168px) {
    font-size: 1.1em;
  }
`

const Subtitle = ({ text }) => {
  return <Box>{text}</Box>
}

export default Subtitle
