import styled from 'styled-components';
import FaqCard from '../../components/cards/FaqCard';
import Lottie from 'react-lottie';
import { useApp } from '../utils/appContext';
import blockchainAnimation from '../../data/blockchainAnimation.json'
import streamAnimation from '../../data/streamAnimation.json'
import { useState } from 'react';

const animOptions = {
    loop: true,
    autoplay: true,
    animationData: blockchainAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const streamOptions = {
    loop: true,
    autoplay: true,
    animationData: streamAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    border: 1px solid #3C3C3C;
    border-radius: 5px;
`

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    @media (max-width: 768px) {
        width: 100%;
        flex-wrap: wrap;
    }
`

const Title = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-family: 'Neucha';
`

const Col = styled.div`
    background: ${props => props.color};
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
`

const TextBox = styled.div`
    display: flex;
    font-size: 0.9em;
    height: 100%;
`
const Clickable = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    border-radius: 5px;
    margin: 2%;
    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }
`

const TypeTitle = styled.div`
    font-size: 1.3em;
    font-family: 'Neucha';
    margin-top: 5%;
    color: ${props => props.color};
`

const text = {
    a1: 'Recommended for starting projects looking for first resources.',
    p11: 'Kickstarter-like donations',
    p12: 'Crosschain-funding',
    p13: 'Crypto launchpad',
    p14: 'Microfund strategies',
    a2: 'Recommended for already built projects looking to fund open-source or non-profit activities.',
    p21: 'Single-chain payment streaming',
    p22: 'Supported only on polygon',
    p23: 'Payment in super token (Wrapped ERC20)',
    p24: 'Powered by Superfluid',
}

const ProjectTypeSelection = () => {
    const [standColor, setStandColor] = useState('radial-gradient(111.37% 111.37% at 50% 50%, rgba(0, 119, 12, 0.06) 0%, rgba(5, 0, 233, 0) 97.7%)')
    const [standTitleColor, setStandTitleColor] = useState('#00ff89')
    const [streamColor, setStreamColor] = useState('none')
    const [streamTitleColor, setStreamTitleColor] = useState('none')
    const { appState, setAppState } = useApp();

    const handleStandType = (type) => {
        setAppState({ ...appState, pType: type });
        setStandColor('radial-gradient(111.37% 111.37% at 50% 50%, rgba(0, 119, 12, 0.06) 0%, rgba(5, 0, 233, 0) 97.7%)')
        setStandTitleColor('#00ff89')
        setStreamColor('none')
        setStreamTitleColor('none')
    }

    const handleStreamType = (type) => {
        setAppState({ ...appState, pType: type });
        setStandColor('none')
        setStandTitleColor('none')
        setStreamColor('radial-gradient(111.37% 111.37% at 50% 50%, rgba(137, 0, 171, 0.04) 0%, rgba(5, 0, 233, 0) 97.7%)')
        setStreamTitleColor('#e700ff')
    }

    return <Container>
        <Title>Select funding type</Title>
        <Row>
            <Col color={standColor}>
                <Clickable onClick={() => { handleStandType('Standard') }}>
                    <Lottie height={150} width={150} options={animOptions} />
                    <TypeTitle color={standTitleColor}>Standard</TypeTitle>
                </Clickable>
                <TextBox><FaqCard answer={text.a1} point1={text.p11} point2={text.p12} point3={text.p13} point4={text.p14} /></TextBox>
            </Col>
            <Col color={streamColor}>
                <Clickable onClick={() => { handleStreamType('Stream') }}>
                    <Lottie height={150} width={150} options={streamOptions} />
                    <TypeTitle color={streamTitleColor}>Stream</TypeTitle>
                </Clickable>
                <TextBox><FaqCard answer={text.a2} point1={text.p21} point2={text.p22} point3={text.p23} point4={text.p24} /></TextBox>
            </Col>
        </Row>
    </Container>
}

export default ProjectTypeSelection