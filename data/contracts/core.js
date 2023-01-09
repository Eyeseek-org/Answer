import {stable} from './stablecoins.js';

export const testChains = {
  polygonUsdcToken: stable.mumbai.usdc,
  polygonUsdtToken: stable.mumbai.usdt,
  polygonUsdcFaucet: '0xb6AD0f79e22Ed4F99927CE0c4B094D9eD43d2cfe',
  polygonUsdtFaucet: '0x8648ADd108723844a327731750d72DfbC21B7A4A',

  bnbUsdcToken: stable.bnbTestnet.usdc,
  bnbUsdtToken: stable.bnbTestnet.usdt,
  bnbUsdcFaucet: '0xb03c283301E4af82c40Cd8e3744a7876B3C8276E',
  bnbUsdtFaucet: '0x30df859D3eb152E2ae97113b451412a2D6da003F',

  fantomUsdcToken: stable.ftmTestnet.usdc,
  fantomUsdtToken: stable.ftmTestnet.usdt,
  fantomUsdcFaucet: '0x958995CB71bAB652Dfde39979d08d70B79aE013e',
  fantomUsdtFaucet: '0x0C7A2f0187D77FcFb5948dC899831EB5c50c3441',

  optimismUsdcToken: stable.optimismTestnet.usdc,
  optimismUsdtToken: stable.optimismTestnet.usdt,
  optimismUsdcFaucet: "0x490D5B3CDf9f76ef743ad9B69FAf25369aCdf425",
  optimismUsdtFaucet: "0xeefcC23f432a2543DEC0C687b56dcD33Be7909aB",
};

export const diamond = {
  mumbai: "0x3624b79E35B82a2308cCB159Aa2d379F979C968C",
  bnbTestnet: "0x7efb53548Cc090881c7bF8657f2e3c771C07Dea9",
  ftmTestnet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
  optimismTestnet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
  polygon: "0x6e41Fb2CC46281Ae18acBAa8cFe342A52783796A",
  bnb: "0x7efb53548Cc090881c7bF8657f2e3c771C07Dea9",
  ftm: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
  optimism: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
}
