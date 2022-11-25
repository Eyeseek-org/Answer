import { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import Footer from "../sections/Footer";
import TabImage from "../components/form/TabImage";
import { Col } from "../components/format/Row";
import MyProjects from "../sections/My/MyProjects";
import MyStreams from "../sections/My/MyStreams";
import MyBookmarks from "../sections/My/MyBookmarks";

const TabBox = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  padding-left: 15%;
  font-size: 1.2em;
`

const My: NextPage = () => {
    const [mode, setMode] = useState("Projects")
    const [active, setActive] = useState("Projects")

    const handleMode = (m) => {
        setMode(m)
        setActive(m)
      }

    return <Col>
      <TabBox>
        {/* @ts-ignore */}
        <TabImage
          active={active} 
          o1={'Projects'} 
          o2={'Donates'} 
          o3={'Bookmarks'}
          o4={"Streams"}
          change1={()=>handleMode('Projects')} 
          change2={()=>handleMode('Donates')} 
          change3={()=>handleMode('Bookmarks')}
          change4={()=>handleMode('Streams')}
        />
      </TabBox>
          {mode === 'Projects' && <MyProjects/>}
          {mode === 'Streams' && <MyStreams/>}
          {mode === 'Bookmarks' && <MyBookmarks/>}
        <Footer />
    </Col>
}

export default My
