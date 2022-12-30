import styled, {useTheme} from 'styled-components';
import { useState, useEffect } from 'react';
import { CanceledIcon, ExpandIcon, NewsIcon, ShrinkIcon } from '../../components/icons/Notifications';
import { MessageIcon, SuccessIcon } from '../../components/icons/Common';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Image from 'next/image';
import Eye1 from '../../public/Eye1.png';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DapAPIService ,UniService} from '../../services/DapAPIService';
import {AnimatedModal} from '../../components/animated/AnimatedModal';
import { RewardActiveIcon, WebIcon } from '../../components/icons/Project';
import {Buttons, ButtonRow, NotiTabWrapper, NotiBox} from '../../components/notifications/Styles';
import { RewardDesc, MiniDesc } from '../../components/typography/Descriptions';
import { useQuery } from '@tanstack/react-query';
import TabImage from '../../components/form/TabImage';
import { AnimatePresence } from 'framer-motion';
import Address from '../../components/functional/Address';
import { BetweenRow } from '../../components/format/Row';

TimeAgo.addDefaultLocale(en);

const NotiItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 1%;
  font-size: 1em;
  @media (min-width: 1780px) {
    font-size: 0.9em;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1%;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 100%;
`;

const Desc = styled.div`
  font-family: 'Arial';
  font-weight: 300;
  transition: 0.5s;
  padding-right: 5px;
  letter-spacing: 0.2px;
  font-size: ${(props) => (props.expand ? '1.1em' : '0.8em')};
  color: ${(props) => props.theme.colors.font};
  @media (min-width: 1780px) {
    font-size: ${(props) => (props.expand ? '1.3em' : '1.1em')};
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding-left: 3%;
    padding-right: 3%;
  }
`;

const Ago = styled.div`
  font-family: 'Arial';
  font-size: 0.65em;
  color: ${(props) => props.theme.colors.primary};
  @media (min-width: 1780px) {
    font-size: 0.8em;
  }
`;


const Unread = styled.div`
  font-family: 'Gemunu Libre';
  background: #ffd1d1;
  box-shadow: 0px 4px 40px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  color: #ac0000;
  padding: 2px;
  margin-top: 2px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 0.7em;
  @media (min-width: 1780px) {
    font-size: 0.9em;
  }
`;

const HidUnread = styled(Unread)`
  visibility: hidden;
`;

const IconWrapper = styled.div`
  padding-right: 2%;
  padding-left: 2%;
  padding-top: 2%;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ImageBox = styled.div`
  position: absolute;
  right: 0;
  top: -300px;
  z-index: -1;
`;

const Counter = styled.div`
  display: flex;
  font-family: 'Gemunu Libre';
  font-size: 0.8em;
  color: ${(props) => props.theme.colors.font};
  width: 100%;
  min-width: 100px;
  
`

const Notifications = ({ notis, address}) => {
  const [expand, setExpand] = useState(true);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [active, setActive] = useState('Unread');
  const [data, setData] = useState(notis);

  const { mutate: updateNotification } = useMutation({
    mutationFn: (id) => DapAPIService.updateReadNotifications(id),
  });

  const { mutate: updateMessage } = useMutation({
    mutationFn: (id) => DapAPIService.updateReadMessages(id),
  });

  const updateQuery = `/classes/Notification?where={"user":"${address}", "type": "projectUpdate"}`
  const { data: updateNotis } = useQuery(['notis-updates'], () => UniService.getDataAll(updateQuery),{});

  const messageQuery = `/classes/Message?where={"recipient":"${address}"}`
  const { data: messages } = useQuery(['messages'], () => UniService.getDataAll(messageQuery),{});

  useEffect(() => {
    confirmRead();
  }, []);

  const handleNotis = () => {
    setActive('Notifications')
    setData(notis)
  }

  const handleUpdate = () => {
    setActive('Updates')
    setData(updateNotis)
  }

  const handleMessages = () => {
    setActive('Messages')
    setData(messages)
    confirmMessageRead();
  }

  const confirmMessageRead = () => {
    if (messages) {
      messages.forEach((message) => {
        if (message.isRead === false) {
          updateMessage(message.objectId, {
            onSuccess: () => {
              queryClient.refetchQueries({ queryKey: ['messages'] });
            },
          });
        }
      });
    }
  }

  const confirmRead = () => {
    if (data) {
      data.forEach((noti) => {
        if (noti.isRead === false) {
          updateNotification(noti.objectId, {
            onSuccess: () => {
              queryClient.refetchQueries({ queryKey: ['notification-data'] });
            },
          });
        }
      });
    }
  };

  return <AnimatePresence>
    <AnimatedModal expand={expand}  
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      key="notifications"
    >
     <Counter>({notis ? notis.length : null} / {updateNotis ? updateNotis.length : null} / {messages ? messages.length : null})</Counter>
      <NotiBox>
        {data &&
          data
            .slice(0, 20)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((noti, index) => (
              <NotiItem key={index}>

                  <Row>
                     <Link href={`/project/${noti.project}`}>    
                      <IconWrapper>
                        {noti.type === 'projectCanceled' && <CanceledIcon width={30} height={30} color={theme.colors.primary}  />}
                        {noti.type === 'projectUpdate' && <NewsIcon width={30} height={30} color={theme.colors.primary}  />}
                        {noti.type === 'projectFunded' && <SuccessIcon width={30} height={30} color={theme.colors.primary}  />}
                        {noti.type === 'rewardAdded' && <RewardActiveIcon width={30} height={30} color={theme.colors.primary}  />}
                        {noti.title === 'Direct message' && <MessageIcon width={30} height={30} color={theme.colors.primary} />}
                        {noti.title === 'Group message' && <MessageIcon width={30} height={30} color={theme.colors.primary} />}
                      </IconWrapper>
                    </Link>
                    <Col>
                      <BetweenRow><Desc expand={expand}>{noti.title}</Desc> {expand && noti?.sender && <Address address={noti.sender}/>}</BetweenRow>
                     {expand ?  <RewardDesc>{noti.description}</RewardDesc> : <MiniDesc>{noti.description}</MiniDesc>}
                     {expand ?  <RewardDesc>{noti.message}</RewardDesc> : <MiniDesc>{noti.message}</MiniDesc>}
                      <Ago>
                        <ReactTimeAgo date={noti.createdAt} locale="en-US" />
                      </Ago>
                    </Col>
                    <Col>{noti.isRead === false ? <Unread>New</Unread> : <HidUnread></HidUnread>}</Col>
                  </Row>
              </NotiItem>
            ))}
        {expand && (
          <ImageBox>
            <Image src={Eye1} alt={'eyee'} width={'2000px'} height={'2000px'} />
          </ImageBox>
        )}
      </NotiBox>
      <ButtonRow>
        <Buttons>
             <NotiTabWrapper>
                <TabImage active={active} o1={'Notifications'} o2={'Updates'} o3={'Messages'} change1={()=>{handleNotis()}} change2={()=>{handleUpdate()}} change3={()=>{handleMessages()}} />
             </NotiTabWrapper>
        </Buttons>
        <Buttons onClick={() => setExpand(!expand)}>
          {!expand ? <ExpandIcon width={20} height={20} color={theme.colors.primary} /> : <ShrinkIcon width={20} height={20} color={theme.colors.primary} />}
        </Buttons>
      </ButtonRow>
    </AnimatedModal>
    </AnimatePresence>
};

export default Notifications;
