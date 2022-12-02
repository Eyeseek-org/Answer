import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import Rainbow from '../../components/buttons/Rainbow';
import { BellIcon } from '../../components/icons/Landing';
import { CloseIcon } from '../../components/icons/Notifications';
import { UniService } from '../../services/DapAPIService';
import Notifications from '../Notifications';
import { ConnectWalletBox, IconFrame, Notis } from './styles';

// TODO: refactor this component - separate connect wallet from notification
export const ConnectWithNotifications = () => {
  const { address } = useAccount();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  
  const query = `/classes/Notification?where={"user":"${address}"}`
  const { data: notifications } = useQuery(['my-stream'], () => UniService.getDataAll(query),{
      onSuccess: (data) => {
          const fil =  data.filter((item: any) => item.isRead === false)
          setUnreadNotifications(fil)
        },
   });

  

  return (
    <>
      <ConnectWalletBox>
        <Rainbow />
        {address && (
          <IconFrame onClick={() => setNotificationsOpen(!notificationsOpen)}>
            {!notificationsOpen ? <BellIcon /> : <CloseIcon width={20} height={20} />}
            {unreadNotifications && unreadNotifications.length > 0 && (
              <Notis
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
              >
                {unreadNotifications.length}
              </Notis>
            )}
          </IconFrame>
        )}
      </ConnectWalletBox>
     
      {notificationsOpen && notifications && <Notifications notis={notifications.slice(0, 20)} />}
    </>
  );
};
