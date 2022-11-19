import { useState, useEffect } from 'react';
import { useApp } from '../../utils/appContext';
import SectionTitle from '../../../components/typography/SectionTitle';
import {
  ButtonRow,
  IconBox,
  RewardContainer,
  RewardDesc,
  TabRow,
  TooltipBox,
  ButtonBox,
  RewardButton,
  RewardAction,
  Disclaimer,
  DisclaimerAdd,
} from './StyleWrapper';
import InputContainer from '../../../components/form/InputContainer';
import {Wrapper} from '../../../components/format/Box'
import ButtonAlt from '../../../components/buttons/ButtonAlt';
import Tab from '../../../components/form/Tab';
import { MainMilestoneContainer, MilestoneContainer } from '../SetGoals/StyleWrapper';
import Tooltip from '../../../components/Tooltip';
import { InfoIcon } from '../../../components/icons/Common';
import { Row } from '../../../components/format/Row';
import { AddIcon, RemoveIcon } from '../../../components/icons/Project';
import Subtitle from '../../../components/typography/Subtitle';

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pType } = { ...appState };
  const [rType, setRType] = useState('Direct donate');
  const [microTooltip, setMicroTooltip] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [rewardsCounts, setRewardsCount] = useState(0);
  const [donationTooltip, setDonationTooltip] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, rewards: rewards }));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  };

  const handleRemoveReward = () => {
    setRewardsCount(rewardsCounts - 1);
    const newRewards = rewards;
    newRewards.pop();
    setRewards(newRewards);
  };

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
  };

  return (
    <>
      <SectionTitle title="Offer rewards for your backers" subtitle="Promise traditional crowdfunding benefits" />
      <Wrapper>
        {rewardsCounts === 0 && (
          <Disclaimer>
            <Subtitle text={'ERC20 and ERC1155 could be added only after project creation'} />
            <DisclaimerAdd onClick={() => setRewardsCount(rewardsCounts + 1)}>
              <RewardAction>Add reward (optional) </RewardAction>
              <AddIcon width={20} height={20} />
            </DisclaimerAdd>
          </Disclaimer>
        )}
        <RewardContainer>
          {rewardsCounts > 0 && (
            <ButtonBox>
              <RewardButton onClick={() => setRewardsCount(rewardsCounts + 1)}>
                <RewardAction>Add reward (optional) </RewardAction>
                <AddIcon width={20} height={20} />
              </RewardButton>
              <RewardButton onClick={() => handleRemoveReward()}>
                <RewardAction>Remove last reward </RewardAction>
                <RemoveIcon width={20} height={20} />
              </RewardButton>
            </ButtonBox>
          )}
          {[...Array(rewardsCounts).keys()].map((rewardIndex) => (
            <MainMilestoneContainer>
              <MilestoneContainer>
                <TabRow>
                  {' '}
                  {pType === 'Standard' && (
                    <Tab
                      active={rType}
                      o1={'Microfund'}
                      o2={'Direct donate'}
                      change1={() => {
                        setRType('Microfund');
                      }}
                      change2={() => {
                        setRType('Direct donate');
                      }}
                    />
                  )}
                  <TooltipBox>
                    {microTooltip && (
                      <Tooltip
                        text={
                          'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'
                        }
                      />
                    )}
                    {donationTooltip && (
                      <Tooltip
                        text={
                          'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'
                        }
                      />
                    )}
                  </TooltipBox>
                  <RewardDesc>
                    {rType === 'Direct donate' && (
                      <>
                        Offer rewards to the backers on your own responsibility and effort. Eyeseek will provide addresses of backers, rest
                        is on you.
                      </>
                    )}
                    {rType === 'Microfund' && (
                      <>Offer rewards to the microfund deployers for they intention to incentivize the crowdfunding chain reaction.</>
                    )}
                  </RewardDesc>
                </TabRow>
                <InputContainer
                  label={'Title'}
                  placeholder={'Godspeed'}
                  description={'Create a unique title for your reward'}
                  onChange={(e) => {
                    handleChangeReward(rewardIndex, e.target.value, undefined, undefined, undefined);
                  }}
                  type={'text'}
                />
                <InputContainer
                  label={'Description'}
                  placeholder={'Backer receives autographed copy of the book'}
                  description={'Describe what backer receives for this reward'}
                  onChange={(e) => {
                    handleChangeReward(rewardIndex, undefined, e.target.value, undefined, undefined);
                  }}
                  type={'textArea'}
                />
                {rType === 'Microfund' ? (
                  <InputContainer
                    label={'Amount'}
                    placeholder={'1000'}
                    onChange={(e) => {
                      handleChangeReward(rewardIndex, undefined, undefined, e.target.value, undefined);
                    }}
                    description={
                      <Row>
                        Required microfund cap pledge
                        <IconBox onMouseEnter={() => setMicroTooltip(true)} onMouseLeave={() => setMicroTooltip(false)}>
                          <InfoIcon width={15} />
                        </IconBox>
                      </Row>
                    }
                    type={'number'}
                  />
                ) : (
                  <InputContainer
                    label={'Amount'}
                    placeholder={'1000'}
                    onChange={(e) => {
                      handleChangeReward(rewardIndex, undefined, undefined, e.target.value, undefined);
                    }}
                    description={
                      <Row>
                        Backed amount
                        <IconBox onMouseEnter={() => setDonationTooltip(true)} onMouseLeave={() => setDonationTooltip(false)}>
                          <InfoIcon width={15} />
                        </IconBox>
                      </Row>
                    }
                    type={'number'}
                  />
                )}
                <InputContainer
                  label={'Number'}
                  placeholder={'10'}
                  description={'Maximum number of offered rewards'}
                  onChange={(e) => {
                    handleChangeReward(rewardIndex, undefined, undefined, undefined, e.target.value);
                  }}
                  type={'number'}
                />
              </MilestoneContainer>
            </MainMilestoneContainer>
          ))}
          <ButtonRow>
            <ButtonAlt onClick={handleBack} text='Back'/>
            <ButtonAlt onClick={handleClick} text='Next'/>
          </ButtonRow>
        </RewardContainer>
      </Wrapper>
    </>
  );
};

export default SetRewards;
