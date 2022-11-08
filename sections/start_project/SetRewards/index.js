import {useState} from "react";
import {useApp} from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import {ButtonRow, IconBox, RewardContainer, RewardDesc, TabRow, TokenTooltip, TooltipBox, ButtonBox, RewardButton, RewardAction} from "./StyleWrapper";
import {MainContainer, NextButton} from "../Category/StyleWrapper";
import InputContainer from "../../../components/form/InputContainer";
import Tab from "../../../components/form/Tab";
import {MainMilestoneContainer, MilestoneContainer} from "../SetGoals/StyleWrapper";
import Tooltip from "../../../components/Tooltip";
import {InfoIcon} from "../../../components/icons/Common";
import {Row} from "../../../components/format/Row";
import { AddIcon, Erc20Icon, RemoveIcon } from "../../../components/icons/Project";

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pType } = { ...appState };
  const [rType, setRType] = useState('Direct donate')
  const [microTooltip, setMicroTooltip] = useState(false)
  const [tokenTooltip, setTokenTooltip] = useState(false)
  const [tReward, setTokenReward] = useState({
    amount: 0,
    name: "EYE",
    address: process.env.NEXT_PUBLIC_AD_TOKEN,
  })
  const [rewards, setRewards] = useState([])
  const [rewardsCounts, setRewardsCount] = useState(0);
  const [donationTooltip, setDonationTooltip] = useState(false)
  const [showToken,setShowToken] = useState(false)

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, tokenReward: tReward, rewards: rewards}))
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  const handleRemoveReward = () => {
    setRewardsCount(rewardsCounts - 1);
    const newRewards = rewards;
    newRewards.pop();
    setRewards(newRewards);
  }

  const handleChangeReward = (rewardIndex, title, desc, amount, cap) => {
    const newRewards = rewards;
    let newReward = newRewards[rewardIndex];
    if (!newReward) {
        newReward = {};
    }
    newReward.title = title ?? newReward.title;
    newReward.description = desc ?? newReward.description;
    newReward.amount = amount ?? newReward.amount;
    newReward.cap = cap ?? newReward.cap;
    newRewards.splice(rewardIndex, 1, newReward);
    setRewards(newRewards);
  }

  // TBD Token URL validate HTTPS - https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174
  // Add to my projects
  //TBD - Object is override with each change, function is needed to fix

  return (<>
    <SectionTitle title='Offer rewards for backers' subtitle='' />
    <MainContainer>
      <RewardContainer>
        <ButtonBox>
          <RewardButton onClick={() => setRewardsCount(rewardsCounts + 1)}><RewardAction>Add reward (optional) </RewardAction><AddIcon width={20} height={20}/></RewardButton>
          {rewardsCounts > 0 && <RewardButton onClick={() => handleRemoveReward()}><RewardAction>Remove last reward </RewardAction><RemoveIcon width={20} height={20}/></RewardButton>}
            <RewardButton onClick={() => setShowToken(!showToken)}>
                {!showToken ?  <RewardAction>Token reward (optional)</RewardAction> : <RewardAction>Remove token reward</RewardAction>}
                <Erc20Icon width={30} height={30}/>
          </RewardButton>
        </ButtonBox>
        {[...Array(rewardsCounts).keys()].map((rewardIndex) => (
            <MainMilestoneContainer>
              <MilestoneContainer>
                <TabRow> {pType === 'Standard' &&
                  <Tab
                    active={rType}
                    o1={'Microfund'}
                    o2={'Direct donate'}
                    change1={() =>{ setRType('Microfund') }}
                    change2={() =>{ setRType('Direct donate') }} />}

                  <TooltipBox>
                    {microTooltip && <Tooltip text={'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'} />}
                    {donationTooltip && <Tooltip text={'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'} />}
                  </TooltipBox>
                  <RewardDesc>
                    {rType === 'Direct donate' && <>Offer rewards to the backers on your own responsibility and effort. Eyeseek will provide addresses of backers, rest is on you.</>}
                    {rType === 'Microfund' && <>Offer rewards to the microfund deployers for they intention to incentivize the crowdfunding chain reaction.</>}

                    </RewardDesc>
                </TabRow>
                <InputContainer
                  label={'Title'}
                  placeholder={'Godspeed'}
                  description={'Create a unique title for your reward'}
                  onChange={(e)=>{handleChangeReward(rewardIndex, e.target.value, undefined, undefined, undefined)}}
                  type={'text'}
                />
                <InputContainer
                  label={'Description'}
                  placeholder={'Backer receives autographed copy of the book'}
                  description={'Describe what backer receives for this reward'}
                  onChange={(e)=>{handleChangeReward(rewardIndex, undefined, e.target.value, undefined, undefined)}}
                  type={'textArea'}
                />
              {rType === 'Microfund' ? <InputContainer
                  label={'Amount'}
                  placeholder={'1000'}
                  onChange={(e)=>{handleChangeReward(rewardIndex, undefined, undefined, e.target.value, undefined)}}
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
                  onChange={(e)=>{handleChangeReward(rewardIndex, undefined, undefined, e.target.value, undefined)}}
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
                  onChange={(e)=>{handleChangeReward(rewardIndex, undefined, undefined, undefined, e.target.value)}}
                  type={'number'}
                />
              </MilestoneContainer>
          </MainMilestoneContainer>))}
      {pType !== 'Stream' ? <>
        {showToken && <MainMilestoneContainer>
          <RewardDesc>Create a pool with custom ERC20 token, our smart contract distributes automatically rewards proportionally to all involved backers after project success.</RewardDesc>

          <MilestoneContainer>
             {tokenTooltip &&  <TokenTooltip><Tooltip text={'Backer delivering 80% of all allocation to your projects will receive 80% of all tokens in the pool. '} /></TokenTooltip>}
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
