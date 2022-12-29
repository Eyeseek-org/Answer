import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import styled, {useTheme} from 'styled-components';
import { useApp } from '../../sections/utils/appContext';
import SectionTitle from '../../components/typography/SectionTitle';
import DonateWithout from '../../sections/Donate/DonateWithout';
import { Row } from '../../components/format/Row';
import { InfoIcon } from '../../components/icons/Common';
import Tooltip from '../../components/Tooltip';
import Warning from '../../components/animated/Warning';
import ButtonErr from '../../components/buttons/ButtonErr';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { polygonCurrencies } from '../../data/currencies';
import { testChains } from '../../data/contracts/core';
import NativeFaucet from '../../sections/Donate/NativeFaucet';
import Faucet from '../../components/buttons/Faucet';
import LandingDonate from '../../components/animated/LandingDonate';
import RewardList from '../../sections/ProjectDetail/RewardList';
import Tab from '../../components/form/Tab';
import DonateWrapper from '../../sections/Donate/DonateWrapper';
import { UniService } from '../../services/DapAPIService';
import { useQuery } from '@tanstack/react-query';
import { BodyBox, MainContainer } from '../../components/format/Box';
import {ChainIconComponent, CurrAddress} from '../../helpers/MultichainHelpers'
import ErrText from '../../components/typography/ErrText';

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


const Option = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  min-width: 90px;
  letter-spacing: 0.4px;
  border-radius: 90px;
  background: ${(props) => props.theme.colors.gradient};
  align-items: center;
  font-family: 'Neucha';
  @media (min-width: 1580px) {
    font-size: 1em;
  }
`;

const OptionItemWrapper = styled.div`
  border-radius: 45px;
  border: 1px solid #404040;
  padding: 1%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.body};
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
  font-family: 'Roboto';

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

const DonateOptionSub = styled.div`
  font-family: 'Roboto';
  font-size: 0.7em;
  font-weight: 300;
  font-style: italic;
`;

const InfoBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ImgActiveBox = styled.div`
  opacity: 1;
`;

const ImgBox = styled.div`
  opacity: 0.3;
  cursor: pointer;
`;

const FaucetBox = styled.div`
  font-family: 'Neucha';
  font-size: 1.2em;
  letter-spacing: 0.6px;
  position: absolute;
  right: -110px;
  @media (max-width: 1068px) {
    display: none;
  }
`;

const Donate: NextPage = () => {
  const router = useRouter();
  const { objectId } = router.query;
  const [currency, setCurrency] = useState('USDC');
  const [apiError, setApiError] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const theme  = useTheme();
  const [tooltip, setTooltip] = useState(false);

  const [usdcFaucet, setUsdcFaucet] = useState(testChains.polygonUsdcFaucet);
  const [usdtFaucet, setUsdtFaucet] = useState(testChains.polygonUsdtFaucet);
  const [currencyAddress, setCurrencyAddress] = useState<string>('USDC');
  const [curr, setCurr] = useState(1);

  const [active, setActive] = useState('No reward');
  // @ts-ignore
  const { appState, setAppState } = useApp();
  const {  rewId } = appState;
  const [showRewards, setShowRewards] = useState(false)


  const query = `/classes/Project?where={"objectId":"${objectId}"}`
  const { data: projectDetail } = useQuery(['project-detail'], () => UniService.getDataSingle(query), {
    enabled: !!router.isReady,
    onSuccess: (data) => {
       // @ts-ignore
      setCurrencyAddress(CurrAddress(currency, data.chainId));
    },
    onError: (error) => {
      setApiError(true);
    }
  });


  useEffect(() => {
      setAppState({ ...appState, rewMAmount: 0, rewDAmount: 0 });
      handleSwitchCurrency('USDC')
  },[])

  const handleSwitchNetwork = (id: number) => {
    switchNetwork(id);
    switch (id) {
      case 80001:
        setUsdcFaucet(testChains.polygonUsdcFaucet);
        setUsdtFaucet(testChains.polygonUsdtFaucet);
        setCurrencyAddress(CurrAddress(currency, id));
        break;
      case 97:
        setUsdcFaucet(testChains.bnbUsdcFaucet);
        setUsdtFaucet(testChains.bnbUsdtFaucet);
        setCurrencyAddress(CurrAddress(currency, id));
        break;
      case 4002:
        setUsdcFaucet(testChains.fantomUsdcFaucet);
        setUsdtFaucet(testChains.fantomUsdtFaucet);
        setCurrencyAddress(CurrAddress(currency, id));
        break;
      case 420:
        setUsdcFaucet(testChains.optimismUsdcFaucet);
        setUsdtFaucet(testChains.optimismUsdtFaucet);
        setCurrencyAddress(CurrAddress(currency, id));
        break;
      default:
        setUsdcFaucet('');
        setUsdtFaucet('');
        break;
    }
  };

  const handleSwitchCurrency = (c: string) => {
    switch (c) {
      case 'USDC':
        setCurrency('USDC');
        setCurr(1);
        setCurrencyAddress(CurrAddress(c, projectDetail?.chainId));
        break;
      case 'USDT':
        setCurrency('USDT');
        setCurr(2);
        setCurrencyAddress(CurrAddress(c, projectDetail?.chainId));
        break;
    }
  };

  const RenderCurrency = () => {
    return <>
        {polygonCurrencies.map((c, index) => {
          const { logo, title } = c;
          return (
            <Option key={index}>
              {title === currency ? (
                <ImgActiveBox> <Image src={logo} alt={title} width={'40'} height={'40'} /> </ImgActiveBox>
              ) : (
                <ImgBox onClick={() => {handleSwitchCurrency(title)}}>
                  <Image src={logo} alt="alt" width={'40'} height={'40'} />
                </ImgBox>
              )}
            </Option>
          );
        })}
      </>
  };

  const handleNoReward = async () => {
    await setAppState({ ...appState, rewAAmount: 0 });
    await setAppState({ ...appState, rewDAmount: 0 });
    setActive('No reward');
    setShowRewards(false);
  };

  const handleOnReward = async () => {
    setActive('Limited rewards');
    setShowRewards(true);
  };

  return <>
  <MainContainer>        
    <SectionTitle title={'Donate'} subtitle={'Select an option below'} />
    {!apiError ?
      <BodyBox>
        <Warning/>
        <DonateOption>
          {/* @ts-ignore */}
          {tooltip && <Tooltip text="Donates accepted only on this chain" />}
          <DonateOptionTitle>
            <Row>
              Blockchain
              <InfoBox onMouseEnter={() => {setTooltip(true);}} onMouseLeave={() => {setTooltip(false); }}>
              {/* @ts-ignore */}
                <InfoIcon color={theme.colors.icon} width={15} />
              </InfoBox>
            </Row>
            {/* <DonateOptionSub>Select your source of donation</DonateOptionSub> */}
          </DonateOptionTitle>
           <Row>
              {projectDetail && <div> <ChainIconComponent ch={projectDetail.chainId} /></div>}
              {chain?.id !== projectDetail?.chainId && <ButtonErr text="Wrong network" onClick={() => handleSwitchNetwork(projectDetail?.chainId)} width={'150px'} />}
            </Row>
        </DonateOption>
        <DonateOption>
         {process.env.NEXT_PUBLIC_ENV === 'dev' &&  <FaucetBox>
            Test purpose:
            <Faucet currency={'USDC'} address={usdcFaucet} />
            <Faucet currency={'USDT'} address={usdtFaucet} />
            <NativeFaucet />
            <LandingDonate />
          </FaucetBox>}
          <DonateOptionTitle>
            <Row>Currency</Row>
            <DonateOptionSub>Choose donate currency</DonateOptionSub>
          </DonateOptionTitle>
          <OptionItemWrapper>
           {chain ? <RenderCurrency /> : <>Currency not found for this chain</>}
          </OptionItemWrapper>
        </DonateOption>
        <DonateOption>
          <DonateOptionTitle>
            <Row>Rewards</Row>
            <DonateOptionSub>Choose one of the reward options</DonateOptionSub>
          </DonateOptionTitle>
          {/* @ts-ignore */}
          <Tab
            o1={'No reward'}
            o2={'Limited rewards'}
            active={active}
            change1={() => {
              handleNoReward();
            }}
            change2={() => {
              handleOnReward();
            }}
          />
        </DonateOption>
        {/* @ts-ignore */}
        {showRewards ? (
          <>
            <RewardList chain={chain} oid={objectId} type='donate' />
            <DonateWrapper
              pid={projectDetail?.pid}
              bookmarks={projectDetail?.bookmarks}
              currencyAddress={currencyAddress}
              curr={curr}
              home={projectDetail?.chainId}
            />
          </>
        ) : (
          <DonateWithout
            pid={projectDetail?.pid}
            currency={currency}
            bookmarks={projectDetail?.bookmarks}
            currencyAddress={currencyAddress}
            curr={curr}
            home={projectDetail?.chainId}
            rid={rewId}
          />
        )}
    </BodyBox> : <ErrText text='Service is temporarily unavailable'/>}
  </MainContainer>
  </>
};

export default Donate;
