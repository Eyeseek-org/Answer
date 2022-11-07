import styled from 'styled-components'
import { useEffect, useState } from "react";
import axios from "axios";
import {useAccount} from 'wagmi'

import ProjectCard from '../../components/cards/ProjectCard'
import SectionTitle from '../../components/typography/SectionTitle'
import Carousel from 'nuka-carousel/lib/carousel'
import {cats} from '../../data/cats'
import { moralisApiConfig } from '../../data/moralisApiConfig';

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

const Categories = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5%;
    margin-top: 5%;
    margin-bottom: 1%;
    gap: 4%;
    justify-content: center;
`

const Cat = styled.div`
    font-size: 1em;
    font-family: 'Montserrat';
    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }
`

const ACat = styled(Cat)`
    color: #B0F6FF;
`

/// @notice "my" indicates whether component visualized in context of MyProjects or Landing page
const LatestProjects = ({ my}) => {
    const initialCategory = "All"
    const { address } = useAccount()
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(initialCategory)
  
  
    useEffect(() => {
      if (my) {
        getMyProjects();
      } else {
        getProjects();
      }
    }, []);
  
    const getMyProjects = async () => {
      try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"owner":"${address}"}`, moralisApiConfig);
          setData(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    const getProjects = async (cat) => {
        const selectedCategory = cat ? cat : category
        try {
          if (selectedCategory === "All") {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"state":1}`, moralisApiConfig);
            setData(res.data.results);
          } else {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"category":"${selectedCategory}", "state": 1}`, moralisApiConfig);
            setData(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleCat = async(cat) => {
        try {
          await setCategory(cat)
          await getProjects(cat)
        } catch(err) {
            console.log(err)
          }
      }
    

    const filteredFirst = data.slice(0, 6)
    const filteredSecond = data.slice(7, 13)
    const filteredThird = data.slice(14, 20)
    return <Container>
        {my ? <SectionTitle title='Project history' subtitle='Looking back at your success' /> : <SectionTitle title='Recently added' subtitle={'Support latest projects'} />}
        <Categories>
            {category === initialCategory ? <ACat onClick={() => handleCat(initialCategory)}>All</ACat> : <Cat onClick={() => handleCat(initialCategory)}>All</Cat>}
            {cats.sort().map((cat) =>
             <div key={cat}>{cat === category ? <ACat onClick={()=>handleCat(initialCategory)}>{cat}</ACat> : <Cat  onClick={()=>{handleCat(cat)}}>{cat}</Cat>}</div>
        )}
        </Categories>
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
                            state={project.state}
                            chain={project.chainId}	
                            link={`/project/${project.objectId}`}
                            pType={project.type}
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
                            chain={project.chainId}	
                            imageUrl={project.imageUrl}
                            state={project.state}
                            link={`/project/${project.objectId}`}
                            pType={project.type}
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
                            chain={project.chainId}	
                            subcategory={project.subcategory}
                            imageUrl={project.imageUrl}
                            state={project.state}
                            link={`/project/${project.objectId}`}
                            pType={project.type}
                            pid={project.pid}
                        />
                    })}
            </ProjectBox>
        </Carousel></Container>
}

export default LatestProjects