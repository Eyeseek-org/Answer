import { useState } from 'react';
import axios from 'axios';
import RewardCard from '../../components/cards/RewardCard';
import ErrText from '../../components/typography/ErrText';
import NoFound from '../../components/typography/NoFound';
import { useApp } from '../utils/appContext';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { Col, Row } from '../../components/format/Row';


// Display rewards
// Add reward types and other metadata
const RewardList = ({ oid, chain }) => {
  const { setAppState } = useApp();
  const [selected, setSelected] = useState('');

  // Dummy data
  const [ipfsUri, setIpfsUri] = useState('https://ipfs.moralis.io:2053/ipfs/QmYdN8u9Wvay3uJxxVBgedZAPhndBYMUZYsysSsVqzfCQR/5000.json');

  // Extract image json.image, display it
  const query = `/classes/Reward?where={"project":"${oid}"}`
  const { data: rewards, isLoading: isRewardsLoading, error: rewardError } = useQuery(['rewards'], () => UniService.getDataAll(query), {});

  const handleRewardClick = (sel, rewAmount, type, rid) => {
    setSelected(sel);
    if (type === 'Microfund') {
      setAppState((prev) => ({ ...prev, rewMAmount: rewAmount, rewDAmount: 0, rewId: rid }));
    } else if (type === 'Donation') {
      setAppState((prev) => ({ ...prev, rewDAmount: rewAmount, rewMAmount: 0, rewId: rid }));
    }
  };

  const params = {
    chain: 'mumbai',
    format: 'decimal',
  };
  const getNft = async (address, id) => {
    try {
      const res = await axios.get(
        `https://deep-index.moralis.io/api/v2/nft/${address}/${id}`,
        { params },
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      if (res.data.length > 0) {
        setIpfsUri(res.data.result.token_uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Col>
        <Row>
          {rewards && rewards.length > 0 ? (
            <>
              {rewards.map((reward) => {
                return (
                  <RewardCard
                    key={reward.objectId}
                    rid={reward.rewardId}
                    title={reward.title}
                    pledge={reward.requiredPledge}
                    description={reward.description}
                    eligibleActual={reward.eligibleActual}
                    type={reward.type}
                    cap={reward.cap}
                    tokenAddress={reward.tokenAddress}
                    nftId={reward.nftId}
                    tokenName={reward.tokenName}
                    selected={selected}
                    chain={chain}
                    onClick={() => handleRewardClick(reward.title, reward.requiredPledge, reward.type, reward.rewardId)}
                  />
                );
              })}
            </>
          ) : (
            <>{!isRewardsLoading ? <NoFound text={'No limited rewards offered'} /> : null}</>
          )}
          {rewardError && <ErrText text={'Communication error - please try again later'} />}
        </Row>
      </Col>
    </>
  );
};

export default RewardList;
