import {Chain} from 'wagmi'

export const mumbai: Chain = {
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
  
 export const fantomTest: Chain = {
    id: 4_002,
    name: 'Fantom testnet',
    network: 'fantom',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM',
    },
    rpcUrls: {
      default: 'https://rpc.testnet.fantom.network',
    },
    testnet: true,
  };
  
 export const bnbTest: Chain = {
    id: 97,
    name: 'BNB testnet',
    network: 'binance',
    nativeCurrency: {
      decimals: 18,
      name: 'Binanace Coin',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://bsctestapi.terminet.io/rpc',
    },
    testnet: true,
  };
  
  export const optimismTest: Chain = {
    id: 420,
    name: 'Optimism on Goerli',
    network: 'optimismGoerli',
    nativeCurrency: {
      decimals: 18,
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    rpcUrls: {
      default: 'https://goerli.optimism.io',
    },
    testnet: true,
  };
  