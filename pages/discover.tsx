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
        cats.forEach(async (cat) => {
            const Cat = projects.filter((p) => p.category === cat)
            return <>
                {Cat.map((project)=> <ProjectCard                    
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    subcategory={project.subcategory}
                    link={`/project/${project.objectId}`}
                    pid={project.pid}
                />)}
            </>
        })
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <Container>
            <SectionTitle title="All projects" subtitle='Browse through all application projects' />
            <ProjectBox>
            <FilteredProjects />
        </ProjectBox>
        </Container>
    )
}

export default BrowsePro   