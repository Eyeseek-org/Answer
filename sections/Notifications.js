import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { CanceledIcon, ExpandIcon, NewsIcon, ShrinkIcon } from '../components/icons/Notifications';
import { RewardIcon, SuccessIcon } from '../components/icons/Common';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Image from 'next/image';
import Eye1 from '../public/Eye1.png';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DapAPIService } from '../services/DapAPIService';

TimeAgo.addDefaultLocale(en);

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0%;
  z-index: 1;
  top: 15%;
  transition: all 0.7s ease-in-out;
  height: 500px;
  width: ${(props) => (props.expand ? '800px' : '300px')};
  background: linear-gradient(155.74deg, #1c1c1c 0%, #000000 120.65%);
  border-radius: 10px;
  border: 1px solid #4e4e4e;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #9bffff;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-left: 3%;
    padding-right: 3%;
  }
`;

const NotiBox = styled.div`
  margin-top: 60px;
  position: relative;
`;

const NotiItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #585858;
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
  background: ${(props) => props.theme.colors.gradient};
  padding: 2%;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Desc = styled.div`
  font-family: 'Arial';
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 0.2px;
  font-size: ${(props) => (props.expand ? '1.1em' : '0.8em')};
  color: #ffffff;
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
  color: #b0f6ff;
  @media (min-width: 1780px) {
    font-size: 0.8em;
  }
`;

const ButtonRow = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: ${(props) => props.theme.colors.black};
  padding: 2%;
  padding-right: 5%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: 'Neucha';
  font-style: italic;
  font-weight: 400;
  padding-right: 15px;
  letter-spacing: 0.2px;
  font-size: 1.2em;
  color: #b0f6ff;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  @media (min-width: 1780px) {
    font-size: 1.4em;
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
`;

const ImageBox = styled.div`
  position: absolute;
  right: 0;
  top: -300px;
  z-index: -1;
`;

const Notifications = ({ notis }) => {
  const [expand, setExpand] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateNotification } = useMutation({
    mutationFn: (id) => DapAPIService.updateReadNotifications(id),
  });

  useEffect(() => {
    confirmRead();
  }, []);

  const confirmRead = () => {
    if (notis) {
      notis.forEach((noti) => {
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

  return (
    <Container expand={expand}>
      <NotiBox>
        {notis &&
          notis
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((noti, index) => (
              <NotiItem key={index}>
                <Link href={`/project/${noti.project}`}>
                  <Row>
                    <IconWrapper>
                      {noti.type === 'projectCanceled' && <CanceledIcon width={20} height={20} />}
                      {noti.type === 'projectUpdate' && <NewsIcon width={20} height={20} />}
                      {noti.type === 'projectFunded' && <SuccessIcon width={20} height={20} />}
                      {noti.type === 'rewardAdded' && <RewardIcon width={20} height={20} />}
                    </IconWrapper>
                    <Col>
                      <Desc expand={expand}>{noti.description}</Desc>
                      <Ago>
                        <ReactTimeAgo date={noti.createdAt} locale="en-US" />
                      </Ago>
                    </Col>
                    <Col>{noti.isRead === false ? <Unread>New</Unread> : <HidUnread></HidUnread>}</Col>
                  </Row>
                </Link>
              </NotiItem>
            ))}
        {expand && (
          <ImageBox>
            <Image src={Eye1} alt={'eyee'} width={'2000px'} height={'2000px'} />
          </ImageBox>
        )}
      </NotiBox>
      <ButtonRow>
        <Buttons>Notifications</Buttons>
        <Buttons onClick={() => setExpand(!expand)}>
          {!expand ? <ExpandIcon width={20} height={20} /> : <ShrinkIcon width={20} height={20} />}
        </Buttons>
      </ButtonRow>
    </Container>
  );
};

export default Notifications;
