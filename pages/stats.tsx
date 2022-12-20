import StreamTable from '../sections/Tables/StreamTable';
import styled from 'styled-components';
import SectionTitle from '../components/typography/SectionTitle';
import Tab from '../components/form/Tab';
import { useState } from 'react';
import ProjectTable from '../sections/Tables/ProjectTable';
import TransactionSection from '../sections/TransactionSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
  margin-bottom: 10%;
`;


// Create couple of common tables

const Stats = () => {
  const [active, setActive] = useState('Projects');
  return <>
    <SectionTitle title={'Discover'} subtitle={'Data overview'} />
    <Container>
         <Tab
             active={active}
             o1={'Projects'}
             o2={'Streams'}
             o3={'Transactions'}
             o4={undefined}
             o5={undefined}
             change1={() => setActive('Projects')}
             change2={() => setActive('Streams')}
             change3={() => setActive('Transactions')}
             change4={undefined}
             change5={undefined}          />
         {active === 'Projects' && <ProjectTable/>}
         {active === 'Streams' && <StreamTable/>}
         {active === 'Transactions' && <TransactionSection/>}
    </Container>
    </>
};

export default Stats;
