import React from 'react';
import styled, { useTheme } from 'styled-components';
import type { NextPage } from 'next';
import Image from 'next/image';
import Eye7 from '../public/Eye7.png';
import Footer from '../sections/Footer/Footer';
import SectionTitle from '../components/typography/SectionTitle';
import { BookIcon, DeniedIcon, KeyIcon, WorkIcon } from '../components/icons/Common';
import {
  AiIcon,
  BoardGameIcon,
  DaoIcon,
  DefiIcon,
  HwIcon,
  IllustrationIcon,
  IoTIcon,
  LiteratureIcon,
  MobileGameIcon,
  MusicIcon,
  NftApeIcon,
  RoboticsIcon,
  VideoGameIcon,
  VideoIcon,
  WearablesIcon,
} from '../components/icons/Categories';

import Subtitle from '../components/typography/Subtitle';
import { motion } from 'framer-motion';
import { YouTubeIcon } from '../components/icons/Socials';
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'
import { PiggyIcon } from '../components/icons/Landing';
import FaqSection from '../sections/FaqSection'

const Row = styled.div`
  display: flex;
  flex-direction: ${(props: { reverse: boolean }) => (props.reverse ? 'row-reverse' : 'row')};
  width: 100%;
  margin-top: 7%;
  padding-bottom: 4%;
  gap: 10%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: 868px) {
    flex-wrap: wrap;
  }
`;

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 10% 8% 17%;
  @media (max-width: 768px) {
    padding-left: 3%;
    padding-right: 3%;
  }
  @media (min-width: 1968px) {
    padding-left: 25%;
    padding-right: 25%;
  }
`;

const EyeSevenBox = styled.div`
  margin: 5%;
  text-align: center;
  position: relative;
`;

const CatBox = styled.div`
  padding-top: 3%;
  display: flex;
  flex-direction: column;
`;

const CatIcons = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 90%;
  gap: 1%;
`;

const CatDesc = styled(motion.div)`
  position: absolute;
  font-family: 'Gemunu Libre';
  letter-spacing: 0.3;
  left: 50%;
  background: ${(props) => props.theme.colors.gradient};
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 5px;
`;

const YtLink = styled.span`
  text-decoration: underline;
  margin-right: 5%;
`;

export interface IFAQ {
  question: string;
  answer: string;
  points: string[];
  image: JSX.Element;
}

export interface ICats {
  text: string;
  icon: JSX.Element;
}

const Faq: NextPage = () => {
  const [catTooltip, setCatTooltip] = React.useState('');
  // https://stackoverflow.com/questions/66483948/react-typescript-property-body-does-not-exist-type-defaulttheme
  const theme = useTheme();

  const FAQS: IFAQ[] = [
    {
      question: 'Why Eyeseek Funding?',
      answer: 'Benefits over other crowdfunding platforms',
      points: [
        'Platform fee costs only 1% per successfully funded project',
        'Developer & Startup friendly environment, we are on the same page',
        'No personal data needed. Wallet address is your primary identity',
        'Extends crowdfunding features never seen before',
      ],
      image: <BookIcon width={150} color={theme.colors.icon} />,
    },
    {
      question: 'What do I need as a project owner?',
      answer: 'Rules to follow to be eligible of Eyeseek funding',
      points: [
        'Owner has to inform regularly backers with project updates',
        'Projects must create something to share with others',
        'Projects and backer statistics must be honest and clearly presented',
        "Projects can't involve prohibited items",
      ],
      image: <DeniedIcon width={150} color={theme.colors.icon} />,
    },
    {
      question: 'Why blockchain?',
      answer: 'Possibilities granted by blockchain technology',
      points: [
        'Introduction of the game theory into crowdfunding thanks to the microfunds',
        'Accept cryptocurrency payments from multiple blockchains at once',
        'Real-time money streaming from backers to project owners',
        'Guaranteed rewards in ERC20/ERC1155 tokens as additional benefit',
      ],
      image: <KeyIcon width={70} color={theme.colors.icon} />,
    },
    {
      //@ts-ignore
      question: (
        <>
          <a href="https://www.youtube.com/channel/UCc6H1w6MZUqaa9FYVZUqcfg" rel="noopener noreferrer" target="_blank">
            <YtLink>How does it work?</YtLink>
            <YouTubeIcon width={25} height={25} />
          </a>
        </>
      ),
      answer: 'Creators can set up project in 5 simple steps',
      points: [
        'Possibility to offer limited amount of rewards, tokens and NFTs',
        'Backers discover projects based on their interests and donate',
        'Larger backers can play a game and deploy microfunds instead of donating',
        'Microfunds incentivize smaller backers to join the ride with larger impact',
      ],
      image: <WorkIcon width={100} height={150} color={theme.colors.icon} />,
    },
    {
      question: 'What happens after the project is funded?',
      answer: 'Creators should handle their responsibilities',
      points: [
        'Project owner should notify backers with next steps',
        'Token rewards are automatically distributed to backers',
        'Non-token rewards are in hand of the project owner',
        'Microfund resources not charged are returned to backers',
        'Project owner receives on wallet address USDC/USDT funds',
      ],
      image: <PiggyIcon width={150} height={100} color={theme.colors.icon} />,
    }
  ];

  const ICats: ICats[] = [
    {
      text: 'Wearables - Invent new gadgets and accessories',
      icon: <WearablesIcon width={50} height={50} />,
    },
    {
      text: 'Robotics - Help new generation of machines take over the world',
      icon: <RoboticsIcon width={50} height={50} />,
    },
    {
      text: 'AI - Feed data sets across the science labs and universities',
      icon: <AiIcon width={50} height={50} />,
    },
    {
      text: 'IoT - Use sensors to collect data and push automation to the next level',
      icon: <IoTIcon width={50} height={50} />,
    },
    {
      text: 'Mobile app - Implement a benefitial app or an addictive game',
      icon: <MobileGameIcon width={50} height={50} />,
    },
    {
      text: 'Board games - Design strategic masterpiece or a fun party game',
      icon: <BoardGameIcon width={50} height={50} />,
    },
    {
      text: 'Video games - Build an indie game or a AAA blockbuster',
      icon: <VideoGameIcon width={50} height={50} />,
    },
    {
      text: 'Hardware - Assemble powerful devices for green crypto mining',
      icon: <HwIcon width={50} height={50} />,
    },
    {
      text: 'Movies - Become a director or produce a video with deep emotional impact',
      icon: <VideoIcon width={50} height={50} />,
    },
    {
      text: 'Illustration - Draw anything you imagine and above',
      icon: <IllustrationIcon width={50} height={50} />,
    },
    {
      text: 'Literature - Write a book of poems, autobiography, or a novel',
      icon: <LiteratureIcon width={50} height={50} />,
    },
    {
      text: 'Music - Support of all kinds of music production, or musical events',
      icon: <MusicIcon width={50} height={50} />,
    },
    {
      text: 'Defi - Lending, borrowing, all sorts of crypto trading',
      icon: <DefiIcon width={50} height={50} />,
    },
    {
      text: 'NFT - Explore new ways how to leverage NFTs non-fungibility',
      icon: <NftApeIcon width={50} height={50} />,
    },
    {
      text: 'DAO - Establish a decentralized autonomous organization',
      icon: <DaoIcon width={50} height={50} />,
    },
  ];

  const CatIcon = ({ text, icon }) => {
    return (
      <div onMouseEnter={() => setCatTooltip(text)} onMouseLeave={() => setCatTooltip('')}>
        {icon}
      </div>
    );
  };

  const dispatch = useDispatch() 
    const noti = (text) => {
      dispatch(notify(text, 'info'))
  }

  return (
    <>
      <SectionTitle title="FAQ" subtitle="Learn more about Eyeseek Funding" />
      <FaqContainer>
        {FAQS.map(({ answer, image: Image, points, question }, index) => {
          const isEven = index % 2 === 0;
          return (
            <Row reverse={isEven} key={index}>
              <FaqSection answer={answer} image={Image} points={points} question={question}/>
            </Row>
          );
        })}

        <CatBox>
          {catTooltip !== '' && (
            <CatDesc
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                scale: [0, 1, 0.5, 1],
              }}
            >
              {catTooltip}
            </CatDesc>
          )}
          <Subtitle text="Categories" />
          <CatIcons>
            {ICats.map(({ text, icon }, index) => {
              return <CatIcon text={text} icon={icon} key={index} />;
            })}
          </CatIcons>
        </CatBox>
      </FaqContainer>

      <EyeSevenBox>
        <Image src={Eye7} alt="Eye7" width={'400%'} height={'40%'} />
      </EyeSevenBox>
      <Footer />
    </>
  );
};

export default Faq;
