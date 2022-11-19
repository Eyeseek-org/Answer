import React from 'react';
import styled from 'styled-components';
import type { NextPage } from 'next';
import Image from 'next/image';

import Eye7 from '../public/Eye7.png';
import Footer from '../sections/Footer';
import SectionTitle from '../components/typography/SectionTitle';
import { BookIcon, DeniedIcon, KeyIcon, WorkIcon } from '../components/icons/Common';
import { BoardGameIcon, MobileGameIcon, RoboticsIcon, WearablesIcon } from '../components/icons/Categories';
import FaqCard from '../components/cards/FaqCard';
import Subtitle from '../components/typography/Subtitle';
import Tooltip from '../components/Tooltip';

const Container = styled.div``;

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
`;

const Question = styled.div`
  font-family: 'Neucha';
  font-style: normal;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.3;
  font-size: 1.2em;
  line-height: 43px;
  min-width: 30%;
  color: #b0f6ff;
  @media (max-width: 1168px) {
    line-height: 20px;
  }
  @media (min-width: 1780px) {
    font-size: 1.8em;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageBox = styled.div`
  @media (max-width: 968px) {
    display: none;
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
`

const CatIcons = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  gap: 2%;
`

const TooltipBox = styled.div`
  position: absolute;
`

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
    image: <BookIcon width={150} />,
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
    image: <DeniedIcon width={150} />,
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
    image: <KeyIcon width={70} />,
  },
  {
    question: 'How does it work?',
    answer: 'Creators can set up project in 5 simple steps',
    points: [
      'Possibility to offer limited amount of rewards, tokens and NFTs',
      'Backers discover projects based on their interests and donate',
      'Larger backers can play a game and deploy microfunds instead of donating',
      'Microfunds incentivize smaller backers to join the ride with larger impact',
    ],
    image: <WorkIcon width={100} height={150} />,
  },
];

const ICats: ICats[] = [
  {
    text: 'Wearables',
    icon: <WearablesIcon width={50} height={50} />,
  },
  {
    text: 'Robotics',
    icon: <RoboticsIcon width={50} height={50} />,
  },
  {
    text: 'Mobile Games',
    icon: <MobileGameIcon width={50} height={50} />,
  },
  {
    text: 'Board games',
    icon: <BoardGameIcon width={50} height={50} />
  }
]

const Faq: NextPage = () => {
  const [catTooltip, setCatTooltip] = React.useState('');

  const CatIcon = ({text, icon}) => {
    return <div onMouseEnter={()=>setCatTooltip(text)} onMouseLeave={()=>setCatTooltip('')} >{icon}</div>
  }

  return (
    <>
      <Container>
        <SectionTitle title="FAQ" subtitle="Learn more about Eyeseek Funding" />
        <FaqContainer>
          {FAQS.map(({ answer, image: Image, points, question }, index) => {
            const isEven = index % 2 === 0;
            return (
              <Row reverse={isEven} key={index}>
                <FaqCard answer={answer} points={points} />
                <Question>
                  <div>{question}</div>
                  <ImageBox>{Image}</ImageBox>
                </Question>
              </Row>
            );
          })}
        
        <CatBox>
          {catTooltip !== '' && <TooltipBox><Tooltip text={catTooltip} margin={'45px'}/></TooltipBox>}
          <Subtitle text='Categories'/>
          <CatIcons>
            {ICats.map(({text, icon}, index) => {
              return <CatIcon text={text} icon={icon} key={index}/>
            })}
          </CatIcons>
        </CatBox>
        </FaqContainer>
 
      </Container>
      <EyeSevenBox>
        <Image src={Eye7} alt="Eye7" width={'400%'} height={'40%'} />
      </EyeSevenBox>
      <Footer />
    </>
  );
};

export default Faq;
