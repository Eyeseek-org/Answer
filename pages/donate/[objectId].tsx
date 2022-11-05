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
import {testChains} from "../../data/contracts";
import NativeFaucet from "../../sections/Donate/NativeFaucet"
import Faucet from '../../components/buttons/Faucet'
import LandingDonate from '../../components/animated/LandingDonate'

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

const FaucetBox = styled.div`
  font-family: "Neucha";
  font-size: 1.2em;
  letter-spacing: 0.6px;
  position: absolute;
  right: -110px;
`

const Donate: NextPage = () => {
  const router = useRouter()
  const { objectId } = router.query
  const [rewardType, setRewardType] = useState('none')
  const [currency, setCurrency] = useState("USDC");
  const [apiError, setApiError] = useState(false);
  const [project, setProject] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [rewards, setRewards] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [pid, setPid] = useState();
  const { chain } = useNetwork()
  const {switchNetwork} = useSwitchNetwork();

  const [tooltip, setTooltip] = useState(false)

  const [usdcFaucet, setUsdcFaucet] = useState(testChains.polygonUsdcFaucet)
  const [usdtFaucet, setUsdtFaucet] = useState(testChains.polygonUsdtFaucet)
  const [currencyAddress, setCurrencyAddress] = useState(process.env.NEXT_PUBLIC_AD_USDC);
  const [curr, setCurr] = useState(1)
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);

  const handleSwitchNetwork = (id) => {
    switchNetwork(id)
    if (id === 80001){
        setUsdcFaucet(testChains.polygonUsdcFaucet)
        setUsdtFaucet(testChains.polygonUsdtFaucet)
        setAdd(process.env.NEXT_PUBLIC_AD_DONATOR)
        if (currency === 'USDC'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC)
        } else if (currency === 'USDT'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT)
        } else if (currency === 'DAI'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI)
        }
    } else if (id === 97){
        setUsdcFaucet(testChains.bnbUsdcFaucet)
        setUsdtFaucet(testChains.bnbUsdtFaucet)
        setAdd(process.env.NEXT_PUBLIC_AD_DONATOR_BSC)
        if (currency === 'USDC'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_BNB)
        } else if (currency === 'USDT'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_BNB)
        } else if (currency === 'DAI'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_BNB)
        }
    } else if (id === 4002){
        setUsdcFaucet(testChains.fantomUsdcFaucet)
        setUsdtFaucet(testChains.fantomUsdtFaucet)
        setAdd(process.env.NEXT_PUBLIC_AD_DONATOR_FTM)
        if (currency === 'USDC'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_FTM)
        } else if (currency === 'USDT'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_FTM)
        } else if (currency === 'DAI'){
          setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_FTM)
        }
    } else {
        setUsdcFaucet("")
        setUsdtFaucet("")
    }
  }

  const handleCurrency = (curr) => {
    if (curr = 'USDC'){
      if (chain && chain.id === 80001){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC)
      } else if (chain && chain.id === 97){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_BNB)
      } else if (chain && chain.id === 4002){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_FTM)
      }
      setCurrency('USDC')
      setCurr(1)
    } else if (curr = 'USDT'){
      if (chain && chain.id === 80001){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT)
      } else if (chain && chain.id === 97){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_BNB)
      } else if (chain && chain.id === 4002){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_FTM)
      }
      setCurrency('USDT')
      setCurr(2)
    } else if (curr = 'DAI'){
      if (chain && chain.id === 80001){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI)
      } else if (chain && chain.id === 97){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_BNB)
      } else if (chain && chain.id === 4002){
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_FTM)
      }
      setCurrency('DAI')
      setCurr(3)
    }
  }

  const RenderBlockchain = () => {

    return (
      <>
        {blockchains.map((bc, index) => {
          const { logo, chainId } = bc;
          return  <OptionReward key={chainId}>
                    {chain && chain.id === chainId ? 
                        <ImgActiveBox key={index}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgActiveBox> : 
                        <ImgBox onClick={()=>{handleSwitchNetwork(chainId)}}><Image src={logo} alt='alt' width={'40'} height={'40'}/></ImgBox> 
                    }
                  </OptionReward>
          })}
      </>
    );
  };

  useEffect(() => {
    if(!router.isReady) return;
    getProjectDetail()
    getTokenReward()
    getRewards()
  },[router.isReady]);


  const getProjectDetail = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"objectId":"${objectId}"}`,moralisApiConfig)
        if (res.data.results.length > 0) {
          setProject(res.data.results[0])
          setPid(res.data.results[0].pid)
          setBookmarks(res.data.results[0].bookmarks)
          setRewards(res.data.results[0].rewards)
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
    <SectionTitle title={'Donate'} subtitle={'Select an option below'}/>
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
       <FaucetBox>
            Hackathon purpose:
            <Faucet currency={'USDC'} address={usdcFaucet}/>
            <Faucet currency={'USDT'} address={usdtFaucet}/>
            <NativeFaucet/>
            <LandingDonate/>
        </FaucetBox>
        <DonateOptionTitle>
          <Row>Currency</Row><DonateOptionSub>Currently only USDC supported</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
          <OptionReward onClick={()=>{handleCurrency('USDC')}}><Image src={icon4} alt="usdc" width={'40'} height={'40'} /></OptionReward>
          <DisReward onClick={()=>{handleCurrency('USDT')}}><Image src={usdt} alt="usdt" width={'40'} height={'42'} /></DisReward>
          <DisReward onClick={()=>{handleCurrency('DAI')}}><Image src={dai} alt="dai" width={'40'} height={'40'} /></DisReward>
        </OptionItemWrapper>
      </DonateOption>
      <DonateOption>
        <DonateOptionTitle>
          <Row>Donate</Row><DonateOptionSub>Custom amount for donation</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
        <OptionReward>
          <Checkbox type="checkbox"  onChange={()=>setRewardType('none')} />
          Without reward
        </OptionReward>
        <OptionReward>
          <Checkbox type="checkbox"  onChange={()=>setRewardType('token')} />
          Token reward
        </OptionReward>
        {/* @ts-ignore */}
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
        {rewardType === 'none' && <DonateWithout pid={pid} currency={currency} bookmarks={bookmarks} currencyAddress={currencyAddress} add={add} curr={curr} />}
        {rewardType === 'token' && <DonateWithout pid={pid} currency={currency} bookmarks={bookmarks} currencyAddress={currencyAddress} add={add} curr={curr} />}
    </DonateContentWrapper>
  </Container>
}

export default Donate;