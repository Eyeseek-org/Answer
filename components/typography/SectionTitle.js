import Title from "./Title"
import Subtitle from "./Subtitle"
import styled from "styled-components"

const TitleRow = styled.div`
  border-bottom: 1px solid #003E46;
  padding-left: 17%;
`

const SubRow = styled.div`
  padding-left: 17%;
`

const SectionTitle = ({ title, subtitle }) => {
  return (
    <>
      <TitleRow>
        <Title text={title} />
      </TitleRow>
      <SubRow>
        <Subtitle text={subtitle} />
      </SubRow>
    </>
  )
}

export default SectionTitle
