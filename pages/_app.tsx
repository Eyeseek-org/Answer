import Head from 'next/head';
import '../styles/globals.css';
import {useState} from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { AppProvider } from '../sections/utils/appContext';
import {RewardProvider } from '../sections/utils/rewardContext';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { MoralisProvider } from 'react-moralis';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '../sections/Header/Header';
import Loading from '../components/Loading';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {darkTheme, lightTheme} from '../themes/theme'
import { AbsoluteRight } from '../components/format/Box';
import {mumbai,fantomTest, bnbTest, optimismTest} from '../data/configChain'

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


const { provider, webSocketProvider, chains } = configureChains(
  [mumbai, fantomTest, bnbTest, optimismTest],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY }), publicProvider()]
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
  const [theme, setTheme] = useState('dark');
  const [th, setTh] = useState(darkTheme);
  const serverUrl = process.env.NEXT_PUBLIC_DAPP as string;
  const appId = process.env.NEXT_PUBLIC_DAPP_ID as string;
  //const serverUrl = process.env.NEXT_PUBLIC_LOCAL as string;

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTh(lightTheme)
      setTheme('light')
    } else if (theme === 'light'){
      setTh(darkTheme)
      setTheme('dark')
    }
  } 

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <ThemeProvider theme={th}>
        <Container>
          <WagmiConfig client={client}>
            <MoralisProvider appId={appId} serverUrl={serverUrl}>
                <RainbowKitProvider chains={chains}>
                  <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                    <meta name="description" content="Description" />
                    <meta name="keywords" content="Keywords" />
                    <title>Eyeseek fund</title>
                    <link rel="manifest" href="/manifest.json" />
                    <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                    <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                    <meta name="theme-color" content="#317EFB" />
                  </Head>
                  <AppProvider>
                    <RewardProvider>
                    <Header />
                    <AbsoluteRight>
                      <ThemeButton onClick={()=>{toggleTheme()}}> 👀</ThemeButton>
                    </AbsoluteRight>
                    <Loading>
                      <Component {...pageProps} />
                    </Loading>
                    </RewardProvider>
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
