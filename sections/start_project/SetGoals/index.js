import { useApp } from "../../utils/appContext";
import InputContainer from '../../../components/form/InputContainer'
import { TellContainer,Mandatory } from "../TellStory/StyleWrapper";
import { ImageContainer, MilestoneContainer, MilestoneTitle, MainMilestoneContainer, MilestoneHeader, CancelButton, Label, SelectionWrapper } from "./StyleWrapper";
import { ButtonContainer, DisButton, MainContainer, NextButton } from "../Category/StyleWrapper";
import ImageSelect from "../../../components/ImageSelect";
import SectionTitle from "../../../components/typography/SectionTitle";
import {useSwitchNetwork, useNetwork } from "wagmi";
import styled from 'styled-components'
import Image from "next/image";
import {blockchains} from '../../../data/blockchains'

const ImgActiveBox = styled.div`
  opacity: 1;
`

const ImgBox = styled.div`
  opacity: 0.5;
  cursor: pointer;
`

const RenderBlockchain = () => {
  const { chain } = useNetwork()
  const {switchNetwork} = useSwitchNetwork();
  return (
    <ImageContainer>
      <Label>Blockchain: </Label>


      {blockchains.map((bc, index) => {
        const { logo, chainId } = bc;
        return  <>
                  {chain.id === chainId ? 
                      <ImgActiveBox key={index}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgActiveBox> : 
                      <ImgBox onClick={()=>{switchNetwork(chainId)}}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgBox> 
                  }
                </>
        })}
    
    </ImageContainer>
  );
};

const RenderCurrency = () => {
  const { appState, setAppState } = useApp();
  const { currency } = appState;

  const handleClick = (bc) => {
    const data = currency.map((x) => {
      x.active = x.title == bc.title;

      return x;
    });
    setAppState((prev) => ({ ...prev, currency: data }));
  };

  return (
    <ImageContainer>
      <Label>Currency: </Label>
      {currency.map((bc, index) => {
        const { title, logo, chainId, active } = bc;

        return <ImageSelect logo={logo} key={index} active={active} onClick={() => handleClick(bc)} />;
      })}
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

    /// TBD pass all milestones into the states -> Add milestones into the DB

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
  const { isNext, pm1 } = { ...appState };

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  return (
    <MainContainer>
      <SectionTitle title={'Set funding goals'} subtitle={'Define project allocations'}/>
      <TellContainer>
        <SelectionWrapper>
          <RenderBlockchain />
          <RenderCurrency />
        </SelectionWrapper>
        <RenderMilestones />
        {pm1 < 1000 && <Mandatory>At least 1 milestone is needed, $1000 minimum</Mandatory>}
        <ButtonContainer>
          <NextButton onClick={handleBack}>Back</NextButton>
          {pm1 >= 1000 ? <NextButton onClick={handleClick}>Next</NextButton> : <DisButton>Next</DisButton>}
        </ButtonContainer>
      </TellContainer>
    </MainContainer>
  );
};

export default SetGoals;
