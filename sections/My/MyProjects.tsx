import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';

import LatestProjects from '../Landing/LatestProjects';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import NotAuth from '../NotAuth';
import NotProject from '../NotProject';

import RewardList from '../ProjectDetail/RewardList';
import RewardCreate from '../ProjectDetail/RewardCreate';
import UpdateOverview from '../ProjectDetail/UpdateOverview';
import UpdateCreate from '../ProjectDetail/UpdateCreate';
import StatsTable from '../../components/tables/StatsTable';
import SectionTitle from '../../components/typography/SectionTitle';
import { Tab, TabsContent } from '../../components/tab/Tab';
import { MainContainer, Wrapper } from '../../components/format/Box';

const MyProjects = () => {
  const { address } = useAccount();

  const { data: project } = useQuery(
    ['active-project'],
    () => UniService.getDataSingle(`/classes/Project?where={"owner":"${address}", "state": 1}`),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const tabsContent: TabsContent[] = useMemo(
    () => [
      {
        label: 'Overview',
        component: (
          <>
            {project?.objectId ? (
              <ProjectDetail
                  objectId={project.objectId}
                  pid={project.pid}
                  description={project.description}
                  title={project.title}
                  category={project.category}
                  subcategory={project.subcategory}
                  imageUrl={project.imageUrl}
                  state={project.state}
                  chainId={project.chainId}
                  bookmarks={project.bookmarks}
                  verified={project.verified}
                  urlSocial={project.urlSocial}
                  urlProject={project.urlProject}
                  pType={project.type}
                  owner={project.owner}
                  descM={project.descM}
                  youtube={project.youtube}
              />
            ) : (
              <NotProject />
            )}
          </>
        ),
      },
      {
        label: 'Rewards',
        component: (
          <>
            <Wrapper><RewardList oid={project?.objectId} chain={project?.chainId} /></Wrapper>
            <RewardCreate
                objectId={project?.objectId}
                bookmarks={project?.rewards}
                home={project?.chain}
                pid={project?.pid}
                owner={project?.owner}
            />
          </>
        ),
      },
      {
        label: 'Updates',
        component: (
          <>
            <UpdateOverview objectId={project?.objectId} />
            <UpdateCreate objectId={project?.objectId} bookmarks={project?.bookmarks} title={project?.title} />
          </>
        ),
      },
      {
        label: 'Transactions',
        component: <StatsTable pid={project?.pid} chain={project?.chainId} />,
      },
      {
        label: 'History',
        component: <LatestProjects my />,
      },
    ],
    [project]
  );

  return (
    <MainContainer>
      {address ? (
        <>
          {project && (
            <div>
              <SectionTitle title={'My active project'} subtitle={project.title} />
              <Tab tabs={tabsContent} />
            </div>
          )}
        </>
      ) : (
        <NotAuth />
      )}
    </MainContainer>
  );
};

export default MyProjects;
