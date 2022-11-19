import { useEffect } from 'react';
import { useApp } from '../../utils/appContext';
import InputContainer from '../../../components/form/InputContainer';
import {
  ImageContainer,
  MilestoneContainer,
  MilestoneTitle,
  MainMilestoneContainer,
  MilestoneHeader,
  CancelButton,
  Label,
  SelectionWrapper,
  BlockchainDesc,
  StreamAnnouncement,
} from './StyleWrapper';
import SectionTitle from '../../../components/typography/SectionTitle';
import { useSwitchNetwork, useNetwork } from 'wagmi';
import styled from 'styled-components';
import Image from 'next/image';
import { blockchains } from '../../../data/blockchains';
import { BetweenRow, Col, Row } from '../../../components/format/Row';
import Lottie from 'react-lottie';
import octa from '../../../data/animations/octa.json';
import ButtonAlt from '../../../components/buttons/ButtonAlt';
import { MainContainer, Wrapper } from '../../../components/format/Box';

const ImgActiveBox = styled.div`
  opacity: 1;
`;

const ImgBox = styled.div`
  opacity: 0.3;
  cursor: pointer;
`;

// Animation configs
const octaAnim = {
  loop: true,
  autoplay: true,
  animationData: octa,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const RenderBlockchain = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = async (chainId) => {
    await switchNetwork(chainId);
  };

  return (
    <ImageContainer>
      <Col>
        <Label>Blockchain</Label>
        <BlockchainDesc>Destination for your payoff</BlockchainDesc>
      </Col>
      <Row>
        {blockchains.map((bc, index) => {
          const { logo, chainId } = bc;
          return (
            <div key={index}>
              {chain.id === chainId ? (
                <ImgActiveBox>
                  <Image src={logo} alt="alt" width={'40'} height={'40'} />
                </ImgActiveBox>
              ) : (
                <ImgBox
                  onClick={() => {
                    handleSwitchNetwork(chainId);
                  }}
                >
                  <Image src={logo} alt="alt" width={'40'} height={'40'} />
                </ImgBox>
              )}
            </div>
          );
        })}
      </Row>
    </ImageContainer>
  );
};

const RenderMilestones = () => {
  const { appState, setAppState } = useApp();
  const { milestones } = appState;

  const handleAddMilestone = () => {
    const temp = {
      amount: 0,
      description: '',
    };
    setAppState((prev) => ({ ...prev, milestones: [...prev.milestones, temp] }));
  };

  if (milestones.length === 0) {
    return <ButtonAlt onClick={handleAddMilestone} text='Add funding goals'/>;
  }

  const handleRemoveMilestone = (index) => {
    const temp = milestones.filter((_, index2) => index2 !== index);

    setAppState((prev) => ({ ...prev, milestones: temp }));
  };

  return milestones.map((ms, index) => {
    const { amount, description } = ms;

    return (
      <MainMilestoneContainer key={index}>
        <MilestoneHeader>
          <MilestoneTitle>Milestone {index + 1}</MilestoneTitle>
          <CancelButton onClick={() => handleRemoveMilestone(index)}>X</CancelButton>
        </MilestoneHeader>

        <MilestoneContainer>
          <InputContainer
            label={'Amount'}
            placeholder={'Enter the amount'}
            description={'Set amount to reach the funding milestone'}
            onChange={(e) => setAppState((prev) => ({ ...prev, amount: e.target.value }))}
            type={'number'}
            min={1000}
          />
          <InputContainer
            label={'Describe goal spending'}
            placeholder={'Material for the project construction, hire 2 workers, etc.'}
            description={'Describe how exactly are you going to use resources for this milestone'}
            onChange={(e) => setAppState((prev) => ({ ...prev, description: e.target.value }))}
            type={'textArea'}
          />

          {milestones.length < 5 && index + 1 == milestones.length && (
            <ButtonAlt onClick={handleAddMilestone} text='More milestones (optional)'/>
          )}
        </MilestoneContainer>
      </MainMilestoneContainer>
    );
  });
};

const SetGoals = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pm1, pType } = { ...appState };
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleClick = async () => {
    await setStep((prev) => (prev += 1));
    await setAppState((prev) => ({ ...prev }));
    // If milestone 1 amount is greater than 0, we allow user to access reward & create project pages
    if (pm1 > 0) {
      await setAppState((prev) => ({ ...prev, stepLock: 4 }));
    }
    if (chain) {
      await setAppState((prev) => ({ ...prev, pChain: chain.id }));
    }
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  };

  return (
    <MainContainer>
      <SectionTitle title={'Set funding goals'} subtitle={'Define project allocations'} />
      <Wrapper>
      {pType !== 'Stream' ? (
        <>
          <SelectionWrapper>
            <RenderBlockchain />
          </SelectionWrapper>
          <StreamAnnouncement>Crowdfunding period length is set to 30 days</StreamAnnouncement>
          <MainMilestoneContainer>
            <MilestoneHeader>
              <MilestoneTitle>Funding goal</MilestoneTitle>
            </MilestoneHeader>

            <MilestoneContainer>
              <InputContainer
                label={'Amount ($)'}
                placeholder={'Enter the amount'}
                description={'Set amount to reach the funding milestone'}
                onChange={(e) => setAppState((prev) => ({ ...prev, pm1: e.target.value }))}
                type={'number'}
              />
              <InputContainer
                label={'Describe goal spending'}
                placeholder={'Material for the project construction, hire 2 workers, etc.'}
                description={'Describe how exactly are you going to use resources for this milestone'}
                onChange={(e) => setAppState((prev) => ({ ...prev, pm1Desc: e.target.value }))}
                type={'textArea'}
              />
            </MilestoneContainer>
          </MainMilestoneContainer>
          {pm1 < 1000 && <StreamAnnouncement>$1000 is a minimum amount for the funding goal</StreamAnnouncement>}
          <BetweenRow>
            <ButtonAlt onClick={handleBack} text='Back'/>
            {pm1 >= 1000 ? <ButtonAlt onClick={handleClick} text='Next'/> : null}
          </BetweenRow>
        </>
      ) : (
        <StreamAnnouncement>
          <Lottie height={100} width={100} options={octaAnim} />
          <div>MVP stage: Supported only Polygon for money streaming type. Go Next.</div>
          <BetweenRow>
            <ButtonAlt onClick={handleBack} text='Back'/>
            {chain.id !== 80001 ? (
              <ButtonAlt
                onClick={() => { switchNetwork(80001)}} text ='Switch to Polygon'/>
            ) : (
              <ButtonAlt onClick={handleClick} text='Next'/>
            )}
          </BetweenRow>
        </StreamAnnouncement>
      )}
    </Wrapper>
    </MainContainer>
  );
};

export default SetGoals;
