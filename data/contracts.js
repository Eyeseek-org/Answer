export const testChains = {
  polygonUsdcToken: process.env.NEXT_PUBLIC_AD_USDC,
  polygonUsdtToken: process.env.NEXT_PUBLIC_AD_USDT,
  polygonUsdcFaucet: '0xb6AD0f79e22Ed4F99927CE0c4B094D9eD43d2cfe',
  polygonUsdtFaucet: '0x8648ADd108723844a327731750d72DfbC21B7A4A',
  

  bnbUsdcToken: process.env.NEXT_PUBLIC_AD_USDC_BNB,
  bnbUsdtToken: process.env.NEXT_PUBLIC_AD_USDT_FTM,
  bnbUsdcFaucet: '0xb03c283301E4af82c40Cd8e3744a7876B3C8276E',
  bnbUsdtFaucet: '0x30df859D3eb152E2ae97113b451412a2D6da003F',

  fantomUsdcToken:  process.env.NEXT_PUBLIC_AD_USDC_FTM,
  fantomUsdtToken: process.env.NEXT_PUBLIC_AD_USDT_FTM,
  fantomUsdcFaucet: '0x958995CB71bAB652Dfde39979d08d70B79aE013e',
  fantomUsdtFaucet: '0x0C7A2f0187D77FcFb5948dC899831EB5c50c3441',

  optimismUsdcToken: process.env.NEXT_PUBLIC_AD_USDC_OPTIMISM,
  optimismUsdtToken: process.env.NEXT_PUBLIC_AD_USDT_OPTIMISM,
  optimismUsdcFaucet: "0x490D5B3CDf9f76ef743ad9B69FAf25369aCdf425",
  optimismUsdtFaucet: "0xeefcC23f432a2543DEC0C687b56dcD33Be7909aB",
};

export const diamond = {
  mumbai: {
    fundFacet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
    core: "0x17dcEE1Dd8E1253563472407F888D79DC981f7Fc",
    rewardFacet: "0x1616C4Ebd839D2F074875B3CF242BFC2F7D034C5",
    masterFacet: "0x354084bb0768c254090EaCab35c4B1961B9f3e8c"
  },
  bnbTestnet: {
    fundFacet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
    core: "0x17dcEE1Dd8E1253563472407F888D79DC981f7Fc",
    rewardFacet: "0x1616C4Ebd839D2F074875B3CF242BFC2F7D034C5",
    masterFacet: "0x354084bb0768c254090EaCab35c4B1961B9f3e8c"
  },
  ftmTestnet: {
    fundFacet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
    core: "0x17dcEE1Dd8E1253563472407F888D79DC981f7Fc",
    rewardFacet: "0x1616C4Ebd839D2F074875B3CF242BFC2F7D034C5",
    masterFacet: "0x354084bb0768c254090EaCab35c4B1961B9f3e8c"
  },
  optimismTestnet: {
    fundFacet: "0x56684CA97e6E35d12B5b35c50E1F53Dd8C7F15Ed",
    core: "0x17dcEE1Dd8E1253563472407F888D79DC981f7Fc",
    rewardFacet: "0x1616C4Ebd839D2F074875B3CF242BFC2F7D034C5",
    masterFacet: "0x354084bb0768c254090EaCab35c4B1961B9f3e8c"
  }
}
