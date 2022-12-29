import { useState, useEffect } from 'react';
import axios from 'axios';
import RewardCard from '../../components/cards/RewardCard';
import ErrText from '../../components/typography/ErrText';
import NoFound from '../../components/typography/NoFound';
import { useApp } from '../utils/appContext';
import { useQuery } from '@tanstack/react-query';
import { UniService } from '../../services/DapAPIService';
import { Col, Row } from '../../components/format/Row';
import { RewardAnimatedBox } from '../../components/format/RewardAnimatedBox';
import styled, { useTheme } from 'styled-components';
import Modal from 'react-modal';
import { CloseIcon } from '../../components/icons/Notifications';
import { AbsoluteRight } from '../../components/format/Box';
import CustomModal from '../../components/cards/CustomModal';
import {motion} from 'framer-motion'

const MutipleRewards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const CloseModal = styled(motion.div)`
    position: fixed;
    top: 100px;
    background: black;
    border-radius: 50%;
    padding: 15px;
    left: 27%;
    z-index: 1000;
    border: 1px solid ${(props) => props.theme.colors.border};
    cursor: pointer;
`

const CloseReactModal = styled.div`
    background: black;
    border-radius: 50%;
    z-index: 1000;
    border: 1px solid ${(props) => props.theme.colors.border};
    cursor: pointer;
`

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
`

const Wrapper = styled.div`
  z-index: 100;
`

const RewardList = ({ oid, chain, type }) => {
  const { setAppState } = useApp();
  const [selected, setSelected] = useState('');
  const [estimation, setEstimation] = useState('');
  const [rType, setRType] = useState('');
  const [isRewardLoading, setRewardLoading] = useState(false);
  const [actReward, setActReward] = useState('');
  const [ipfsUri, setIpfsUri] = useState('https://ipfs.moralis.io:2053/ipfs/QmYdN8u9Wvay3uJxxVBgedZAPhndBYMUZYsysSsVqzfCQR/5000.json');
  const theme = useTheme();

  Modal.setAppElement(document.getElementById('root'));

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      background: theme.colors.cardGradient,
      border: theme.colors.border
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false)
  function afterOpenModal() { }
  function closeModal() { setIsOpen(false) }


  // Extract image json.image, display it
  const query = `/classes/Reward?where={"project":"${oid}"}`
  const { data: rewards, error: rewardError } = useQuery(['rewards'], () => UniService.getDataAll(query), {});
  const handleRewardClick = (rewAmount, type, rid, rewEligible, rewObjectId, rewDonors, estimation, reward) => {
    setIsOpen(true);
    setSelected(rewObjectId);
    setEstimation(estimation)
    setRType(reward?.rType)
    setActReward(reward)
    if (type === 'Microfund') {
      setAppState((prev) => ({ ...prev, rewMAmount: rewAmount, rewDAmount: 0, rewId: rid, rewEligible: rewEligible, rewObjectId: rewObjectId, rewDonors: rewDonors }));
    } else if (type === 'Donate') {
      setAppState((prev) => ({ ...prev, rewDAmount: rewAmount, rewMAmount: 0, rewId: rid, rewEligible: rewEligible, rewObjectId: rewObjectId, rewDonors: rewDonors }));
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
    <Wrapper>
      <Col>
        <Row>
          {rewards && rewards.length > 0 ? (
            <>
              {rewards.map((reward) => {
                return <MutipleRewards>
                    <RewardCard
                      reward={reward}
                      key={reward.objectId}
                      selected={selected}
                      onClick={() => handleRewardClick( reward.requiredPledge,reward.type,reward.rewardId,reward.eligibleActual, reward.objectId,reward.donors,reward.estimation, reward )}
                     /> 
                </MutipleRewards>
              })}
            </>
          ) : (
            <>{!isRewardLoading ? <NoFound text={'No limited rewards offered'} /> : null}</>
          )}
          {rewardError && <ErrText text={'Communication error - please try again later'} />}
        </Row>
      </Col>
        {type !== 'donate' ? 
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <AbsoluteRight onClick={closeModal} style={{ cursor: 'pointer' }} > 
            <CloseReactModal>
              <CloseIcon width={15} height={15} color={theme.colors.primary}  />
              </CloseReactModal>
            </AbsoluteRight>
            <RewardAnimatedBox reward={actReward} />
          </Modal> 
          : 
        <>{modalIsOpen && <ModalWrapper >
        <CustomModal openModal={modalIsOpen}  reward={actReward} />
          <CloseModal onClick={() => {setIsOpen(false) }} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 500, damping: 3 }}>
            <CloseIcon width={15} color={theme.colors.primary} />
          </CloseModal>
        </ModalWrapper>}</>}
    </Wrapper>
  );
};

export default RewardList;
