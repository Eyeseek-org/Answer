import { useState } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { RewardContainer, ButtonRow, TabRow, TooltipBox, IconBox,RewardDesc, TokenTooltip } from "./StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import InputContainer from "../../../components/form/InputContainer";
import Tab from "../../../components/form/Tab";
import { MainMilestoneContainer, MilestoneContainer  } from "../SetGoals/StyleWrapper";
import Tooltip from "../../../components/Tooltip";
import { InfoIcon } from "../../../components/icons/Common";
import { Row } from "../../../components/format/Row";

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { isNext, pType, rewards } = { ...appState };
  const [rType, setRType] = useState(true)
  const [microTooltip, setMicroTooltip] = useState(false)
  const [tokenTooltip, setTokenTooltip] = useState(false)
  const [tReward, setTokenReward] = useState({
    amount: 0,
    name: "EYE",
    address: process.env.NEXT_PUBLIC_AD_TOKEN,
  })
  const [reward, setReward] = useState({
    title: "Reward 1",
    description: "Reward 1 description",
    amount: 100,
    type: { rType },  // OR Donate OR Stream 
  })
  const [donationTooltip, setDonationTooltip] = useState(false)
  const [showToken,setShowToken] = useState(false)

  const [showReward, setShowReward] = useState(false)


  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, tokenReward: tReward}))
    // addReward()
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  const addReward = () => {
    const newReward = [...rewards, reward];
    // TBD new reward is added to the app state
  }
  /// TBD possibility to add multiple rewards, similar as `SetGoals`, and remove
  // TBD Token URL validate HTTPS - https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174
  // Add to my projects
  //TBD - Object is override with each change, function is needed to fix

  return (<>
    <SectionTitle title='Offer rewards for backers' subtitle='' />
    <MainContainer>
      <RewardContainer>
        <NextButton onClick={() => setShowReward(!showReward)}>{showReward ? <>Remove reward</> : <>Add reward (optional)</>}</NextButton>
        {showReward && <MainMilestoneContainer>
          <MilestoneContainer>
            <TabRow> {pType === 'Standard' && <Tab  act={rType} o1={'Microfund'} o2={'Direct donate'} onClick={() => { setRType(!rType) }} />}
              <TooltipBox>
                {microTooltip && <Tooltip text={'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'} />}
                {donationTooltip && <Tooltip text={'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'} />}
              </TooltipBox>
              <RewardDesc>Offer rewards to the backers on your own responsibility and effort. Eyeseek will provide addresses of backers, rest is on you.</RewardDesc>
            </TabRow>
            <InputContainer
              label={'Title'}
              placeholder={'Godspeed'}
              description={'Create a unique title for your reward'}
              onChange={(e)=>{setReward({reward: {title: e.target.value}})}}
              type={'textArea'}
            />
            <InputContainer
              label={'Description'}
              placeholder={'Backer receives autographed copy of the book'}
              description={'Describe what backer receives for this reward'}
              onChange={(e)=>{setReward({reward: {description: e.target.value}})}}
              type={'text'}
            />
          {rType ? <InputContainer
              label={'Amount'}
              placeholder={'1000'}
              onChange={(e)=>{setReward({reward: {amount: e.target.value}})}}
              description={
                <Row>Required microfund cap pledge
                  <IconBox onMouseEnter={() => setMicroTooltip(true)} onMouseLeave={() => setMicroTooltip(false)}>
                    <InfoIcon width={15} />
                  </IconBox>
                </Row>}
              type={'number'}
            />
            : <InputContainer
              label={'Amount'}
              placeholder={'1000'}
              onChange={(e)=>{setReward({reward: {amount: e.target.value}})}}
              description={
                <Row>Backed amount
                  <IconBox onMouseEnter={() => setDonationTooltip(true)} onMouseLeave={() => setDonationTooltip(false)}>
                    <InfoIcon width={15} />
                  </IconBox>
                </Row>}
              type={'number'}
            />}
            <InputContainer
              label={'Number'}
              placeholder={'10'}
              description={'Maximum number of offered rewards'}
              onChange={(e)=>{setReward({reward: {cap: e.target.value}})}}
              type={'number'}
            />
          </MilestoneContainer>
        </MainMilestoneContainer>}
      {pType !== 'Stream' ? <><NextButton onClick={() => setShowToken(!showToken)}>Token reward (optional)</NextButton>
        {showToken && <MainMilestoneContainer>
          <RewardDesc>Create a pool with custom ERC20 token, our smart contract distributes automatically rewards proportionally to all involved backers after project success.</RewardDesc>

          <MilestoneContainer>
             {tokenTooltip &&  <TokenTooltip><Tooltip text={'       Backer delivering 80% of all allocation to your projects will receive 80% of all tokens in the pool. '} /></TokenTooltip>}
              <InputContainer
                label={'Token name'}
                placeholder={tReward.name}
                description={'Name of the reward token you will offer to backers'}
                onChange={(e)=>{setTokenReward({tReward: {name: e.target.value}})}}
                type={'text'}
              />
              <InputContainer
                label={'Token address'}
                placeholder={tReward.address}
                onChange={(e)=>{setTokenReward({tReward: {address: e.target.value}})}}
                description={'Token address verifiable on blockchain explorer'}
                type={'text'}
              />
              <InputContainer
                label={'Total amount'}
                placeholder={tReward.amount}
                onChange={(e)=>{setTokenReward({tReward: {amount: e.target.value}})}}
                description={<>        
                <IconBox onMouseEnter={() => setTokenTooltip(true)} onMouseLeave={() => setTokenTooltip(false)}>
                Total amount of reward tokens proportionally distributed to the backers 
                <InfoIcon width={15} />
              </IconBox></>}
                type={'number'}
              />
            </MilestoneContainer></MainMilestoneContainer>}
            </> : null}
        <ButtonRow>
          <NextButton onClick={handleBack}>Back</NextButton>
          <NextButton onClick={handleClick}>Next</NextButton>
        </ButtonRow>
      </RewardContainer>
    </MainContainer>
  </>
  );
};

export default SetRewards;
