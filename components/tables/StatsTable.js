import styled from 'styled-components';
import { getLatestBlockHeight, getLogEvents } from '../../pages/api/covalent';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import Address from '../functional/Address';
import Subtitle from '../typography/Subtitle';
import {Table, Header, Tr, Cell} from './TableStyles'

import { ExpandIcon } from '../icons/Notifications';

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

  const AddressCell = styled(Cell)`
    width: 150px;
    @media (max-width: 768px) {
      width: 50px;
    }
  `;

  const TxnCell = styled(Cell)`
    width: 150px;
    @media (max-width: 768px) {
      width: 50px;
    }
  `;

  const Sub = styled.div`
    display: flex;
    margin: 3%;
  `;

  //create function that maps data into a table using keys as headers
  const mapDataToTable = (data) => {
    return (
      <Table>
        <thead>
          <Tr>
            {Object.keys(data[0]).map((key, index) => {
              if (key != 'fund_id' && key != 'txn_hash') {
                const formattedKey = key
                  .split('_')
                  .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  })
                  .join(' ');
                return <Header key={index}>{formattedKey}</Header>;
              }
              if (key === 'txn_hash') {
                return <Header key={index}> </Header>;
              }
            })}
          </Tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <Tr key={index}>
                {Object.keys(row).map((key, index) => {
                  if (key != 'fund_id') {
                    if (key === 'donator_address' || key === 'owner') {
                      return (
                        <AddressCell key={index}>
                          <Address address={row[key]} />
                        </AddressCell>
                      );
                    }
                    if (key === 'currency_id') {
                      return (
                        <Cell key={index}>
                          {row[key] == 1 && 'USDC'}
                          {row[key] == 2 && 'USDT'}
                          {row[key] == 3 && 'DAI'}
                        </Cell>
                      );
                    }
                    //if it's the tx hash, make it a link
                    if (key === 'txn_hash') {
                      return (
                        <Cell key={index}>
                          <a href={`${explorer}${row[key]}`} target="_blank" rel="noreferrer">
                            <ExpandIcon width={20} height={20} />
                          </a>
                        </Cell>
                      );
                    } else {
                      return <Cell key={index}>{row[key]}</Cell>;
                    }
                  }
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Container>
        <Sub>
          <Subtitle text="Donations" />
        </Sub>
        {loading && <Loading />}
        {!loading && filteredTransactionLogs.length > 0 && mapDataToTable(filteredTransactionLogs)}
        {!loading && filteredTransactionLogs.length === 0 && <p>No transactions found in recent history</p>}
        <Sub>
          <Subtitle text="Deployed Microfunds" />
        </Sub>
        {!loading && filteredMicroCreatedLogs.length > 0 && mapDataToTable(filteredMicroCreatedLogs)}
        {!loading && filteredMicroCreatedLogs.length === 0 && <p>No transactions found in recent history</p>}
      </Container>
    </>
  );
};

export default StatsTable;
