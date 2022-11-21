import { useState, useEffect } from 'react';
import axios from 'axios';
import RewardCard from '../../components/cards/RewardCard';
import RewardDepletedCard from '../../components/cards/RewardDepletedCard';
import ErrText from '../../components/typography/ErrText';
import NoFound from '../../components/typography/NoFound';
import { useApp } from '../utils/appContext';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { Col, Row } from '../../components/format/Row';
import {RewardAnimatedBox} from '../../components/format/BoxAnimated';
import Subtitle from '../../components/typography/Subtitle';
import styled from 'styled-components';

const MutipleRewards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`


const RewardList = ({ oid, chain }) => {
  const { setAppState } = useApp();
  const [selected, setSelected] = useState('');
  const [desc, setDesc] = useState('');
  const [isRewardLoading, setRewardLoading] = useState(false);

  // Dummy data
  const [ipfsUri, setIpfsUri] = useState('https://ipfs.moralis.io:2053/ipfs/QmYdN8u9Wvay3uJxxVBgedZAPhndBYMUZYsysSsVqzfCQR/5000.json');

  // Extract image json.image, display it
  const query = `/classes/Reward?where={"project":"${oid}"}`
  const { data: rewards, error: rewardError } = useQuery(['rewards'], () => UniService.getDataAll(query), {});

  const handleRewardClick = (sel, rewDesc, rewAmount, type, rid, rewEligible, rewObjectId) => {
    setDesc(rewDesc)
    setSelected(rewObjectId);
    if (type === 'Microfund') {
      setAppState((prev) => ({ ...prev, rewMAmount: rewAmount, rewDAmount: 0, rewId: rid, rewEligible: rewEligible, rewObjectId: rewObjectId  }));
    } else if (type === 'Donate') {
      setAppState((prev) => ({ ...prev, rewDAmount: rewAmount, rewMAmount: 0, rewId: rid, rewEligible: rewEligible, rewObjectId: rewObjectId }));
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

  useEffect(() => {
    setRewardLoading(true)
    setTimeout(
      () => setRewardLoading(false), 1000
    )
  }, []);

  return (
    <>
      <Col>
        <Subtitle text="List of rewards" />
        <Row>
          {rewards && rewards.length > 0 ? (
            <>
              {rewards.map((reward) => {
                return <MutipleRewards>
                {reward.eligibleActual > 0 ? 
                  <RewardCard
                    key={reward.objectId}
                    objectId={reward.objectId}
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
                    tokenAmount={reward.tokenAmount}
                    selected={selected}
                    chain={chain}
                    rType={reward.rType}
                    onClick={() => handleRewardClick(reward.title, reward.description, reward.requiredPledge, reward.type, reward.rewardId, reward.eligibleActual, reward.objectId)}
                  /> :  <RewardDepletedCard
                    key={reward.objectId}
                    rid={reward.rewardId}
                    title={reward.title}
                    pledge={reward.requiredPledge}
                    description={reward.description}
                    eligibleActual={reward.eligibleActual}
                    type={reward.type}
                    cap={reward.cap}
                    tokenAddress={reward.tokenAddress}
                    tokenAmount={reward.tokenAmount}
                    rType={reward.rType}
                    nftId={reward.nftId}
                    tokenName={reward.tokenName}
                    chain={chain}
                />}
                </MutipleRewards>
              })}
            </>
          ) : (
            <>{!isRewardLoading ? <NoFound text={'No limited rewards offered'} /> : null}</>
          )}
          {rewardError && <ErrText text={'Communication error - please try again later'} />}
        </Row>
        <RewardAnimatedBox text={desc}/>
      </Col>
    </>
  );
};

export default RewardList;
