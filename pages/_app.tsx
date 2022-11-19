import Head from 'next/head';
import '../styles/globals.css';

//Web3 auth
import styled, { ThemeProvider } from 'styled-components';
import { Chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { AppProvider } from '../sections/utils/appContext';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { MoralisProvider } from 'react-moralis';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '../sections/Header/Header';
import Loading from '../components/Loading';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {darkTheme} from '../themes/theme'

const Container = styled.div`
  color: ${(props) => props.theme.colors.font};
  background: ${(props) => props.theme.colors.body};
  font-family: Inter, sans-serif !important;
`;

const mumbai: Chain = {
  id: 80_001,
  name: 'Mumbai',
  network: 'mumbai',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: 'https://rpc-mumbai.maticvigil.com',
  },
  testnet: true,
};

const fantomTest: Chain = {
  id: 4_002,
  name: 'Fantom Testnet',
  network: 'fantom',
  nativeCurrency: {
    decimals: 18,
    name: 'FTM',
    symbol: 'FTM',
  },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  testnet: true,
};

const bnbTest: Chain = {
  id: 97,
  name: 'BNB Testnet',
  network: 'binance',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  testnet: true,
};

const { provider, webSocketProvider, chains } = configureChains(
  [mumbai, fantomTest, bnbTest],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
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
  const serverUrl = process.env.NEXT_PUBLIC_DAPP as string;
  const appId = process.env.NEXT_PUBLIC_DAPP_ID as string;
  //const serverUrl = process.env.NEXT_PUBLIC_LOCAL as string;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <ThemeProvider theme={darkTheme}>
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
                    <Header />
                    <Loading>
                      <Component {...pageProps} />
                    </Loading>
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
