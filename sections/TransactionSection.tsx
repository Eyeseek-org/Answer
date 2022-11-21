import styled from 'styled-components';
import { getLatestBlockHeight, getLogEvents } from '../pages/api/covalent';
import { useEffect, useState } from 'react';
import Address from '../components/functional/Address';
import Subtitle from '../components/typography/Subtitle';
import { Table, Header, Tr, Cell, Loading } from '../components/tables/TableStyles';
import { ChainIconComponent, ExplorerReference } from '../helpers/MultichainHelpers';
import { useReactTable } from '@tanstack/react-table';
import TransactionTable from '../components/tables/TransactionTable';

const AddressCell = styled(Cell)`
  width: 100px;
  @media (max-width: 768px) {
    width: 50px;
  }
`;

const Sub = styled.div`
  display: flex;
  margin: 3%;
`;

const TransactionSection = () => {
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
      if (logBnbEvents && logBnbEvents.length > 0) {
        logEvents = logEvents.concat(logBnbEvents);
      }
      if (logFtmEvents && logFtmEvents.length > 0) {
        logEvents = logEvents.concat(logFtmEvents);
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
      {loading && <Loading />}
      {!loading && transactionLogs.length > 0 && <TransactionTable data={transactionLogs} />}
      {!loading && transactionLogs.length === 0 && <p>No transactions have been made in last 999 blocks</p>}
      <Sub>
        <Subtitle text="Deployed Microfunds" />
      </Sub>
      {!loading && microCreatedLogs.length > 0 && <TransactionTable data={microCreatedLogs} />}
      {!loading && microCreatedLogs.length === 0 && <p>No microfunds created in last 999 blocks</p>}
    </>
  );
};

export default TransactionSection;
