import styled from 'styled-components';
import FaqCard from '../../components/cards/FaqCard';
import Lottie from 'react-lottie';
import { useApp } from '../utils/appContext';
import blockchainAnimation from '../../data/animations/blockchainAnimation.json';
import streamAnimation from '../../data/animations/streamAnimation.json';
import { useState } from 'react';

const animOptions = {
  loop: true,
  autoplay: true,
  animationData: blockchainAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const streamOptions = {
  loop: true,
  autoplay: true,
  animationData: streamAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.4em;
  font-family: 'Neucha';
  margin-top: 2%;
  @media (min-width: 1980px) {
    font-size: 1.9em;
  }
`;

const Col = styled.div`
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 45px;
  margin: 1%;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
  animation: fadeIn 0.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  font-size: 0.9em;
  height: 100%;
  @media (min-width: 1980px) {
    font-size: 1.1em;
  }
`;
const Clickable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  border-radius: 5px;
  margin: 2%;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const TypeTitle = styled.div`
  font-size: 1.3em;
  font-family: 'Neucha';
  margin-top: 5%;
  color: ${(props) => props.color};
  @media (min-width: 1980px) {
    font-size: 1.7em;
  }
`;

const projects = [
  {
    answer: 'Recommended for new projects boosting ideas from scratch.',
    points: [
      'Kickstarter-like multichain donations',
      'Offer usual rewards, ERC20 tokens or ERC1155 NFTs',
      'Supported on Polygon, BNB Chain, Fantom',
      'Microfund strategies, incentivize smaller backers',
    ],
  },
  {
    answer: 'Ideal for already built projects looking to fund open-source or non-profit activities.',
    points: [
      'Single-chain payment streaming',
      'Supported only on polygon',
      'Payment in super token (Wrapped ERC20)',
      'Powered by Superfluid',
    ],
  },
];

// TODO: refactor - remove styles from states
const ProjectTypeSelection = () => {
  const [standColor, setStandColor] = useState(
    'radial-gradient(111.37% 111.37% at 50% 50%, rgba(0, 119, 12, 0.06) 0%, rgba(5, 0, 233, 0) 97.7%)'
  );
  const [standTitleColor, setStandTitleColor] = useState('#00ff89');
  const [streamColor, setStreamColor] = useState('none');
  const [streamTitleColor, setStreamTitleColor] = useState('none');
  const { appState, setAppState } = useApp();

  const handleStandType = (type) => {
    setAppState({ ...appState, pType: type });
    setStandColor('radial-gradient(111.37% 111.37% at 50% 50%, rgba(0, 119, 12, 0.06) 0%, rgba(5, 0, 233, 0) 97.7%)');
    setStandTitleColor('#00ff89');
    setStreamColor('none');
    setStreamTitleColor('none');
  };

  const handleStreamType = (type) => {
    setAppState({ ...appState, pType: type });
    setStandColor('none');
    setStandTitleColor('none');
    setStreamColor('radial-gradient(111.37% 111.37% at 50% 50%, rgba(137, 0, 171, 0.04) 0%, rgba(5, 0, 233, 0) 97.7%)');
    setStreamTitleColor('#e700ff');
  };

  return (
    <Container>
      <Title>Select funding type</Title>
      <Row>
        <Col color={standColor}>
          <Clickable
            onClick={() => {
              handleStandType('Standard');
            }}
          >
            <Lottie height={150} width={150} options={animOptions} />
            <TypeTitle color={standTitleColor}>Standard</TypeTitle>
          </Clickable>
          <TextBox>
            <FaqCard answer={projects[0].answer} points={projects[0].points} />
          </TextBox>
        </Col>
        <Col color={streamColor}>
          <Clickable
            onClick={() => {
              handleStreamType('Stream');
            }}
          >
            <Lottie height={150} width={150} options={streamOptions} />
            <TypeTitle color={streamTitleColor}>Stream</TypeTitle>
          </Clickable>
          <TextBox>
            <FaqCard answer={projects[1].answer} points={projects[1].points} />
          </TextBox>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectTypeSelection;
