import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';

import LatestProjects from '../Landing/LatestProjects';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import NotAuth from '../NotAuth';

import RewardList from '../ProjectDetail/RewardList';
import RewardCreate from '../ProjectDetail/RewardCreate';
import UpdateOverview from '../ProjectDetail/UpdateOverview';
import UpdateCreate from '../ProjectDetail/UpdateCreate';
import StatsTable from '../../components/tables/StatsTable';
import SectionTitle from '../../components/typography/SectionTitle';
import { MainContainer, SpacingBox } from '../../components/format/Box';
import Tab from '../../components/form/Tab';

const MyProjects = () => {
  const { address } = useAccount();
  const [active, setActive] = useState('Rewards');

  const { data: project } = useQuery(
    ['active-project'],
    () => UniService.getDataSingle(`/classes/Project?where={"owner":"${address}", "state": 1}`),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );


  return (
    <>
      {address ? <>
          {project && <>
              <SectionTitle title={'My active project'} subtitle={project.title} />
            <SpacingBox>
              <Tab 
                  active={active} 
                  o1={'Overview'} o2={'Rewards'} o3={'Updates'} o4={'Transactions'} o5={'History'}
                  change1={() => setActive('Overview')} change2={() => setActive('Rewards')} change3={() => setActive('Updates')} change4={() => setActive('Transactions')} change5={() => setActive('History')} />
              <MainContainer>
                  {active === 'Overview' &&  <ProjectDetail
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
                    />}
                  {active === 'Rewards' && <>            
                    <RewardList oid={project?.objectId} chain={project?.chainId} />
                    <RewardCreate
                        objectId={project?.objectId}
                        bookmarks={project?.rewards}
                        home={project?.chain}
                        pid={project?.pid}
                        owner={project?.owner}
                    /></>}
                  {active === 'Updates' && <>
                    <UpdateOverview objectId={project?.objectId} />
                    <UpdateCreate objectId={project?.objectId} bookmarks={project?.bookmarks} title={project?.title} />
                  </>}
                  {active === 'Transactions' && <StatsTable pid={project?.pid} chain={project?.chainId} />}
                  {active === 'History' && <LatestProjects my />}

              </MainContainer>
              
              </SpacingBox>
            </>
          }
        </>
       : <>
        <NotAuth />
      </>}
    </>
  );
};

export default MyProjects;
