import StreamTable from '../sections/Tables/StreamTable';
import styled from 'styled-components';
import SectionTitle from '../components/typography/SectionTitle';
import Tab from '../components/form/Tab';
import { useState } from 'react';
import Transactions from '../sections/Tables/Transactions';
import ProjectTable from '../sections/Tables/ProjectTable';
import RewardsAll from '../components/tables/RewardsAll';

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
  padding-left: 2%;
`

// Create couple of common tables

const Discover = () => {
  const [active, setActive] = useState('Projects');
  return <>
    <SectionTitle title={'Discover'} subtitle={'Data overview'} />
    <Container>
      <TabWrapper>
         <Tab 
            active={active} 
            o1={'Projects'} 
            o2={'Streams'} 
            o3={'Transactions'}
            o4={'Rewards'}
            o5={undefined}
            change1={() => setActive('Projects')} 
            change2={() => setActive('Streams')} 
            change3={() => setActive('Transactions')} 
            change4={() => setActive('Rewards')} 
            change5={undefined}
          />
        </TabWrapper>
         {active === 'Projects' && <ProjectTable/>}
         {active === 'Streams' && <StreamTable/>}
         {active === 'Transactions' && <Transactions/>}
         {active === 'Rewards' && <RewardsAll/>}
    </Container>
    </>
};

export default Discover;
