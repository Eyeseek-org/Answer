import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Rainbow from '../../components/buttons/Rainbow';
import { BellIcon } from '../../components/icons/Landing';
import { CloseIcon, WriteIcon } from '../../components/icons/Notifications';
import { UniService } from '../../services/DapAPIService';
import Notifications from './Notifications';
import Settings from './Settings'
import { ConnectWalletBox, IconFrame, Notis } from './styles';
import { useTheme } from 'styled-components';

export const ConnectWithNotifications = () => {
  const { address } = useAccount();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const theme = useTheme();
  
  const query = `/classes/Notification?where={"user":"${address}"}`
  const { data: unreadNotis } = useQuery(['notis'], () => UniService.getDataAll(query),{ 
      onSuccess: (data) => {
        setUnreadCount(data.filter((n:any) => n.isRead === false).length)
      }
    });


  const handleOpenSettings = (b:boolean) => {
    setNotificationsOpen(false);
    setSettingsOpen(b);
  }

  const handleOpenNotis = (b:boolean) => {
    setSettingsOpen(false);
    setNotificationsOpen(b);
  }

  return (
    <>
      <ConnectWalletBox>
        <Rainbow />
        {address && <>
          <IconFrame onClick={() => handleOpenNotis(!notificationsOpen)}>
            {!notificationsOpen ? <BellIcon /> : <CloseIcon width={20} height={20} color={theme.colors.primary}  />}
            {unreadNotis && unreadCount > 0 && (
              <Notis
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
              >
                {unreadCount}
              </Notis>
            )}
          </IconFrame>
          <IconFrame onClick={() => handleOpenSettings(!settingsOpen)}>
             {!settingsOpen ? <WriteIcon width={25} height={25} color={theme.colors.primary} /> : <CloseIcon width={20} height={20} color={theme.colors.primary} />}
          </IconFrame>
        </>}
      </ConnectWalletBox>
      {settingsOpen && <Settings />}
      {notificationsOpen  && <Notifications notis={unreadNotis} address={address} />}
    </>
  );
};
