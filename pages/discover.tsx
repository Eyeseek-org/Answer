import StreamTable from '../components/tables/StreamTable';
import styled from 'styled-components';
import SectionTitle from '../components/typography/SectionTitle';
import Tab from '../components/form/Tab';
import { useState } from 'react';
import TransactionTable from '../components/tables/TransactionTable';
import ProjectTable from '../components/tables/ProjectTable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
  margin-bottom: 10%;
`;

const TabWrapper = styled.div`
  margin-bottom: 5%;
`

// Create couple of common tables

const Discover = () => {
  const [active, setActive] = useState('Projects');
  return <>
    <SectionTitle title={'Discover'} subtitle={'Data overview'} />
    <Container>
      <TabWrapper>
        {/* @ts-ignore */}
         <Tab 
            active={active} 
            o1={'Projects'} 
            o2={'Streams'} 
            o3={'Transactions'}
            change1={() => setActive('Projects')} 
            change2={() => setActive('Streams')} 
            change3={() => setActive('Transactions')} 
          />
        </TabWrapper>
         {active === 'Projects' && <ProjectTable/>}
         {active === 'Streams' && <StreamTable/>}
         {active === 'Transactions' && <TransactionTable/>}
    </Container>
    </>
};

export default Discover;
