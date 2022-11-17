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

  const { data: notifications } = useQuery(['notification-data'], () =>
    UniService.getDataAll(`/classes/Notification?where={"user":"${address}"}`)
  );

  const undreadNotifications = useMemo(() => {
    return notifications ? notifications.filter((item) => item.isRead === false) : [];
  }, [notifications]);

  return (
    <>
      <ConnectWalletBox>
        <Rainbow />
        {address && (
          <IconFrame onClick={() => setNotificationsOpen(!notificationsOpen)}>
            {!notificationsOpen ? <BellIcon /> : <CloseIcon width={20} height={20} />}
            {undreadNotifications.length > 0 && (
              <Notis
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
              >
                {undreadNotifications.length}
              </Notis>
            )}
          </IconFrame>
        )}
      </ConnectWalletBox>
      {notificationsOpen && <Notifications notis={notifications.slice(0, 20)} />}
    </>
  );
};
