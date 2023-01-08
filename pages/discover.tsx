import StreamTable from '../sections/Tables/StreamTable';
import styled from 'styled-components';
import SectionTitle from '../components/typography/SectionTitle';
import Tab from '../components/form/Tab';
import { useState } from 'react';
import Transactions from '../sections/Tables/Transactions';
import ProjectTable from '../sections/Tables/ProjectTable';
import RewardsAll from '../sections/Tables/RewardsAll';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
  margin-bottom: 10%;
  @media (max-width: 1168px) {
    margin: 2%;
  }
  @media (min-width: 1968px) {
    margin-left: 22%;
    margin-right: 22%;
  }
`;

const TabWrapper = styled.div`
  position: relative;
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
            o4={undefined} 
            o2={'Transactions'}
            o3={'Rewards'}
            o5={undefined}
            change1={() => setActive('Projects')} 
            change4={undefined} 
            change2={() => setActive('Transactions')} 
            change3={() => setActive('Rewards')} 
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
