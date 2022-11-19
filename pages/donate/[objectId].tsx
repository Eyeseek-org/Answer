import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { useApp } from '../../sections/utils/appContext';
import SectionTitle from '../../components/typography/SectionTitle';
import DonateWithout from '../../sections/Donate/DonateWithout';
import { Row } from '../../components/format/Row';
import { InfoIcon } from '../../components/icons/Common';
import Tooltip from '../../components/Tooltip';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { blockchains } from '../../data/blockchains';
import { currencies } from '../../data/currencies';
import { testChains } from '../../data/contracts';
import NativeFaucet from '../../sections/Donate/NativeFaucet';
import Faucet from '../../components/buttons/Faucet';
import LandingDonate from '../../components/animated/LandingDonate';
import RewardList from '../../sections/ProjectDetail/RewardList';
import Tab from '../../components/form/Tab';
import DonateWrapper from '../../sections/Donate/DonateWrapper';
import { UniService } from '../../services/DapAPIService';
import { useQuery } from '@tanstack/react-query';
import { Wrapper } from '../../components/format/Box';
import {ChainIcon} from '../../helpers/MultichainHelpers'

const Container = styled.div`
  margin-top: 8%;
  margin-bottom: 15%;
`;

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

  const [tooltip, setTooltip] = useState(false);

  const [usdcFaucet, setUsdcFaucet] = useState(testChains.polygonUsdcFaucet);
  const [usdtFaucet, setUsdtFaucet] = useState(testChains.polygonUsdtFaucet);
  const [currencyAddress, setCurrencyAddress] = useState(process.env.NEXT_PUBLIC_AD_USDC);
  const [curr, setCurr] = useState(1);
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);

  const [active, setActive] = useState('No reward');
  // @ts-ignore
  const { appState, setAppState } = useApp();
  const { rewMAmount, rewDAmount, rewId } = appState;
  const [showRewards, setShowRewards] = useState(false);


  const query = `/classes/Project?where={"objectId":"${objectId}"}`
  const { data: projectDetail } = useQuery(['project-detail'], () => UniService.getDataSingle(query), {
    enabled: !!router.isReady,
  });


  const handleSwitchNetwork = (id) => {
    switchNetwork(id);
    if (id === 80001) {
      setUsdcFaucet(testChains.polygonUsdcFaucet);
      setUsdtFaucet(testChains.polygonUsdtFaucet);
      setAdd(process.env.NEXT_PUBLIC_AD_DONATOR);
      if (currency === 'USDC') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC);
      } else if (currency === 'USDT') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT);
      } else if (currency === 'DAI') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI);
      }
    } else if (id === 97) {
      setUsdcFaucet(testChains.bnbUsdcFaucet);
      setUsdtFaucet(testChains.bnbUsdtFaucet);
      setAdd(process.env.NEXT_PUBLIC_AD_DONATOR_BSC);
      if (currency === 'USDC') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_BNB);
      } else if (currency === 'USDT') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_BNB);
      } else if (currency === 'DAI') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_BNB);
      }
    } else if (id === 4002) {
      setUsdcFaucet(testChains.fantomUsdcFaucet);
      setUsdtFaucet(testChains.fantomUsdtFaucet);
      setAdd(process.env.NEXT_PUBLIC_AD_DONATOR_FTM);
      if (currency === 'USDC') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_FTM);
      } else if (currency === 'USDT') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_FTM);
      } else if (currency === 'DAI') {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_FTM);
      }
    } else {
      setUsdcFaucet('');
      setUsdtFaucet('');
    }
  };

  const handleSwitchCurrency = (c: string) => {
    if (c === 'USDC') {
      if (projectDetail.chainId === 80001) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC);
      } else if (projectDetail.chainId === 97) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_BNB);
      } else if (projectDetail.chainId === 4002) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDC_FTM);
      }
      setCurrency('USDC');
      setCurr(1);
    } else if (c === 'USDT') {
      if (projectDetail.chainId === 80001) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT);
      } else if (projectDetail.chainId === 97) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_BNB);
      } else if (projectDetail.chainId === 4002) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_USDT_FTM);
      }
      setCurrency('USDT');
      setCurr(2);
    } else if (c === 'DAI') {
      if (projectDetail.chainId === 80001) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI);
      } else if (projectDetail.chainId === 97) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_BNB);
      } else if (projectDetail.chainId === 4002) {
        setCurrencyAddress(process.env.NEXT_PUBLIC_AD_DAI_FTM);
      }
      setCurrency('DAI');
      setCurr(3);
    }
  };

  const RenderBlockchain = () => {
    return (
      <>
        {blockchains.map((bc, index) => {
          const { logo, chainId } = bc;
          return (
            <Option key={chainId}>
              {chain && chain.id === chainId ? (
                <ImgActiveBox key={index}>
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
            </Option>
          );
        })}
      </>
    );
  };

  const RenderCurrency = () => {
    return (
      <>
        {currencies.map((c, index) => {
          const { logo, title } = c;
          return (
            <Option key={index}>
              {title === currency ? (
                <ImgActiveBox>
                  <Image src={logo} alt={title} width={'40'} height={'40'} />
                </ImgActiveBox>
              ) : (
                <ImgBox
                  onClick={() => {
                    handleSwitchCurrency(title);
                  }}
                >
                  <Image src={logo} alt="alt" width={'40'} height={'40'} />
                </ImgBox>
              )}
            </Option>
          );
        })}
      </>
    );
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

  return (
    <Container>
      <SectionTitle title={'Donate'} subtitle={'Select an option below'} />
      <Wrapper>
        <DonateOption>
          {/* @ts-ignore */}
          {tooltip && <Tooltip text="Donates accepted only on this chain" />}
          <DonateOptionTitle>
            <Row>
              Blockchain
              <InfoBox onMouseEnter={() => {setTooltip(true);}} onMouseLeave={() => {setTooltip(false); }}>
                <InfoIcon width={15} />
              </InfoBox>
            </Row>
            {/* <DonateOptionSub>Select your source of donation</DonateOptionSub> */}
          </DonateOptionTitle>
            <ChainIcon chain={projectDetail.chainId} />
        </DonateOption>
        <DonateOption>
          <FaucetBox>
            Test purpose:
            <Faucet currency={'USDC'} address={usdcFaucet} />
            <Faucet currency={'USDT'} address={usdtFaucet} />
            <NativeFaucet />
            <LandingDonate />
          </FaucetBox>
          <DonateOptionTitle>
            <Row>Currency</Row>
            <DonateOptionSub>Choose donate currency</DonateOptionSub>
          </DonateOptionTitle>
          <OptionItemWrapper>
            <RenderCurrency />
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
            <RewardList chain={chain} oid={objectId} />
            <DonateWrapper
              amountM={rewMAmount}
              amountD={rewDAmount}
              rid={rewId}
              pid={projectDetail?.pid}
              bookmarks={projectDetail?.bookmarks}
              currencyAddress={currencyAddress}
              add={add}
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
            add={add}
            curr={curr}
            home={projectDetail?.chainId}
            rid={rewId}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default Donate;
