import styled from 'styled-components';
import { getLatestBlockHeight, getLogEvents} from '../../pages/api/covalent';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Subtitle from '../../components/typography/Subtitle';
import { RewardDesc } from '../../components/typography/Descriptions';
import optimism from '../../public/icons/optimism.png'
import TransactionTable from './DonationTable';
import MicrofundsTable from './MicrofundsTable';
import TableSkeleton from '../../components/skeletons/TableSkeleton';

const Sub = styled.div`
  display: flex;
  margin: 3%;
`;

const NoOptimism = styled.div`
  margin-top: 20%;
`

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [microCreatedLogs, setMicroCreatedLogs] = useState([]);
  const [transactionLogs, setTransactionLogs] = useState([]);


  useEffect(() => {
    const getData = async () => {

      //Grab latest block height to determine how many blocks to go back
      const polyBlock = await getLatestBlockHeight(80001);
      const bnbBlock = await getLatestBlockHeight(97);
      const ftmBlock = await getLatestBlockHeight(4002);

      // Covalent goes back 999 blocks, so we set the starting block back 999
      const startingPolyBlock = polyBlock - 999999;
      const startingBnbBlock = bnbBlock - 999999;
      const startingFtmBlock = ftmBlock - 999999;

      // Get all Log Events and then sort them into two event categories, MicroCreated and Transaction
      const logPolyEvents = await getLogEvents(startingPolyBlock, 80001, polyBlock);
      const logBnbEvents = await getLogEvents(startingBnbBlock, 97, bnbBlock);
      const logFtmEvents = await getLogEvents(startingFtmBlock, 4002, ftmBlock);
      var logEvents = logPolyEvents;
      if(logBnbEvents && logBnbEvents.length > 0){
        logEvents = logEvents.concat(logBnbEvents)
      }
      if (logFtmEvents && logFtmEvents.length > 0){
        logEvents = logEvents.concat(logFtmEvents)
      }

      const microCreatedEvents = logEvents.micro_created_log_data;
      const transactionEvents = logEvents.total_txn_log_data;
      setMicroCreatedLogs(microCreatedEvents);
      setTransactionLogs(transactionEvents);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
        <Sub>
          <Subtitle text="Donations" />
        </Sub>
        {loading && <TableSkeleton/>}
        {!loading && transactionLogs.length > 0 && <TransactionTable data={transactionLogs}/>}
        {!loading && transactionLogs.length === 0 && <RewardDesc>No transactions found in recent history</RewardDesc>}
        <Sub>
          <Subtitle text="Deployed Microfunds" />
        </Sub>
        {!loading && microCreatedLogs.length > 0 && <MicrofundsTable data={microCreatedLogs}/>}
        {!loading && microCreatedLogs.length === 0 && <RewardDesc>No transactions found in recent history</RewardDesc>}
      <NoOptimism>
        <Image src={optimism} alt='optimism' width={20} height={20} /><RewardDesc>Optimism transactions not supported by Covalent API</RewardDesc>
      </NoOptimism>
    </>
  );
};

export default Transactions;
