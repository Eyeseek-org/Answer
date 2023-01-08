import { useState } from 'react';
import type { NextPage } from 'next';
import Footer from '../sections/Footer/Footer';
import TabImage from '../components/form/TabImage';
import { Col } from '../components/format/Row';
import { TabBox, Wrapper } from '../components/format/Box';
import MyProjects from '../sections/My/MyProjects';
import MyStreams from '../sections/My/MyStreams';
import MyBookmarks from '../sections/My/MyBookmarks';
import MyTxTable from '../sections/Tables/MyTxTable';

const My: NextPage = () => {
  const [mode, setMode] = useState('Projects');
  const [active, setActive] = useState('Projects');

  const handleMode = (m:string) => {
    setMode(m);
    setActive(m);
  };

  return (
    <Col>
      <TabBox>
        {/* @ts-ignore */}
        <TabImage
          active={active}
          o1={'Projects'}
          o2={'Donates'}
          o3={'Bookmarks'}
          change1={() => handleMode('Projects')}
          change2={() => handleMode('Donates')}
          change3={() => handleMode('Bookmarks')}
        />
      </TabBox>
      {mode === 'Projects' && <MyProjects />}
      {mode === 'Donates' && <Wrapper><MyTxTable/></Wrapper>}
      {mode === 'Streams' && <MyStreams />}
      {mode === 'Bookmarks' && <MyBookmarks />}
      <Footer />
    </Col>
  );
};

export default My;
