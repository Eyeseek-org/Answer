import { useState } from "react";
import { useApp } from "../../utils/appContext";
import Lottie from "react-lottie";
import Image from "next/image";
import { usePrepareContractWrite, useContractEvent, useContractWrite, useNetwork, useAccount } from "wagmi";
import axios from "axios";
import Link from "next/link";


import SectionTitle from "../../../components/typography/SectionTitle";
import { ButtonRow } from "../SetRewards/StyleWrapper";
import { MainContainer, NextButton, ErrButton } from "../Category/StyleWrapper";
import { RulesContainer, RulesTitle, WarningBox, Li, Row, ImageBox, Ok, TxStatus, LogRow, Ref, Summary, AnimBox, Err, InfoTag, SumItem, SumTitle, SumValue, SumHalf, SumRow, SumHead, EyeBox } from "./StyleWrapper";
import FaqCard from "../../../components/cards/FaqCard";
import { BookIcon } from "../../../components/icons/Common";
import donation from '../../../abi/donation.json'
import successAnimation from '../../../data/successAnimation.json'
import errorAnimation from '../../../data/errorAnimation.json'
import smallLoading from '../../../data/smallLoading.json'
import Eye10 from '../../../public/Eye10.png'
import Rainbow from "../../../components/buttons/Rainbow";


// Animation configs 
const okAnim = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const errAnim = {
    loop: false,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const loadingAnim = {
    loop: true,
    autoplay: true,
    animationData: smallLoading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


const texts = {
    title: 'Rules to follow to be eligible of Eyeseek funding',
    p1: "Owner has to inform regularly backers with project updates",
    p2: "Projects must create something to share with others",
    p3: "Projects and backer statistics must be honest and clearly presented",
    p4: "Projects can't involve prohibited items",
}

const Create = ({ setStep }) => {
    const { appState } = useApp();
    const { address, isDisconnected } = useAccount()
    const {chain} = useNetwork();
    const { pTitle, pDesc, category, subcategory, pm1, pType, rewards, pImageUrl, tokenReward } = appState;
    const [ev, setEv] = useState(false)
    const [apiError, setApiError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [oid, setOid] = useState(null)

    const handleBack = () => {
        setStep((prev) => (prev -= 1));
    }

    const moralisHeaders = {
        headers: {
            "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
            "Content-Type": "application/json"
        }
    }

    // Update project with PID retrieved from blockchain
    const handleUpdateMoralis = async (pid) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, {
                "pid": pid,
                "state": 1 // Set active
            }, moralisHeaders)
            setSuccess(true)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    // Event upon successful project creation on blockchain
    // 1. Update state and project id (pid) as key between web2/web3
    // 2. Activate rewards in the db
    const useEv = (event) => {
        if (Array.isArray(event) && event[2]) {
            const pid = parseInt(event[2]);
            handleUpdateMoralis(pid);
            handleRewards()
            handleTokenReward()
        }
        setEv(true);
    }

    const { config, isError } = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'createFund',
        chain: 80001,
        args: [pm1, '0x2107B0F3bB0ccc1CcCA94d641c0E2AB61D5b8F3E', tokenReward.amount],
    })

    const { write } = useContractWrite(config)

    const handleContract = async () => { write?.() }

    const handleRewards = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward`, {
                "project": oid,
                "tokenName": tokenReward.name,
                "tokenAddress": tokenReward.address,
                "tokenAmount": tokenReward.amount,
                "title": rewards[0].title,
                "description": rewards[0].description,
                "cap": rewards[0].cap,
                "type": rewards[0].type,
                "active": true
            }, moralisHeaders)
            setSuccess(true)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const handleTokenReward = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/TokenReward`, {
                "project": oid,
                "tokenName": tokenReward.name,
                "tokenAddress": tokenReward.address,
                "tokenAmount": tokenReward.amount,
            }, moralisHeaders)
            setSuccess(true)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const handleMoralis = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project`, {
                "title": pTitle,
                "description": pDesc,
                "category": category,
                "subcategory": subcategory,
                "type": pType,
                "owner": address,
                "state": 0, // Always 0 for new projects
                "chain": chain.name,
                "bookmarks": [address], // Add owner to bookmark
                "rewards": rewards,
                "imageUrl": pImageUrl
            }, moralisHeaders)
            setOid(res.data.objectId)
            setSuccess(true)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const handleSubmit = async () => {
        await handleContract()
        await handleMoralis()
    }

    useContractEvent({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        eventName: 'FundCreated',
        listener: (event) => useEv(event),
        once: true
    })

    // TBD Array with rewards -> Push to the DB
    // Needed to lock user on screen until this is done

    return (
        <MainContainer>
            <SectionTitle title='Create project' subtitle='Meet crowdfunding rules' />
            <RulesContainer>
                {chain && !chain.name === 'Mumbai' && <>Go to Mumbai</>}
                <RulesTitle>Conditions and rules</RulesTitle>
                <WarningBox>
                    <Li>If any of your goals are not met in 30 days of crowdfunding period, collected resources will be returned back to the backers. No fees will be collected by Eyeseek.</Li>
                    <Li>If your project is sucessfully funded, Eyeseek will collect 1% fee from the funding total.</Li>
                    <Row>
                        <ImageBox><BookIcon width={150} /></ImageBox>
                        <FaqCard answer={texts.title} point1={texts.p1} point2={texts.p2} point3={texts.p3} point4={texts.p4} />
                    </Row>
                </WarningBox>
                {address ? 
                <Summary>
                    <SumHead>Summary</SumHead>
                  <SumRow>
                    <SumHalf align={'left'}>
                        <SumItem><SumTitle>Title</SumTitle><SumValue>{pTitle}</SumValue></SumItem>
                        <SumItem><SumTitle>Category</SumTitle><SumValue>{category}-{subcategory}</SumValue></SumItem>
                        <SumItem><SumTitle>Destimation chain</SumTitle><SumValue>Mumbai</SumValue></SumItem>
                        <SumItem><SumTitle>Funding goal</SumTitle><SumValue>{pm1} USDC</SumValue></SumItem>
                        <SumItem><SumTitle>Owner</SumTitle><SumValue> {address}</SumValue></SumItem>
                    </SumHalf>
                    <EyeBox><Image src={Eye10} alt='Eye' width={'200px'}  height={'150px'}/> </EyeBox>
                    <SumHalf align={'right'}>
                        <SumItem><SumTitle>Reward #1</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount} x{rewards[0].cap}</SumValue></SumItem>
                        {rewards.length >= 2 && <SumItem><SumTitle>Reward #2</SumTitle><SumValue>{rewards[1].title} - ${rewards[1].amount} x{rewards[1].cap}</SumValue></SumItem>}
                        {rewards.length >= 3 && <SumItem><SumTitle>Reward #3</SumTitle><SumValue>{rewards[2].title} - ${rewards[2].amount} x{rewards[2].cap}</SumValue></SumItem>}
                        {rewards.length >= 4 && <SumItem><SumTitle>Reward #4</SumTitle><SumValue>{rewards[3].title} - ${rewards[3].amount} x{rewards[3].cap}</SumValue></SumItem>}
                        {rewards.length == 5 && <SumItem><SumTitle>Reward #5</SumTitle><SumValue>{rewards[4].title} - ${rewards[4].amount} x{rewards[4].cap}</SumValue></SumItem>}
                    </SumHalf>   
                    </SumRow>
                </Summary> : <Rainbow/>}
                {!success ? <ButtonRow>
                    <NextButton onClick={handleBack}>Back</NextButton>
                    {isDisconnected ? <ErrButton>Chain error</ErrButton> : <NextButton disabled={!write} onClick={handleSubmit}>Create project</NextButton>}
                </ButtonRow> :
                    <TxStatus>Transaction status
                        <LogRow><InfoTag>Info</InfoTag> Project was initiated</LogRow>
                        <LogRow><InfoTag>Info</InfoTag> ...Waiting for blockchain confirmation</LogRow>
                        {!ev && <LogRow>Please stay on page until transactions is confirmed</LogRow>}
                        <LogRow><div>Blockchain status:</div>
                            {ev && <Ok>Success: Transaction was processed</Ok>} {apiError && <Err>Failed: Transaction failed on chain</Err>}
                        </LogRow>
                        {ev && <LogRow><InfoTag>Info</InfoTag> Your project is created on <Link href={`/project/${oid}`}><Ref> this page</Ref></Link></LogRow>}
                        {ev && <AnimBox><Lottie height={100} width={100} options={okAnim} /></AnimBox>}
                        {apiError && <AnimBox><Lottie height={100} width={100} options={errAnim} /></AnimBox>}
                        {!ev && !apiError && <AnimBox><Lottie height={100} width={100} options={loadingAnim} /></AnimBox>}
                    </TxStatus>}
                {apiError  && <Err>Transaction failed, please contact support team to make it work</Err>}
                {isError && <Err>Smart contract error, check if all your data inputs are valid</Err>}
            </RulesContainer>
        </MainContainer>
    );
};

export default Create;
