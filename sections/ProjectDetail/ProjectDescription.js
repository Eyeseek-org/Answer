import styled from "styled-components"
import Subtitle from "../../components/typography/Subtitle"
import ProgressBar from "../../components/ProgressBar"

const Container = styled.div`
    margin-top: 5%;
    padding-left: 15%;
    padding-right: 15%;
    @media (max-width: 768px) {
        padding-left: 2%;
        padding-right: 2%;
    }
`

const DescriptionBox = styled.div`
    padding-bottom: 5%;
`

const ProjectDescription = ({descM}) => {
    
    // Amount + Cap needed to retrieve from chain probably, in parrent ?
    const amount = 1000
    const cap = 10000
    const ratio = amount / cap * 100

    return <Container>
        
        <Subtitle text='Project milestones'/>
        <ProgressBar ratio={ratio}/>
        <DescriptionBox></DescriptionBox>
        {descM}
    </Container>
}

export default ProjectDescription