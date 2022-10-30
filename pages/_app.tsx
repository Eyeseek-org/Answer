import Head from "next/head";
import "../styles/globals.css";

//Web3 auth
import styled from "styled-components";
import { Chain, createClient, configureChains, WagmiConfig } from "wagmi";
import { AppProvider } from "../sections/utils/appContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { SessionProvider } from "next-auth/react";
import { MoralisProvider } from "react-moralis";
import "@rainbow-me/rainbowkit/styles.css";
import Header from "../sections/Header";
import Loading from "../components/Loading";

const Container = styled.div`
  color: white;
  background: #141414;
  font-family: Inter, sans-serif !important;
`

const mumbai: Chain = {
  id: 80_001,
  name: "Mumbai",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  testnet: true,
};

const { provider, webSocketProvider, chains } = configureChains(
  [mumbai],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
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

export default function MyApp({ Component, pageProps }: AppProps) {
  const serverUrl = process.env.NEXT_PUBLIC_DAPP as string;
  const appId = process.env.NEXT_PUBLIC_DAPP_ID as string;

  return (
    <Container>
      <WagmiConfig client={client}>
        <MoralisProvider appId={appId} serverUrl={serverUrl}>
          <SessionProvider session={pageProps.session} refetchInterval={10000}>
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
                <Loading>
                  <Header />
                  <Component {...pageProps} />
                </Loading>
              </AppProvider>
            </RainbowKitProvider>
          </SessionProvider>
        </MoralisProvider>
      </WagmiConfig>
    </Container>
  );
}
