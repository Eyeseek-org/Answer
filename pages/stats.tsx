import StreamTable from '../components/tables/StreamTable';
import styled from 'styled-components';
import SectionTitle from '../components/typography/SectionTitle';
import Tab from '../components/form/Tab';
import { useState } from 'react';
import TransactionTable from '../components/tables/TransactionTable';

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
  const [active, setActive] = useState('Transactions');
  return <>
    <SectionTitle title={'Transactions'} subtitle={'Overview'} />
    <Container>
         <Tab 
            active={active} 
            o1={'Transactions'} 
            o2={'Streams'} 
            change1={() => setActive('Transactions')} 
            change2={() => setActive('Streams')} 
          />
         {active === 'Streams' && <StreamTable/>}
         {active === 'Transactions' && <TransactionTable/>}
    </Container>
    </>
};

export default Stats;
