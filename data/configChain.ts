import {Chain} from '@rainbow-me/rainbowkit'

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
    iconUrl: '/icons/fantom.png',
    iconBackground: '#000000',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM',
    },
    rpcUrls: {
      default: 'https://rpc.testnet.fantom.network',
    },
    blockExplorers: {
      default: { name: 'FTM scan', url: 'https://testnet.ftmscan.com/' },
    },
    testnet: true,
  };
  
 export const bnbTest: Chain = {
    id: 97,
    name: 'BNB testnet',
    network: 'binance',
    iconUrl: `/icons/binance.png`,
    nativeCurrency: {
      decimals: 18,
      name: 'Binanace Coin',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://data-seed-prebsc-2-s3.binance.org:8545',
    },
    blockExplorers: {
      default: { name: 'BNB testnet scan', url: 'https://testnet.bscscan.com/' },
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
    blockExplorers: {
      default: { name: 'Blockscout on Goerli', url: 'https://blockscout.com/optimism/goerli' },
    },
    testnet: true,
  };

  export const polygon: Chain = {
    id: 137,
    name: 'Polygon',
    network: 'polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    rpcUrls: {
      default: 'https://rpc-mainnet.maticvigil.com',
    },
    blockExplorers: {
      default: { name: 'Polygonscan', url: 'https://polygonscan.com/' },
    },
  }
  
  export const bnb: Chain = {
    id: 56,
    name: 'Binance Smart Chain',
    network: 'binance',
    iconUrl: '/icons/binance.png',
    iconBackground: '#000000',
    nativeCurrency: {
      decimals: 18,
      name: 'Binanace Coin',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://bsc-dataseed.binance.org',
    },
    blockExplorers: {
      default: { name: 'BNB scan', url: 'https://www.bscscan.com' },
    },
  }

  export const fantom: Chain = {
    id: 250,
    name: 'Fantom',
    network: 'fantom',
    iconUrl: '/icons/fantom.png',
    iconBackground: '#000000',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM',
    },
    rpcUrls: {
      default: 'https://rpcapi.fantom.network',
    },
    blockExplorers: {
      default: { name: 'FTM scan', url: 'https://ftmscan.com/' },
    },
  }

  export const optimism: Chain = {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    nativeCurrency: {
      decimals: 18,
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
    rpcUrls: {
      default: 'https://mainnet.optimism.io',
    },
  }