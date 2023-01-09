import styled from "styled-components"
import Subtitle from "../../components/typography/Subtitle"
import { BodyBox } from "../../components/format/Box";


const DescriptionBox = styled.div`
    padding: 3%;
    margin-top: 3%;
    font-family: 'Inter', sans-serif;
    letter-spacing: 1px;
    background: ${props => props.theme.colors.cardGradient};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.border};
`

const ProjectDescription = ({desc}) => {



    return <BodyBox>
        <Subtitle text='Funding goal'/>
        <DescriptionBox>      {desc}</DescriptionBox>
  
    </BodyBox>
}

export default ProjectDescription