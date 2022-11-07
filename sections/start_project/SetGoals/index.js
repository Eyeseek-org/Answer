import { useApp } from "../../utils/appContext";
import InputContainer from '../../../components/form/InputContainer'
import { TellContainer } from "../TellStory/StyleWrapper";
import { ImageContainer, MilestoneContainer, MilestoneTitle, MainMilestoneContainer, MilestoneHeader, CancelButton, Label, SelectionWrapper, BlockchainDesc, StreamAnnouncement } from "./StyleWrapper";
import { ButtonContainer, DisButton, MainContainer, NextButton } from "../Category/StyleWrapper";
import SectionTitle from "../../../components/typography/SectionTitle";
import {useSwitchNetwork, useNetwork } from "wagmi";
import styled from 'styled-components'
import Image from "next/image";
import {blockchains} from '../../../data/blockchains'
import { Col, Row } from "../../../components/format/Row";
import Lottie from "react-lottie";
import octa from '../../../data/animations/octa.json'


const ImgActiveBox = styled.div`
  opacity: 1;
`

const ImgBox = styled.div`
  opacity: 0.3;
  cursor: pointer;
`

// Animation configs 
const octaAnim = {
  loop: true,
  autoplay: true,
  animationData: octa,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
};

const RenderBlockchain = () => {
  const { chain } = useNetwork()
  const {switchNetwork} = useSwitchNetwork();
  return (
    <ImageContainer>
      <Col>
        <Label>Blockchain</Label>
        <BlockchainDesc>Destination for your payoff</BlockchainDesc>
      </Col>
      <Row>
      {blockchains.map((bc, index) => {
        const { logo, chainId } = bc;
        return  <>
                  {chain.id === chainId ? 
                      <ImgActiveBox key={index}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgActiveBox> : 
                      <ImgBox onClick={()=>{switchNetwork(chainId)}}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgBox> 
                  }
                </>
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
      description: "",
    };
    setAppState((prev) => ({ ...prev, milestones: [...prev.milestones, temp] }));
  };

  if (milestones.length === 0) {
    return <NextButton onClick={handleAddMilestone}>Add funding goals</NextButton>;
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
          />
          <InputContainer 
            label={'Describe goal spending'} 
            placeholder={'Material for the project construction, hire 2 workers, etc.'} 
            description={'Describe how exactly are you going to use resources for this milestone'}
            onChange={(e) => setAppState((prev) => ({ ...prev, description: e.target.value }))}
            type={'textArea'}
          />

          {milestones.length < 5 && index + 1 == milestones.length && <NextButton onClick={handleAddMilestone}>More milestones (optional)</NextButton>}
        </MilestoneContainer>
      </MainMilestoneContainer>
    );
  });
};

const SetGoals = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pm1, pm1Desc, pType } = { ...appState };
  const { chain } = useNetwork()
  const {switchNetwork} = useSwitchNetwork();

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev }));
    // If milestone 1 amount is greater than 0, we allow user to access reward & create project pages
    if (pm1 > 0) {
      setAppState((prev) => ({ ...prev, stepLock: 4 }));
    }
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  return (
    <MainContainer>
      <SectionTitle title={'Set funding goals'} subtitle={'Define project allocations'}/>
      {pType !== 'Stream' ? <TellContainer>
        <SelectionWrapper>
          <RenderBlockchain />
        </SelectionWrapper>
        <MainMilestoneContainer>
        <MilestoneHeader>
          <MilestoneTitle>Funding goal</MilestoneTitle>
        </MilestoneHeader>

        <MilestoneContainer>
          <InputContainer 
            label={'Amount'} 
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
        {pm1 < 1000 && <>At least 1 milestone is needed, $1000 minimum</>}
        <ButtonContainer>
          <NextButton onClick={handleBack}>Back</NextButton>
          {pm1 >= 1000 ? <NextButton onClick={handleClick}>Next</NextButton> : <DisButton>Next</DisButton>}
        </ButtonContainer>
      </TellContainer> : 
      <StreamAnnouncement><Lottie height={100} width={100} options={octaAnim} /><div>MVP stage: Supported only Polygon for money streaming type. Go Next.</div>
        <ButtonContainer>
          <NextButton onClick={handleBack}>Back</NextButton>
          {chain.id !== 80001 ? <NextButton onClick={()=>{switchNetwork(80001)}}>Switch to Polygon</NextButton> : <NextButton onClick={handleClick}>Next</NextButton>}
        </ButtonContainer>
      </StreamAnnouncement>}
    </MainContainer>
  );
};

export default SetGoals;
