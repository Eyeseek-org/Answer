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
                pType={project.type}
                owner={project.owner}
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
            <RewardList oid={project?.objectId} chain={project?.chainId} />
            <RewardCreate objectId={project?.objectId} bookmarks={project?.rewards} home={project?.chain} pid={project?.pid} />
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
    <div>
      {address ? (
        <>
          {project && (
            <div>
              <SectionTitle title={'Active project'} subtitle={project.title} />
              <Tab tabs={tabsContent} />
            </div>
          )}
        </>
      ) : (
        <NotAuth />
      )}
    </div>
  );
};

export default MyProjects;
