import { useRouter } from "next/router"
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";

import ProjectDetail from "../../sections/ProjectDetail/ProjectDetail"
import Tab from "../../components/form/Tab";
import RewardCreate from "../../sections/ProjectDetail/RewardCreate";
import UpdateCreate from "../../sections/ProjectDetail/UpdateCreate";
import UpdateOverview from "../../sections/ProjectDetail/UpdateOverview";
import RewardList from "../../sections/ProjectDetail/RewardList";
import { moralisApiConfig } from "../../data/moralisApiConfig";
import StatsTable from '../../components/tables/StatsTable'

const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const TabBox = styled.div`
  margin-left: 17%;
`

const Project: NextPage = () => {
  const router = useRouter()
  const { objectId } = router.query 
  const [mode, setMode] = useState("Overview")
  const [active, setActive] = useState("Overview")

  const [project, setProject] = useState<any>()
  const [apiError, setApiError] = useState(false)

  const getProjectDetail = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"objectId":"${objectId}"}`,moralisApiConfig)
        if (res.data.results.length > 0) {
          setProject(res.data.results[0])
        }
        setApiError(false)
    } catch (err) {
        console.log(err)
        setApiError(true)
    }
}


  const handleMode = (mode: string) => {
    setMode(mode)
    setActive(mode)
  }

  useEffect(() => {
    if(!router.isReady) return;
    getProjectDetail()
  }, [router.isReady])


  return (
    <>
      <TabBox>  
        <Tab 
          active={active} 
          o1={'Overview'} 
          o2={'Updates'} 
          o3={"Rewards"} 
          o4={"Transactions"}
          change1={()=>handleMode('Overview')} 
          change2={()=>handleMode('Updates')} 
          change3={()=>handleMode('Rewards')}
          change4={()=>handleMode('Transactions')}
          />
      </TabBox>
        {/* {rewardTooltip && <Tooltip margin={'25px'} text='Add project reward' />}
          {updateTooltip && <Tooltip margin={'25px'} text='Send project update to users' />}
          <IconWrapper onClick={() => { setMode('Update') }} onMouseEnter={() => { setUpdateTooltip(true) }} onMouseLeave={() => {setUpdateTooltip(false)}}><UpdateSvg width={75} /></IconWrapper>
          <IconWrapper onClick={() => { setMode('Reward') }} onMouseEnter={() => { setRewardTooltip(true) }} onMouseLeave={() => {setRewardTooltip(false)}}><RewardIcon width={25} /></IconWrapper> */}
      <Container>
      {project ?  <>
    {mode === 'Overview' &&   <ProjectDetail 
          description={project.description}  title={project.title} category={project.category} subcategory={project.subcategory} 
          imageUrl={project.imageUrl} 
          bookmarks={project.bookmarks}
          verified={project.verified}
          state={project.status}
          pid={project.pid}
          objectId={project.objectId}
          owner={project.owner}
          chain={project.chain}
          pType={project.type}
        />}
      {mode === 'Rewards' && <><RewardList oid={objectId}/><RewardCreate objectId={objectId} rewards={project.rewards}/></>}
      {mode === 'Updates' && <><UpdateOverview objectId={objectId}/><UpdateCreate objectId={objectId} bookmarks={project.bookmarks} title={project.title}/></>}
      {mode === 'Transactions' && <StatsTable objectId={objectId} pid={project.pid} chain={project.chain}/>}
      </> : <>{apiError && <>Project failed to fetch</>}</>}
      </Container>
    </>
  )
}

export default Project
