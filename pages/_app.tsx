import Head from 'next/head';
import '../styles/globals.css';
import {useState} from 'react'
import styled, { ThemeProvider  } from 'styled-components';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { AppProvider } from '../sections/utils/appContext';
import {RewardProvider } from '../sections/utils/rewardContext';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import { MoralisProvider } from 'react-moralis';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '../sections/Header/Header';
import Loading from '../components/Loading';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {darkTheme, lightTheme} from '../themes/theme'
import { AbsoluteRight } from '../components/format/Box';
import {mumbai,fantomTest, bnbTest, optimismTest, polygon, bnb, fantom, optimism} from '../data/configChain'
import { Provider } from 'react-redux'
import {store} from '../redux/store'

const ThemeButton = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`

const Container = styled.div`
  color: ${(props) => props.theme.colors.font};
  background: ${(props) => props.theme.colors.body};
  font-family: Inter, sans-serif !important;
`;

const testChains = [mumbai, fantomTest, bnbTest, optimismTest]
const prodChains = [polygon, bnb, fantom, optimism]

const testProviders = [publicProvider(), publicProvider(), publicProvider(), publicProvider()]
const prodProviders = [alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON}), publicProvider(), publicProvider(), alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM})]


const { provider, webSocketProvider, chains } = configureChains(
  prodChains, prodProviders
);

const { connectors } = getDefaultWallets({
  appName: 'Eyeseekfunding',
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors,
});

type AppProps = {
  Component: any;
  pageProps: any;
};

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const [dTheme, setDTheme] = useState('dark');
  const [th, setTh] = useState(darkTheme);
  const serverUrl = process.env.NEXT_PUBLIC_DAPP as string;
  const appId = process.env.NEXT_PUBLIC_DAPP_ID as string;
  
  //const serverUrl = process.env.NEXT_PUBLIC_LOCAL as string;


  const toggleTheme = () => {
    if (dTheme === 'dark') {
      setTh(lightTheme)
      setDTheme('light')
    } else if (dTheme === 'light'){
      setTh(darkTheme)
      setDTheme('dark')
    }
  } 
    const rainbowTheme: Theme = {
      blurs: {
        modalOverlay: 'red',
      },
      colors: {
        accentColor: th.colors.primary,
        accentColorForeground: th.colors.black,
        actionButtonBorder: th.colors.font,
        actionButtonBorderMobile: th.colors.font,
        actionButtonSecondaryBackground: th.colors.body,
        closeButton: th.colors.font,
        closeButtonBackground: 'inherit',
        connectButtonBackground: th.colors.primary,
        connectButtonBackgroundError: th.colors.errGradient,
        connectButtonInnerBackground: th.colors.primary,
        connectButtonText: th.colors.font,
        connectButtonTextError: th.colors.red,
        connectionIndicator: th.colors.darkGreen,
        downloadBottomCardBackground: th.colors.body,
        downloadTopCardBackground: th.colors.body,
        error: th.colors.red,
        generalBorder: th.colors.border,
        generalBorderDim: th.colors.transparent,
        menuItemBackground: th.colors.transparent,
        modalBackdrop: th.colors.transparent,
        modalBackground: th.colors.body,
        modalBorder: th.colors.border,
        modalText: th.colors.font,
        modalTextDim: th.colors.transparent,
        modalTextSecondary: th.colors.primary,
        profileAction: th.colors.gray,
        profileActionHover: th.colors.transparent,
        profileForeground: th.colors.projectCard,
        selectedOptionBorder: th.colors.border,
        standby: th.colors.red,
      },
      fonts: {
        body:  th.colors.font,
      },
      radii: {
        actionButton: th.colors.primary,
        connectButton: th.colors.primary,
        menuButton: th.colors.primary,
        modal: th.colors.body,
        modalMobile: th.colors.body,
      },
      shadows: {
        connectButton: th.colors.projectCard,
        dialog: th.colors.body,
        profileDetailsAction: th.colors.primary,
        selectedOption: th.colors.primary,
        selectedWallet: th.colors.primary,
        walletLogo: '...',
      },
    };


  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <ThemeProvider theme={th}>
        <Container>
          <WagmiConfig client={client}>
            <MoralisProvider appId={appId} serverUrl={serverUrl}>
                <RainbowKitProvider chains={chains} theme={rainbowTheme}>
                  <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                    <meta name="description" content="Blockchain crowdfunding platform to boost your ideas" />
                    <title>Eyeseek Funding</title>
                    <link rel="manifest" href="/manifest.json" />
                    <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                    <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                    <meta name="theme-color" content="#317EFB" />
                  </Head>
                  <AppProvider>
                    <Provider store={store}>
                      <RewardProvider>
                        <Header />
                        <AbsoluteRight>
                          <ThemeButton onClick={()=>{toggleTheme()}}> 👀</ThemeButton>
                        </AbsoluteRight>
                        <Loading>
                          <Component {...pageProps} />
                        </Loading>
                      </RewardProvider>
                    </Provider>
                  </AppProvider>
                </RainbowKitProvider>
            </MoralisProvider>
          </WagmiConfig>
        </Container>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
