import { useState } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { RewardContainer, ButtonRow, TabRow, TooltipBox, IconBox } from "./StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import InputContainer from "../../../components/form/InputContainer";
import Tab from "../../../components/form/Tab";
import { MainMilestoneContainer, MilestoneContainer } from "../SetGoals/StyleWrapper";
import Tooltip from "../../../components/Tooltip";
import { InfoIcon } from "../../../components/icons/Common";
import { Row } from "../../../components/format/Row";

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { isNext, pType, rewards } = { ...appState };
  const [rType, setRType] = useState('Microfund')
  const [microTooltip, setMicroTooltip] = useState(false)
  const [reward, setReward] = useState({
    title: "Reward 1",
    description: "Reward 1 description",
    amount: 100,
    type: { rType },  // OR Donate OR Stream 
    tokenAmount: "address", // optional 
    tokenName: "name", // optional
    tokenUrl: "url", // optional
  })
  const [donationTooltip, setDonationTooltip] = useState(false)
  const [tokenReward, setTokenReward] = useState(false)

  const [showReward, setShowReward] = useState(false)


  const handleClick = () => {
    setStep((prev) => (prev += 1));
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
    <SectionTitle title='Offer rewards for backers' />
    <MainContainer>
      <RewardContainer>
        <NextButton onClick={() => setShowReward(!showReward)}>{showReward ? <>Remove reward</> : <>Add reward (optional)</>}</NextButton>
        {showReward && <MainMilestoneContainer>
          <MilestoneContainer>
            <TabRow> {pType === 'Standard' && <Tab o1={'Microfund'} o2={'Direct donate'} onClick={() => { setRType('Donate') }} />}
              <TooltipBox>
                {microTooltip && <Tooltip text={'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'} />}
                {donationTooltip && <Tooltip text={'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'} />}
              </TooltipBox>
            </TabRow>
            {rType === 'Microfund' && <InputContainer
              label={'Amount'}
              placeholder={'1000'}
              onChange={(e)=>{setReward({reward: {amount: e.target.value}})}}
              description={
                <Row>Microfund cap amount
                  <IconBox onMouseEnter={() => setMicroTooltip(true)} onMouseLeave={() => setMicroTooltip(false)}>
                    <InfoIcon width={15} />
                  </IconBox>
                </Row>}
              type={'number'}
            />}
            {rType === 'Donate' && <InputContainer
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
            <button onClick={() => setTokenReward(!tokenReward)}>Token reward</button>
            {tokenReward && <>
              <InputContainer
                label={'Token name'}
                placeholder={'EYE'}
                description={'Name of the reward token you will offer to backers'}
                onChange={(e)=>{setReward({reward: {tokenName: e.target.value}})}}
                type={'text'}
              />
              <InputContainer
                label={'Token address'}
                placeholder={'Polygon/Fantom/BNB explorer URL'}
                onChange={(e)=>{setReward({reward: {tokenAddress: e.target.value}})}}
                description={'Block explorer URL to verify token'}
                type={'text'}
              />
              <InputContainer
                label={'Total amount'}
                placeholder={'10000'}
                onChange={(e)=>{setReward({reward: {tokenAmount: e.target.value}})}}
                description={'Total amount of reward tokens proportionally distributed to the backers'}
                type={'number'}
              />
            </>}
          </MilestoneContainer>
        </MainMilestoneContainer>}
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
