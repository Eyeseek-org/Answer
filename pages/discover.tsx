import styled from 'styled-components'
import type { NextPage } from "next";

import axios from 'axios'
import SectionTitle from '../components/typography/SectionTitle';
import { useState , useEffect} from 'react'
import ProjectCard from '../components/cards/ProjectCard'
import { cats } from '../data/cats';

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

const BrowsePro: NextPage = () => {
    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        const config = {
            headers: {
                "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
            },
        };
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project`, config);
            await setProjects(res.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const FilteredProjects = ({projects}) => {
        return <>
            {
                cats.map((cat) => {
                    const CategoryProjects = projects.filter((p) => p.category.includes(cat));
                    return (
                        <>
                            <SectionTitle title={cat} subtitle={`Browse through ${cat} projects`} />
                            <ProjectBox>
                                {CategoryProjects.map((project)=>
                                    <ProjectCard
                                        key={project.objectId}
                                        title={project.title}
                                        description={project.description}
                                        category={project.category}
                                        subcategory={project.subcategory}
                                        link={`/project/${project.objectId}`}
                                        state={project.state}
                                        chain={project.chainId}
                                        pid={project.pid}
                                        imageUrl={undefined}
                                        pType={undefined}
                                    />
                                )}
                            </ProjectBox>
                        </>)
                })
            }
        </>
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <Container>
            <FilteredProjects projects={projects}/>
        </Container>
    )
}

export default BrowsePro   