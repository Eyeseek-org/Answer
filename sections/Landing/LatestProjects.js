import styled from 'styled-components'
import ProjectCard from '../../components/cards/ProjectCard'
import SectionTitle from '../../components/typography/SectionTitle'
import Carousel from 'nuka-carousel/lib/carousel'

const Container = styled.div`
    margin-top: 5%;
`

const ProjectBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 5%;
    gap: 2%;
`
/// @notice "my" indicates whether component visualized in context of MyProjects or Landing page
const LatestProjects = ({ data, my}) => {

    // TBD filter for personalization
    console.log(data)
    const filteredFirst = data.slice(0, 6)
    const filteredSecond = data.slice(7, 13)
    const filteredThird = data.slice(14, 20)
    return <Container>
        {my ? <SectionTitle title='Project history' subtitle='Looking back at your success' /> : <SectionTitle title='Recently added' subtitle={'Support latest projects'} />}
        <Carousel>
            <ProjectBox>
                    {filteredFirst.map((project, index) => {
                        return <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            category={project.category}
                            subcategory={project.subcategory}
                            imageUrl={project.imageUrl}
                            link={`/project/${project.objectId}`}
                            pid={project.pid}
                        />
                    })}
            </ProjectBox>
            <ProjectBox>
                    {filteredSecond.map((project, index) => {
                        return <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            category={project.category}
                            subcategory={project.subcategory}
                            imageUrl={project.imageUrl}
                            link={`/project/${project.objectId}`}
                            pid={project.pid}
                        />
                    })}
            </ProjectBox>
            <ProjectBox>
                    {filteredThird.map((project, index) => {
                        return <ProjectCard
                            key={index}
                            title={project.title}
                            description={project.description}
                            category={project.category}
                            subcategory={project.subcategory}
                            imageUrl={project.imageUrl}
                            link={`/project/${project.objectId}`}
                            pid={project.pid}
                        />
                    })}
            </ProjectBox>
        </Carousel></Container>
}

export default LatestProjects