import Title from "./Title"
import Subtitle from "./Subtitle"
import styled from "styled-components"



const TitleRow = styled.div`
  padding-left: 17%;
  border-bottom: 1px solid #003E46;
  @media (max-width: 768px) {
    padding-left: 15%;
    margin-bottom: 5%;
  }

`

const SubRow = styled.div`
  padding-left: 17%;
  @media (max-width: 768px) {
    padding-left: 15%;
    margin-bottom: 5%;
  }
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
