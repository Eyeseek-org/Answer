import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../components/typography/SectionTitle';
import ProjectCard from '../components/cards/ProjectCard';
import { cats } from '../data/cats';
import { UniService } from '../services/DapAPIService';
import { Project } from '../types/project';
import { Container, ProjectBox } from '../styles/pages/discover';

const BrowsePro: NextPage = () => {
  const { data: projects } = useQuery(['projects'], () => UniService.getDataAll<Project>('/classes/Project'));

  return (
    <Container>
      {cats.map((category) => {
        const categoryProjects = projects?.filter((project) => project.category.includes(category));
        return (
          <>
            <SectionTitle title={category} subtitle={`Browse through ${category} projects`} />
            <ProjectBox>
              {categoryProjects &&
                categoryProjects.map((project) => (
                  <ProjectCard
                    key={project.objectId}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    subcategory={project.subcategory}
                    hasFungible={project.hasFungible}
                    hasNft={project.hasNft}
                    link={`/project/${project.objectId}`}
                    state={project.state}
                    chainId={project.chainId}
                    pid={project.pid}
                    imageUrl={project.imageUrl}
                    pType={project.type}
                  />
                ))}
            </ProjectBox>
          </>
        );
      })}
    </Container>
  );
};

export default BrowsePro;
