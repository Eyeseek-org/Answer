
export const GetFundingAddress = (chain) => {

        if (chain && chain.id === 80001){
            return (process.env.NEXT_PUBLIC_AD_DONATOR)
        } else if (chain && chain.id === 97){
            return (process.env.NEXT_PUBLIC_AD_DONATOR_BNB)
        } else if (chain && chain.id === 4002){
            return (process.env.NEXT_PUBLIC_AD_DONATOR_FTM)
        } else {
            return (process.env.NEXT_PUBLIC_AD_DONATOR)
        }
    
}


export const GetTokenAddress = (chain) => {

    if (chain && chain.id === 80001){
        return (process.env.NEXT_PUBLIC_AD_USDC)
    } else if (chain && chain.id === 97){
        return (process.env.NEXT_PUBLIC_AD_USDC_BNB)
    } else if (chain && chain.id === 4002){
        return (process.env.NEXT_PUBLIC_AD_USDC_FTM)
    } else {
        return (process.env.NEXT_PUBLIC_AD_USDC)
    }

}