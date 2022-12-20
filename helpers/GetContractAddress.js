import {stable} from '../data/contracts/stablecoins.js';

// Not used anywhere now, will be needed for donate form later
export const GetProjectTokenAddress = (chain) => {
  if (chain === 80001) {
    return stable.mumbai.usdc;
  } else if (chain === 97) {
    return stable.bnbTestnet.usdc;
  } else if (chain === 4002) {
    return stable.ftmTestnet.usdc;
  } else if (chain === 420) {
    return stable.optimismTestnet.usdc;
  } else {
    return stable.mumbai.usdc;
  }
};

// Only USDC, missing other currencies, production addresses
export const GetTokenAddress = (chain) => {
  switch(chain) {
    case 80001: return stable.mumbai.usdc;
    case 97: return stable.bnbTestnet.usdc;
    case 4002: return stable.ftmTestnet.usdc;
    case 420: return stable.optimismTestnet.usdc;
    case 137: return stable.mumbai.usdc;
    case 56: return stable.bnbTestnet.usdc;
    case 250: return stable.ftmTestnet.usdc;
    case 10: return stable.optimismTestnet.usdc;
    default: return stable.mumbai.usdc;
  }
}