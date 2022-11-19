import { useState } from "react";
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { UniService } from "../../services/DapAPIService";

import LatestProjects from "../Landing/LatestProjects";
import ProjectDetail from "../ProjectDetail/ProjectDetail"
import NotAuth from '../NotAuth'
import NotProject from '../NotProject'

import { BodyBox } from '../../components/format/Box'
import Tab from "../../components/form/Tab";
import RewardList from "../ProjectDetail/RewardList";
import RewardCreate from "../ProjectDetail/RewardCreate";
import UpdateOverview from "../ProjectDetail/UpdateOverview";
import UpdateCreate from "../ProjectDetail/UpdateCreate";
import StatsTable from "../../components/tables/StatsTable";
import SectionTitle from "../../components/typography/SectionTitle";


const MyProjects = () => {
    const {address} = useAccount();
    const [mode, setMode] = useState("Overview")
    const [active, setActive] = useState("Overview")

    const handleMode = (m) => {
        setMode(m)
        setActive(m)
      }

  const query = `/classes/Project?where={"owner":"${address}", "state": 1}`
  const { data: project } = useQuery(['active-project'], () => UniService.getDataSingle(query),{
    onError: (err) => {
      console.log(err)
    },
  });
  
    return (
        <div>
          {address ? <div>
            {project && <SectionTitle title={'Active project'} subtitle={project.title} />}
            <BodyBox>  
            <Tab 
                active={active} 
                o1={'Overview'} 
                o2={'Updates'} 
                o3={"Rewards"} 
                o4={"Transactions"}
                o5={'History'}
                change1={()=>handleMode('Overview')} 
                change2={()=>handleMode('Updates')} 
                change3={()=>handleMode('Rewards')}
                change4={()=>handleMode('Transactions')}
                change5={()=>handleMode('History')}
              />
          </BodyBox>
              {project && project.objectId ? <>      {mode === 'Overview' && <ProjectDetail 
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
                     /> }
                     
                     
                     </>: <NotProject/>}
                {mode === 'Rewards' && <><RewardList oid={project.objectId} chain={project.chainId}/><RewardCreate objectId={project.objectId} bookmarks={project.rewards} home={project.chain} pid={project.pid}/></>}
                {mode === 'Updates' && <><UpdateOverview objectId={project.objectId}/><UpdateCreate objectId={project.objectId} bookmarks={project.bookmarks} title={project.title}/></>}
                {mode === 'Transactions' && <StatsTable pid={project.pid} chain={project.chainId}/>}
                {mode === 'History' &&  <LatestProjects my />}
            </div> : <NotAuth/>}
        </div>
    );
}

export default MyProjects
