import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import polygon from "../../public/icons/donate/polygon.png";
import icon2 from "../../public/icons/donate/icon2.png";
import icon3 from "../../public/icons/donate/icon3.png";
import icon4 from "../../public/icons/donate/icon4.png";
import usdt from "../../public/icons/usdt.png";
import dai from "../../public/icons/dai.png";
import SectionTitle from "../../components/typography/SectionTitle";
import DonateWithout from '../../sections/Donate/DonateWithout'
import { Row } from '../../components/format/Row'
import { InfoIcon } from "../../components/icons/Common";
import Tooltip from "../../components/Tooltip";
import { useNetwork, useSwitchNetwork } from "wagmi";

const Container = styled.div`
  margin-top: 8%;
  margin-bottom: 15%;
`

const DonateOption = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 8%;
  @media (max-width: 500px) {
    margin-left: 3rem;
  }
  @media (max-width: 500px) {
    margin-left: 1rem;
  }
`;

const DonateContentWrapper = styled.div`
  padding-top: 5%;
  padding-left: 18%;
  padding-right: 18%;
  @media (max-width: 750px) {
    padding: 0 5%;
  }
  @media (min-width: 2000px) {
    padding-left: 25%;
    padding-right: 25%;
  }
`;

const OptionReward = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  min-width: 90px;
  align-items: center;
  font-family: "Neucha";
`

const DisReward = styled(OptionReward)`
  background: #3d0000;
  opacity: 0.2;
  cursor: not-allowed;
`

const OptionItemWrapper = styled.div`
  margin-left: 4%;
  border-radius: 45px;
  border: 1px solid #404040;
  padding: 1%;
  display: flex;
  align-items: center;
  background: #0f0f0f;
  & > div {
    margin-right: 1rem;
  }
  @media (max-width: 500px) {
    & > div {
      width: 35px;
    }
  }
  @media (max-width: 500px) {
    margin-left: 10px;
  }
`;
const DonateOptionTitle = styled.div`
  width: 33%;
  font-family: "Roboto";

  @media (max-width: 769px) {
    width: 35%;
  }
  @media (max-width: 500px) {
    width: 40%;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Checkbox = styled.input`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: all 150ms;
  padding: 1px;
`


const DonateOptionSub = styled.div`
  font-family: "Roboto";
  font-size: 0.7em;
  font-weight: 300;
  font-style: italic;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: all 150ms;
  padding: 1px;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Icon = styled.svg`
  fill: none;
  stroke: #027600;
  stroke-width: 3px;
`;

const InfoBox = styled.div`
  &:hover{
    cursor: pointer;
  }
`

const Donate: NextPage = () => {
  const [rewardNo, setRewardNo] = useState(true);
  const [reward1, setReward1] = useState(false);
  const [reward2, setReward2] = useState(false);
  const [currency, setCurrency] = useState("USDC");
  const router = useRouter()
  const { pid } = router.query

  const [blockchain, setBlockchain] = useState("")
  const {chain} = useNetwork();
  const {switchNetwork} = useSwitchNetwork()
  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    if(chain){
      setBlockchain(chain.name)
    }
  },[]);

  /// TBD after axelar, handle mutlichain conditions
//@ts-ignore
  const handleChain = (chain,id) => {
    setBlockchain(chain)
    //@ts-ignore
    switchNetwork(id)
  }


  const rewardFalse = () => {
    setRewardNo(false)
    setReward1(false);
    setReward2(false);
  }

  const changeRewardNo = async (r:boolean) => {
    await rewardFalse();
    await setRewardNo(r)
  }

  const changeReward1 = async (r:boolean) => {
    await rewardFalse();
    await setReward1(r)
  }

  const changeReward2 = async (r:boolean) => {
    await rewardFalse();
    await setReward2(r)
  }

  return <Container>
    <SectionTitle title="Select your reward" subtitle={'Select an option below'} />
    <DonateContentWrapper>
      <DonateOption>
       {/* @ts-ignore */}
        {tooltip && <Tooltip text='No matter from which chain you pay. Axelar will take care to route funds on target' />}
        <DonateOptionTitle>
          <Row>Blockchain <InfoBox onMouseEnter={() => { setTooltip(true) }} onMouseLeave={() => { setTooltip(false) }}> <InfoIcon width={15} /></InfoBox></Row>
          <DonateOptionSub>Select your source of donation</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
          <OptionReward onClick={()=>{handleChain('polygon', 80001)}}><Image src={polygon} alt="polygon" width={'40'} height={'40'} /></OptionReward>
          <OptionReward><Image src={icon2} alt="fantom" width={'40'} height={'40'} /></OptionReward>
          <OptionReward><Image src={icon3} alt="bnb" width={'40'} height={'40'} /></OptionReward>
        </OptionItemWrapper>
      </DonateOption>
      <DonateOption>
        <DonateOptionTitle>
          <Row>Currency</Row><DonateOptionSub>Currently only USDC supported</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
          <OptionReward><Image src={icon4} alt="usdc" width={'40'} height={'40'} /></OptionReward>
          <DisReward><Image src={usdt} alt="usdt" width={'40'} height={'42'} /></DisReward>
          <DisReward><Image src={dai} alt="dai" width={'40'} height={'40'} /></DisReward>
        </OptionItemWrapper>
      </DonateOption>
      <DonateOption>
        <DonateOptionTitle>
          <Row>Donate</Row><DonateOptionSub>Without promised reward</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
        <OptionReward>
          <Checkbox type="checkbox" checked={rewardNo} onChange={() => changeRewardNo(!rewardNo)} />
          Without reward
        </OptionReward>
        <OptionReward>
          <Checkbox type="checkbox" checked={reward2} onChange={() => changeReward2(!reward2)} />
          Reward #1
        </OptionReward>
        <OptionReward>
          <Checkbox type="checkbox" checked={reward1} onChange={() => changeReward1(!reward1)} />
          Reward #2
        </OptionReward>
        </OptionItemWrapper>
      </DonateOption>
      {rewardNo && <DonateWithout pid={pid} currency={currency} blockchain={blockchain} />}
      {reward1 && <DonateWithout pid={pid} currency={currency} blockchain={blockchain} />}
      {reward2 && <DonateWithout pid={pid} currency={currency} blockchain={blockchain} />}
    </DonateContentWrapper>
  </Container>
}

export default Donate;