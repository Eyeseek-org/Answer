import styled from 'styled-components';
import { getLatestBlockHeight, getLogEvents} from '../../pages/api/covalent';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Address from '../functional/Address';
import Subtitle from '../typography/Subtitle';
import {Table, Header, Tr, Cell, Loading} from './TableStyles'
import { ChainIconComponent, ExplorerReference } from '../../helpers/MultichainHelpers';
import { RewardDesc } from '../typography/Descriptions';
import optimism from '../../public/icons/optimism.png'

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

const NoOptimism = styled.div`
  margin-top: 20%;
`

const TransactionTable = () => {
  const [loading, setLoading] = useState(true);
  const [microCreatedLogs, setMicroCreatedLogs] = useState([]);
  const [transactionLogs, setTransactionLogs] = useState([]);


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
                    if (key === 'backer' || key === 'owner') {
                      return (
                        <AddressCell key={index}>
                          <Address address={row[key]} />
                        </AddressCell>
                      );
                    }
                    if (key === 'chain') {
                          return (
                            <Cell key={index}>
                                <ChainIconComponent ch={row[key]} />
                            </Cell>
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
                            <ExplorerReference ch={row['chain']} tx={row[key]} />
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
        {loading && <Loading />}
        {!loading && transactionLogs.length > 0 && mapDataToTable(transactionLogs)}
        {!loading && transactionLogs.length === 0 && <RewardDesc>No transactions found in recent history</RewardDesc>}
        <Sub>
          <Subtitle text="Deployed Microfunds" />
        </Sub>
        {!loading && microCreatedLogs.length > 0 && mapDataToTable(microCreatedLogs)}
        {!loading && microCreatedLogs.length === 0 && <RewardDesc>No transactions found in recent history</RewardDesc>}
      <NoOptimism>
        <Image src={optimism} alt='optimism' width={20} height={20} /><RewardDesc>Optimism transactions not supported by Covalent API</RewardDesc>
      </NoOptimism>
    </>
  );
};

export default TransactionTable;
