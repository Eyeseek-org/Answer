import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components'
import { useMoralis } from "react-moralis";

const ConnectBtn = styled.button`
  background-color: #9bffff;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  font-size: 1em;
  color: black;
  font-family: "Gemunu Libre", sans-serif;
  font-style: normal;
  cursor: pointer;
  &:hover{
    opacity: 0.9;
  }
`

const Rainbow = () => {
    
  const { authenticate, isAuthenticated } = useMoralis();
    
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const auth = async() => {
            await openConnectModal()
            if (!isAuthenticated){
                await authenticate()
            }
        }

        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <ConnectBtn onClick={auth} type="button">
                    Connect Wallet
                  </ConnectBtn>
                );
              }
              if (chain.unsupported) {
                return (
                  <ConnectBtn onClick={openChainModal} type="button">
                    Wrong network
                  </ConnectBtn>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <ConnectBtn
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </ConnectBtn>
                  <ConnectBtn onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </ConnectBtn>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Rainbow