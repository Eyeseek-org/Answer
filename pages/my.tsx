import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAccount } from 'wagmi';
import axios from "axios"
import styled from "styled-components";

import LatestProjects from "../sections/Landing/LatestProjects";
import Footer from "../sections/Footer";
import ProjectDetail from "../sections/ProjectDetail/ProjectDetail"
import NotAuth from '../sections/NotAuth'
import NotProject from '../sections/NotProject'
import { moralisApiConfig } from "../data/moralisApiConfig";
import Tab from "../components/form/Tab";
import RewardList from "../sections/ProjectDetail/RewardList";
import RewardCreate from "../sections/ProjectDetail/RewardCreate";
import UpdateOverview from "../sections/ProjectDetail/UpdateOverview";
import UpdateCreate from "../sections/ProjectDetail/UpdateCreate";
import StatsTable from "../components/tables/StatsTable";
import SectionTitle from "../components/typography/SectionTitle";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const TabBox = styled.div`
  margin-top: 5%;
  margin-left: 17%;
`

const My: NextPage = () => {
    const { address } = useAccount()
    const [project, setProject] = useState<any>()
    const [mode, setMode] = useState("Overview")
    const [active, setActive] = useState("Overview")

    const handleMode = (mode: string) => {
        setMode(mode)
        setActive(mode)
      }

    const getActiveProject = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"owner":"${address}", "state": 1}`, moralisApiConfig)
            if (res.data.results.length > 0) {
                setProject(res.data.results[0])
              }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getActiveProject()
      }, [])

    return <Container>
        {address ? <div>
        {project && <SectionTitle title={'Active project'} subtitle={project.title} />}
        <TabBox>  
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
      </TabBox>
    {/* @ts-ignore */}
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
        <Footer />
    </Container>
}

export default My