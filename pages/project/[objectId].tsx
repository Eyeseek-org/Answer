import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import ProjectDetail from '../../sections/ProjectDetail/ProjectDetail';
import Tab from '../../components/form/Tab';
import RewardCreate from '../../sections/ProjectDetail/RewardCreate';
import UpdateCreate from '../../sections/ProjectDetail/UpdateCreate';
import UpdateOverview from '../../sections/ProjectDetail/UpdateOverview';
import RewardList from '../../sections/ProjectDetail/RewardList';
import Verification from '../../sections/ProjectDetail/Verification';
import StatsTable from '../../components/tables/StatsTable';
import SectionTitle from '../../components/typography/SectionTitle';
import { UniService } from '../../services/DapAPIService';
import { useQuery } from '@tanstack/react-query';

const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`;

const TabBox = styled.div`
  display: flex;
  padding-left: 17%;
  margin-top: 5%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding-left: 5%;
    justify-content: center;
  }
`;

const Project: NextPage = () => {
  const router = useRouter();
  const { objectId } = router.query;
  const [mode, setMode] = useState('Overview');
  const [active, setActive] = useState('Overview');
  const { address } = useAccount();

  const query = `/classes/Project?where={"objectId":"${objectId}"}`
  const { data: project, error: projectError } = useQuery(['project-detail'], () => UniService.getDataSingle(query), {
    enabled: !!router.isReady,
  });


  const handleMode = (mode: string) => {
    setMode(mode);
    setActive(mode);
  };

  return (
    <>
      {project ? <SectionTitle title={'Project detail'} subtitle={project.title} /> : null}
      <TabBox>
        <Tab
          active={active}
          o1={'Overview'}
          o2={'Updates'}
          o3={'Rewards'}
          o4={'Transactions'}
          o5={'Verification'}
          change1={() => handleMode('Overview')}
          change2={() => handleMode('Updates')}
          change3={() => handleMode('Rewards')}
          change4={() => handleMode('Transactions')}
          change5={() => handleMode('Verification')}
        />
      </TabBox>
      <Container>
        {project ? (
          <>
            {mode === 'Overview' && (
              <ProjectDetail
                description={project.description}
                title={project.title}
                category={project.category}
                subcategory={project.subcategory}
                descM={project.descM}
                imageUrl={project.imageUrl}
                bookmarks={project.bookmarks}
                verified={project.verified}
                state={project.status}
                pid={project.pid}
                objectId={project.objectId}
                owner={project.owner}
                chainId={project.chainId}
                pType={project.type}
                urlSocial={project.urlSocial}
                urlProject={project.urlProject}
              />
            )}
            {project && mode === 'Rewards' && project.type !== 'Stream' ? 
              <>
                <RewardList oid={objectId} chain={project.chainId} />
                {address === project.owner && (
                  <RewardCreate objectId={objectId} bookmarks={project.bookmarks} pid={project.pid} home={project.chainId} />
                )}
              </> : null
            }
            {project && mode === 'Updates' && (
              <>
                <UpdateOverview objectId={objectId} />
                {address === project.owner && <UpdateCreate objectId={objectId} bookmarks={project.bookmarks} title={project.title} />}
              </>
            )}
            {mode === 'Transactions' && <StatsTable pid={project.pid} chain={project.chainId} />}
          </>
        ) : (
          <>{projectError && <>Project failed to fetch</>}</>
        )}
        {project && mode === 'Verification' && address === project.owner && project.verified !== true && <Verification objectId={objectId} owner={project.owner} />}
      </Container>
    </>
  );
};

export default Project;
