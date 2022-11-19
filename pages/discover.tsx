import styled from 'styled-components';
import type { NextPage } from 'next';

import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../components/typography/SectionTitle';
import { useRouter } from 'next/router';
import ProjectCard from '../components/cards/ProjectCard';
import { cats } from '../data/cats';
import { UniService } from '../services/DapAPIService';

const Container = styled.div`
  margin-top: 5%;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5%;
  gap: 2%;
`;

const BrowsePro: NextPage = () => {
  const router = useRouter();
  const query = `/classes/Project`
  const { data: projects} = useQuery(['projects'], () => UniService.getDataAll(query), {
    enabled: !!router.isReady,
  });

  const FilteredProjects = ({ projects }) => {
    return (
      <>
        {cats.map((cat) => {
          const CategoryProjects = projects?.filter((p) => p.category.includes(cat));
          return (
            <>
              <SectionTitle title={cat} subtitle={`Browse through ${cat} projects`} />
              <ProjectBox>
                {CategoryProjects && CategoryProjects.map((project) => (
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
      </>
    );
  };

  return (
    <Container>
      <FilteredProjects projects={projects} />
    </Container>
  );
};

export default BrowsePro;
