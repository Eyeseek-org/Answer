// This function expects wagmi useNetwork() chain as an input
// Which means actually used network
export const GetFundingAddress = (chain) => {
  if (chain && chain.id === 80001) {
    return process.env.NEXT_PUBLIC_AD_DONATOR;
  } else if (chain && chain.id === 97) {
    return process.env.NEXT_PUBLIC_AD_DONATOR_BNB;
  } else if (chain && chain.id === 4002) {
    return process.env.NEXT_PUBLIC_AD_DONATOR_FTM;
  } else {
    return process.env.NEXT_PUBLIC_AD_DONATOR;
  }
};

// This function expects external chain as an input
// Typically chain of already created project
export const GetProjectFundingAddress = (chain) => {
  if (chain === 80001) {
    return process.env.NEXT_PUBLIC_AD_DONATOR;
  } else if (chain === 97) {
    return process.env.NEXT_PUBLIC_AD_DONATOR_BNB;
  } else if (chain === 4002) {
    return process.env.NEXT_PUBLIC_AD_DONATOR_FTM;
  } else {
    return process.env.NEXT_PUBLIC_AD_DONATOR;
  }
};

export const GetProjectTokenAddress = (chain) => {
  if (chain === 80001) {
    return process.env.NEXT_PUBLIC_AD_USDC;
  } else if (chain === 97) {
    return process.env.NEXT_PUBLIC_AD_USDC_BNB;
  } else if (chain === 4002) {
    return process.env.NEXT_PUBLIC_AD_USDC_FTM;
  } else {
    return process.env.NEXT_PUBLIC_AD_USDC;
  }
};

// Unused now
export const GetTokenAddress = (chain) => {
  if (chain && chain.id === 80001) {
    return process.env.NEXT_PUBLIC_AD_USDC;
  } else if (chain && chain.id === 97) {
    return process.env.NEXT_PUBLIC_AD_USDC_BNB;
  } else if (chain && chain.id === 4002) {
    return process.env.NEXT_PUBLIC_AD_USDC_FTM;
  } else {
    return process.env.NEXT_PUBLIC_AD_USDC;
  }
};
