import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import axios from 'axios'

import icon4 from "../../public/icons/donate/icon4.png";
import usdt from "../../public/icons/usdt.png";
import dai from "../../public/icons/dai.png";
import SectionTitle from "../../components/typography/SectionTitle";
import DonateWithout from '../../sections/Donate/DonateWithout'
import { Row } from '../../components/format/Row'
import { InfoIcon } from "../../components/icons/Common";
import Tooltip from "../../components/Tooltip";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { moralisApiConfig } from "../../data/moralisApiConfig";
import { blockchains } from "../../data/blockchains";

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
  letter-spacing: 0.4px;
  align-items: center;
  font-family: "Neucha";
  @media (min-width: 1580px) {
    font-size: 1em;
  }
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
  @media (min-width: 1580px) {
    font-size: 1.3em;
  }
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

const InfoBox = styled.div`
  &:hover{
    cursor: pointer;
  }
`

const ImgActiveBox = styled.div`
  opacity: 1;
`

const ImgBox = styled.div`
  opacity: 0.3;
  cursor: pointer;
`

const Donate: NextPage = () => {
  const [rewardNo, setRewardNo] = useState(true);
  const [reward1, setReward1] = useState(false);
  const [currency, setCurrency] = useState("USDC");
  const [apiError, setApiError] = useState(false);
  const [project, setProject] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [rewards, setRewards] = useState();
  const [pid, setPid] = useState();
  const router = useRouter()
  const { objectId } = router.query
  const { chain } = useNetwork()
  const {switchNetwork} = useSwitchNetwork();

  const [blockchain, setBlockchain] = useState("")
  const [tooltip, setTooltip] = useState(false)

  const RenderBlockchain = () => {

    return (
      <>
        {blockchains.map((bc, index) => {
          const { logo, chainId } = bc;
          return  <OptionReward>
                    {chain && chain.id === chainId ? 
                        <ImgActiveBox key={index}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgActiveBox> : 
                        <ImgBox onClick={()=>{switchNetwork(chainId)}}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgBox> 
                    }
                  </OptionReward>
          })}
      </>
    );
  };

  useEffect(() => {
    getProjectDetail()
    getTokenReward()
    getRewards()
  },[]);

  const getProjectDetail = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"objectId":"${objectId}"}`,moralisApiConfig)
        if (res.data.results.length > 0) {
          setProject(res.data.results[0])
          setPid(res.data.results[0].pid)
        }
        setApiError(false)
    } catch (err) {
        console.log(err)
        setApiError(true)
    }
}

const getTokenReward = async () => {
  try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/TokenReward?where={"project":"${objectId}"}`,moralisApiConfig)
      if (res.data.results.length > 0) {
        setTokenAmount(res.data.results[0].tokenAmount)
        setTokenName(res.data.results[0].tokenName)
        setTokenAddress(res.data.results[0].tokenAddress)
      }
      setApiError(false)
  } catch (err) {
      console.log(err)
      setApiError(true)
  }
}

const getRewards = async () => {
  try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward?where={"project":"${objectId}"}`,moralisApiConfig)
      if (res.data.results.length > 0) {
        setRewards(res.data.results)
      }
      setApiError(false)
  } catch (err) {
      console.log(err)
      setApiError(true)
  }
}

  /// TBD after axelar, handle mutlichain conditions
  /// TBD bookmark after donate


  return <Container>
    <SectionTitle title={'Donate'} subtitle={'Select an option below'} />
    <DonateContentWrapper>
      <DonateOption>
       {/* @ts-ignore */}
        {tooltip && <Tooltip text='No matter from which chain you pay. Axelar will take care to route funds on target' />}
        <DonateOptionTitle>
          <Row>Blockchain <InfoBox onMouseEnter={() => { setTooltip(true) }} onMouseLeave={() => { setTooltip(false) }}> <InfoIcon width={15} /></InfoBox></Row>
          <DonateOptionSub>Select your source of donation</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
            <RenderBlockchain/>
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
          <Row>Donate</Row><DonateOptionSub>Custom amount for donation</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
        <OptionReward>
          <Checkbox type="checkbox" checked={rewardNo} />
          Without reward
        </OptionReward>
        {rewards && rewards.length > 0 && rewards.map((_reward, index) => {
          <div key={index}>Reward</div>
        })}
        </OptionItemWrapper>
      </DonateOption>
      {tokenAddress  && 
        <DonateOption>
          <DonateOptionTitle>
            <Row>Token pool</Row>
            <DonateOptionSub>Proportional reward for all backers</DonateOptionSub>
          </DonateOptionTitle>
          <OptionItemWrapper>
            <OptionReward>
                Token pool of {tokenName} - {tokenAmount}x, {tokenAddress}
            </OptionReward>
          </OptionItemWrapper>
        </DonateOption>}
        {rewardNo && <DonateWithout pid={pid} currency={currency} />}
        {reward1 && <DonateWithout pid={pid} currency={currency}  />}
    </DonateContentWrapper>
  </Container>
}

export default Donate;