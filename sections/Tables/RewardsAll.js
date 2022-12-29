import styled from 'styled-components';
import { getLatestBlockHeight } from '../../pages/api/covalent';
import { getRewardEvents} from '../../pages/api/rewards';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Subtitle from '../../components/typography/Subtitle';
import { RewardDesc } from '../../components/typography/Descriptions';
import optimism from '../../public/icons/optimism.png'
import RewardAllTable from './RewardAllTable';
import TableSkeleton from '../../components/skeletons/TableSkeleton';

const Sub = styled.div`
  display: flex;
  margin: 3%;
`;

const NoOptimism = styled.div`
  margin-top: 20%;
`

const RewardsAll = () => {
  const [loading, setLoading] = useState(true);
  const [rewardLogs, setRewardLogs] = useState([]);


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
      const logPolyEvents = await getRewardEvents(startingPolyBlock, 80001, polyBlock);
      const logBnbEvents = await getRewardEvents(startingBnbBlock, 97, bnbBlock);
      const logFtmEvents = await getRewardEvents(startingFtmBlock, 4002, ftmBlock);
      var logEvents = logPolyEvents;
      if(logBnbEvents && logBnbEvents.length > 0){
        logEvents = logEvents.concat(logBnbEvents)
      }
      if (logFtmEvents && logFtmEvents.length > 0){
        logEvents = logEvents.concat(logFtmEvents)
      }

      const rewardEvents = logEvents.total_txn_log_data;
      setRewardLogs(rewardEvents);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
        <Sub>
          <Subtitle text="All rewards" />
        </Sub>
        {loading && <TableSkeleton/>}
        {!loading && rewardLogs.length > 0 && <RewardAllTable data={rewardLogs}/>}
        {!loading && rewardLogs.length === 0 && <RewardDesc>No transactions found in recent history</RewardDesc>}
      <NoOptimism>
        <Image src={optimism} alt='optimism' width={20} height={20} /><RewardDesc>Optimism transactions not supported by Covalent API</RewardDesc>
      </NoOptimism>
    </>
  );
};

export default RewardsAll;
