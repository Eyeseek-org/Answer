


const RewardToken = ({ token }) => {
    return <>
            {showToken && <MainMilestoneContainer>
          <RewardDesc>Create a pool with custom ERC20 token, our smart contract distributes automatically rewards proportionally to all involved backers after project success.</RewardDesc>

          <MilestoneContainer>
             {tokenTooltip &&  <TokenTooltip><Tooltip text={'For exampple: Backer delivering 80% of all allocation to your projects will receive 80% of all tokens in the pool. '} /></TokenTooltip>}
              <InputContainer
                label={'Token name'}
                placeholder={'EYE'}
                description={'Name of the reward token you will offer to backers'}
                onChange={}
                type={'text'}
              />
              <InputContainer
                label={'Token address'}
                placeholder={process.env.NEXT_PUBLIC_AD_TOKEN}
                onChange={}
                description={'Token address verifiable on blockchain explorer'}
                type={'text'}
              />
              <InputContainer
                label={'Total amount'}
                placeholder={'1000000'}
                onChange={}
                description={<>        
                <IconBox onMouseEnter={() => setTokenTooltip(true)} onMouseLeave={() => setTokenTooltip(false)}>
                Total amount of reward tokens proportionally distributed to the backers 
                <InfoIcon width={15} />
              </IconBox></>}
                type={'number'}
              />
            </MilestoneContainer>
            
            </MainMilestoneContainer>}
        </>
}