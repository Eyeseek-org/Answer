import { useState } from "react";
import { useApp } from "../../utils/appContext";
import { useAccount } from 'wagmi';
import Lottie from "react-lottie";
import Image from "next/image";
import { usePrepareContractWrite, useContractEvent, useContractWrite, useNetwork } from "wagmi";
import axios from "axios";
import Link from "next/link";


import SectionTitle from "../../../components/typography/SectionTitle";
import { ButtonRow } from "../SetRewards/StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import { RulesContainer, RulesTitle, WarningBox, Li, Row, ImageBox, Ok, TxStatus, LogRow, Ref, Summary, AnimBox, Err, InfoTag, SumItem, SumTitle, SumValue, SumHalf, SumRow, SumHead, EyeBox } from "./StyleWrapper";
import FaqCard from "../../../components/cards/FaqCard";
import { BookIcon } from "../../../components/icons/Common";
import donation from '../../../abi/donation.json'
import successAnimation from '../../../data/successAnimation.json'
import errorAnimation from '../../../data/errorAnimation.json'
import smallLoading from '../../../data/smallLoading.json'
import Eye10 from '../../../public/Eye10.png'


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
    const { pTitle, pDesc, category, subcategory, pm1, pType,rewards, pImageUrl } = appState;
    const [ev, setEv] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [oid, setOid] = useState(null)

    const handleBack = () => {
        setStep((prev) => (prev -= 1));
    }

    console.log(rewards)

    // Blockchain specific
    // TBD thrid value from event object is the PID, need to parse it from it and transform to a number
    const { address, isDisconnected } = useAccount()
    const { chain } = useNetwork()
    const useEv = (event) => { 
        setEv(true) 
        console.log(event)
    }


    const { config } = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'createFund',
        args: [pm1],
    })

    const { write } = useContractWrite(config)

    const handleContract = async () => { write?.() }

    const handleMoralis = async () => {
        const head = {
            headers: {
                "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project`, {
                "title": pTitle,
                "description": pDesc,
                "category": category,
                "subcategory": subcategory,
                "type": pType,
                "owner": address,
                "state": 0, // Always 0 for new projects
                "chain": "mumbai",
                "bookmarks": [address], // Add owner to bookmark
                "rewards": rewards,
                "imageUrl": pImageUrl
            }, head)
            setOid(res.data.objectId)
            setSuccess(true)
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true)
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
    // Take PID from the event and PUT Moralis API with the update
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
                        <SumItem><SumTitle>Reward #1</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount}</SumValue></SumItem>
                        {rewards.length >= 1 && <SumItem><SumTitle>Reward #2</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount}</SumValue></SumItem>}
                        {rewards.length >= 1 && <SumItem><SumTitle>Reward #3</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount}</SumValue></SumItem>}
                        {rewards.length >= 1 && <SumItem><SumTitle>Reward #4</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount}</SumValue></SumItem>}
                        {rewards.length >= 1 && <SumItem><SumTitle>Reward #5</SumTitle><SumValue>{rewards[0].title} - ${rewards[0].amount}</SumValue></SumItem>}
                    </SumHalf>   
                    </SumRow>
                </Summary> : <div>Please connect your wallet</div>}
                {!success ? <ButtonRow>
                    <NextButton onClick={handleBack}>Back</NextButton>
                    {!isDisconnected ? <NextButton onClick={handleSubmit} disabled={!write}>Create project</NextButton> : <button>Connect</button>}
                </ButtonRow> :
                    <TxStatus>Transaction status
                        <LogRow><InfoTag>Info</InfoTag> Project was initiated</LogRow>
                        <LogRow><InfoTag>Info</InfoTag> ...Waiting for blockchain confirmation</LogRow>
                        {!ev && <LogRow>Please stay on page until transactions is confirmed</LogRow>}
                        <LogRow><div>Blockchain status:</div>
                            {ev && <Ok>Success: Transaction was processed</Ok>} {error && <Err>Failed: Transaction failed on chain</Err>}
                        </LogRow>
                        {ev && <LogRow><InfoTag>Info</InfoTag> Your project is created on <Link href={`/project/${oid}`}><Ref> this page</Ref></Link></LogRow>}
                        {ev && <AnimBox><Lottie height={100} width={100} options={okAnim} /></AnimBox>}
                        {error && <AnimBox><Lottie height={100} width={100} options={errAnim} /></AnimBox>}
                        {!ev && !error && <AnimBox><Lottie height={100} width={100} options={loadingAnim} /></AnimBox>}
                    </TxStatus>}
                {error  && <Err>Transaction failed, please contact support team to make it work</Err>}
            </RulesContainer>
        </MainContainer>
    );
};

export default Create;
