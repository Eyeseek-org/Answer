import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import Rainbow from '../../components/buttons/Rainbow';
import { SettingIcon } from '../../components/icons/Common';
import { BellIcon } from '../../components/icons/Landing';
import { CloseIcon } from '../../components/icons/Notifications';
import { UniService } from '../../services/DapAPIService';
import Notifications from './Notifications';
import Settings from './Settings'
import { ConnectWalletBox, IconFrame, Notis } from './styles';
import { useTheme } from 'styled-components';

export const ConnectWithNotifications = () => {
  const { address } = useAccount();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const theme = useTheme();
  
  const query = `/classes/Notification?where={"user":"${address}", "isRead":false}`
  const { data: unreadNotis } = useQuery(['notis-unread'], () => UniService.getDataAll(query),{   });

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
            {!notificationsOpen ? <BellIcon /> : <CloseIcon width={20} height={20} />}
            {unreadNotis && unreadNotis.length > 0 && (
              <Notis
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
              >
                {unreadNotis.length}
              </Notis>
            )}
          </IconFrame>
          <IconFrame onClick={() => handleOpenSettings(!settingsOpen)}>
             {!settingsOpen ? <SettingIcon width={25} height={25} color={theme.colors.primary} /> : <CloseIcon width={20} height={20} />}
          </IconFrame>
        </>}
      </ConnectWalletBox>
      {settingsOpen && <Settings />}
      {notificationsOpen  && <Notifications notis={unreadNotis.slice(0, 20)} address={address} />}
    </>
  );
};
