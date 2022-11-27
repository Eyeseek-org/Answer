import styled from 'styled-components';
import { getLatestBlockHeight, getLogEvents } from '../../pages/api/covalent';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Loading from '../Loading';
import Subtitle from '../typography/Subtitle';
import { RewardDesc } from '../typography/Descriptions';
import optimism from '../../public/icons/optimism.png'

const Container = styled.div`
  padding-bottom: 2%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding-left: 3%;
    padding-right: 3%;
  }
`;


const Sub = styled.div`
  display: flex;
  margin: 3%;
`;

const NoOptimism = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
`


const StatsTable = ({ pid, chain }) => {
  const [loading, setLoading] = useState(true);
  //MicroCreated States
  const [microCreatedLogs, setMicroCreatedLogs] = useState([]);
  const [filteredMicroCreatedLogs, setFilteredMicroCreatedLogs] = useState([]);
  //Transaction States
  const [transactionLogs, setTransactionLogs] = useState([]);
  const [filteredTransactionLogs, setFilteredTransactionLogs] = useState([]);
  //Explorer State for Txn Display
  const [explorer, setExplorer] = useState('');

  useEffect(() => {
    if (chain !== 420 ) {
      const getData = async () => {
        // switch case to set explorer url based on which chain is passed in
        switch (chain) {
          case 80001:
            setExplorer('https://mumbai.polygonscan.com/tx/');
            break;
          case 97:
            setExplorer('https://testnet.bscscan.com/tx/');
            break;
          case 4002:
            setExplorer('https://explorer.testnet.fantom.network/tx/');
            break;
          default:
            setExplorer('https://mumbai.polygonscan.com/tx/');
            break;
        }
  
        //Grab latest block height to determine how many blocks to go back
        const latestBlockHeight = await getLatestBlockHeight(chain);
  
        // Covalent goes back 999 blocks, so we set the starting block back 999
        const startingBlock = latestBlockHeight - 999;
  
        // Get all Log Events and then sort them into two event categories, MicroCreated and Transaction
        const logEvents = await getLogEvents(startingBlock, chain, latestBlockHeight);
        const microCreatedEvents = logEvents.micro_created_log_data;
        const transactionEvents = logEvents.total_txn_log_data;
        setMicroCreatedLogs(microCreatedEvents);
        setTransactionLogs(transactionEvents);
  
        // filter data to render by the finding the logs that match the fund id to the incoming pid
        const filteredMicroCreatedLogs = microCreatedEvents.filter((log) => {
          return log.fund_id === pid;
        });
        const filteredTransactionLogs = transactionEvents.filter((log) => {
          return log.fund_id === pid;
        });
        setFilteredTransactionLogs(filteredTransactionLogs);
        setFilteredMicroCreatedLogs(filteredMicroCreatedLogs);
        setLoading(false);
      };
      getData();
    }
  }, []);

  return (
    <>
    {chain !== 420 &&   <Container>
        <Sub>
          <Subtitle text="Donations" />
        </Sub>
        {loading && <Loading />}
        {!loading && filteredTransactionLogs.length > 0 && <DonationTable data={filteredTransactionLogs}/>}
        {!loading && filteredTransactionLogs.length === 0 && <p>No transactions found in recent history</p>}
        <Sub>
          <Subtitle text="Deployed Microfunds" />
        </Sub>
        {!loading && filteredMicroCreatedLogs.length > 0 &&  <MicrofundsTable data={filteredTransactionLogs}/>}
        {!loading && filteredMicroCreatedLogs.length === 0 && <p>No transactions found in recent history</p>}
      </Container>}
      <NoOptimism>
        <Image src={optimism} alt='optimism' width={20} height={20} /><RewardDesc>Optimism transactions not supported by Covalent API</RewardDesc>
      </NoOptimism>
    </>
  );
};

export default StatsTable;
