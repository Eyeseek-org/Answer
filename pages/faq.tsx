import React from 'react'
import styled from 'styled-components'
import type { NextPage } from "next";
import Image from "next/image";

import Eye7 from "../public/Eye7.png";
import Footer from '../sections/Footer'
import SectionTitle from '../components/typography/SectionTitle';
import { BookIcon, DeniedIcon, KeyIcon } from '../components/icons/Common';
import FaqCard from '../components/cards/FaqCard';

const Container = styled.div`
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 7%;
    padding-bottom: 4%;
    gap: 10%;
    border-bottom: 1px solid #262626;;
    @media (max-width: 868px) {
        flex-wrap: wrap;
    }
`

const FaqContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 10% 8% 17%;
`

const Q = styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    text-align: center;
    font-weight: 400;
    font-size: 1em;
    line-height: 43px;
    min-width: 30%;
    color: #B0F6FF;
    @media (max-width: 1168px) {
        line-height: 20px;
    }
`

const ImageBox = styled.div`
        @media (max-width: 968px) {
        display: none;
    }
`

const EyeSevenBox = styled.div`
    margin: 5%;
    text-align: center;
    position: relative;
`;

const texts = {
    "q1": "Why Eyeseek Funding?",
    "a1": "Benefits over other crowdfunding platforms",
    "p11": "Platform fee costs only 1% per successfully funded project",
    "p12": "Developer & Startup friendly environment, we are on the same page",
    "p13": "No personal data needed. Wallet address is your primary identity",
    "p14": "Extends crowdfunding features never seen before",
    "q2": "What do I need as a project owner?",
    "a2": "Rules to follow to be eligible of Eyeseek funding",
    "p21": "Owner has to inform regularly backers with project updates",
    "p22": "Projects must create something to share with others",
    "p23": "Projects and backer statistics must be honest and clearly presented",
    "p24": "Projects can't involve prohibited items",
    "q3": "Why blockchain?",
    "a3": "Benefits over other crowdfunding platforms",
    "p31": "Introduction of the game theory into crowdfunding thanks to the microfunds",
    "p32": "Accept cryptocurrency payments from multiple blockchains at once",
    "p33": "Real-time money streaming from backers to project owners",
    "p34": "Allows rewards in fungible tokens as additional benefit"
}

const Faq: NextPage = () => {
    return <>
        <Container>
            <SectionTitle title="FAQ" subtitle='Learn more about Eyeseek Funding' />
            <FaqContainer>
                <Row>
                    <Q><div>{texts.q1} </div><ImageBox><BookIcon width={150} /></ImageBox> </Q>
                    <FaqCard answer={texts.a1} point1={texts.p11} point2={texts.p12} point3={texts.p13} point4={texts.p14} />
                </Row>
                <Row>
                    <FaqCard answer={texts.a2} point1={texts.p21} point2={texts.p22} point3={texts.p23} point4={texts.p24} />
                    <Q><div>{texts.q2} </div><ImageBox><DeniedIcon width={150} /></ImageBox></Q>
                </Row>
                <Row>
                    <Q><div>{texts.q3} </div><ImageBox><KeyIcon width={70} /></ImageBox> </Q>
                    <FaqCard answer={texts.a3} point1={texts.p31} point2={texts.p32} point3={texts.p33} point4={texts.p34} />
                </Row>
            </FaqContainer>
        </Container>
        <EyeSevenBox>
            <Image src={Eye7} alt="Eye7" width={"400%"} height={"40%"} />
        </EyeSevenBox>
        <Footer />
    </>
}

export default Faq