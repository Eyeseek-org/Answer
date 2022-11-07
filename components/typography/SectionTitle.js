import Title from "./Title"
import Subtitle from "./Subtitle"
import styled from "styled-components"

const Container = styled.div`
  padding-left: 17%;
  @media (max-width: 768px) {
    padding-left: 15%;
    margin-bottom: 5%;
  }
`

const TitleRow = styled.div`
  border-bottom: 1px solid #003E46;

`

const SubRow = styled.div`

`

const SectionTitle = ({ title, subtitle }) => {
  return (
    <Container>
      <TitleRow>
        <Title text={title} />
      </TitleRow>
      <SubRow>
        <Subtitle text={subtitle} />
      </SubRow>
    </Container>
  )
}

export default SectionTitle
