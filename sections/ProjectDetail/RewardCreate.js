import { useState } from 'react'
import axios from 'axios'
import { TabRow, TooltipBox, IconBox } from "../start_project/SetRewards/StyleWrapper";
import InputContainer from "../../components/form/InputContainer";
import Tab from "../../components/form/Tab";
import Tooltip from "../../components/Tooltip";
import { InfoIcon } from "../../components/icons/Common";
import { Row } from "../../components/format/Row";
import { NextButton } from "../start_project/Category/StyleWrapper";
import { useRouter } from 'next/router';
import {MainMilestoneContainer, MilestoneContainer,MainContainer,RewardContainer } from '../../components/form/InputWrappers'
import SectionTitle from '../../components/typography/SectionTitle';
import ErrText from "../../components/typography/ErrText";
import { moralisApiConfig } from '../../data/moralisApiConfig';
import Subtitle from '../../components/typography/Subtitle';

const RewardCreate = ({objectId, bookmarks}) => {
    const pType = "Standard" // Until stream is implemented
    const [rType, setRType] = useState('Microfund')
    const [tokenType, setTokenType] = useState('Classic')
    const router = useRouter()
    const [tokenTooltip, setTokenTooltip] = useState(false)
    const [microTooltip, setMicroTooltip] = useState(false)
    const [nftTooltip, setNftTooltip] = useState(false)
    const [donationTooltip, setDonationTooltip] = useState(false)
    const [success, setSuccess] = useState(false)

    const [rewardTitle, setRewardTitle] = useState('')
    const [rewardDesc, setRewardDesc] = useState('')
    const [pledge, setPledge] = useState(0)
    const [cap, setCap] = useState(0)
    const [tokenName, setTokenName] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [nftId, setNftId] = useState(0)
    const [nftType, setNftType] = useState(false)
 
    const [apiError, setApiError] = useState(false)
    
    const handleProjectNft = async (oid) => {
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'hasNft': true }, moralisApiConfig) /// This is wrong, rewrite to array
          setApiError(false)
        } catch (error) {
          setApiError(true)
        }
      }

    const handleProjectFungible = async (oid) => {
         try {
           await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'hasFungible': true }, moralisApiConfig) /// This is wrong, rewrite to array
           setApiError(false)
         } catch (error) {
            setApiError(true)
         }
       }

    const handleCreateReward = async () => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward`, {
            "title": rewardTitle,
            "description": rewardDesc,
            "eligibleActual": Number(cap),
            "active": true,
            "type": rType,
            "project": objectId,
            "tokenName": tokenName,
            "tokenAddress": tokenAddress,
            "tokenAmount": Number(tokenAmount),
            "requiredPledge": Number(pledge),
            "nftId": Number(nftId),
            "nftType": nftType
          }, moralisApiConfig)
          setApiError(false)
        } catch (error) {
        setApiError(true)
        }
      }
    
    const handleSubmit = async (oid) => {
        await handleCreateReward()
        if (tokenType === 'ERC20') {
            await handleProjectFungible(oid)
            await handleRewardNotifications('ERC20')
        } else if (tokenType === 'ERC1155') {
            await handleProjectNft(oid)
            await handleRewardNotifications('ERC1155')
        } else if (tokenType === 'Classic') {
            await handleRewardNotifications('Classic')
        }
    }

    // Calculate total tokens 
    // Approval bude potřeba 

    const handleChangeTokenType = async(c) => {
        await setTokenType(c);
        //Clear specific form rows
        if (c === 'Classic'){
            setNftType(false)
            setTokenName('')
            setTokenAddress('')
            setTokenAmount(0)
            setNftId(0)
        } else if (c === 'ERC1155'){
            setNftType(true)
        } else if (c === 'ERC20'){
            setNftType(false)
            setNftId(0)
        }
    }

    const handleRewardNotifications = async (token) => {
        if (bookmarks) {
          bookmarks.forEach(async (bookmark) => {
            await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
              'title': `${token} Reward added`,
              'description': `Project added ${token} reward incentivization.`,
              'type': 'rewardAdded',
              'project': `${objectId}`,
              'user': bookmark
            }, moralisApiConfig)
          })
        }
      }

    return <MainContainer>
        <SectionTitle title='Create new reward' subtitle='Add a new reward to your project' />
        <RewardContainer>
           <TabRow><Tab active={tokenType} o1={'Classic'} o2={'ERC20'} o3={'ERC1155'} change1={() => { handleChangeTokenType('Classic') }} change2={() => {handleChangeTokenType('ERC20')}}  change3={() => {handleChangeTokenType('ERC1155')}} /></TabRow>
            <MainMilestoneContainer>
                <Subtitle text={<>
                    {tokenType === 'Classic' && <>Classic crowdfunding reward</>}
                    {tokenType === 'ERC20' && <>Fungible token reward</>}
                    {tokenType === 'ERC1155' && <>ERC1155 NFT reward</>}
                </>}/>
                <MilestoneContainer>
                    <TabRow> {pType === 'Standard' && <Tab active={rType} o1={'Microfund'} o2={'Donate'} change1={() => { setRType('Microfund') }} change2={() => { setRType('Donate') }} />}
                        <TooltipBox>
                            {microTooltip && <Tooltip text={'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'} />}
                            {donationTooltip && <Tooltip text={'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'} />}
                            {nftTooltip && <Tooltip text={'TBD Nft tooltip'}/>}
                            {tokenTooltip &&  <Tooltip text={'Tooltip TBD'} />}
                        </TooltipBox>
                    </TabRow>
                    <InputContainer
                        label={'Title'}
                        placeholder={'Godspeed'}
                        description={'Create a unique title for your reward'}
                        onChange={(e) => setRewardTitle(e.target.value)}
                        type={'text'}
                    />
                    <InputContainer
                        label={'Description'}
                        placeholder={'Backer receives autographed copy of the book'}
                        description={'Describe what backer receives for this reward'}
                        onChange={(e) => setRewardDesc(e.target.value)}
                        type={'textArea'}
                    />
                    {rType === 'Microfund' && <InputContainer
                        label={'Amount'}
                        placeholder={'1000'}
                        onChange={(e) => setPledge(e.target.value)}
                        description={
                            <Row>Microfund cap amount per backer
                                <IconBox onMouseEnter={() => setMicroTooltip(true)} onMouseLeave={() => setMicroTooltip(false)}>
                                    <InfoIcon width={15} />
                                </IconBox>
                            </Row>}
                        type={'number'}
                    />}
                    {rType === 'Donate' && <InputContainer
                        label={'Amount'}
                        placeholder={'1000'}
                        onChange={(e) => setPledge(e.target.value)}
                        description={
                            <Row>Donation mount to receive this reward
                                <IconBox onMouseEnter={() => setDonationTooltip(true)} onMouseLeave={() => setDonationTooltip(false)}>
                                    <InfoIcon width={15} />
                                </IconBox>
                            </Row>}
                        type={'number'}
                    />}
                    <InputContainer
                        label={'Capacity'}
                        placeholder={'10'}
                        description={'How many rewards could be claimed in this edition'}
                        onChange={(e) => setCap(e.target.value)}
                        type={'number'}
                    />
                   {tokenType !== 'Classic' &&   <InputContainer
                        label={'Token name'}
                        placeholder={'EYE'}
                        description={'Symbol/Name of the reward token you will offer to backers'}
                        onChange={(e) => setTokenName(e.target.value)}
                        type={'text'}
                    />}
                   {tokenType !== 'Classic'  && <InputContainer
                        label={'Token address'}
                        placeholder={process.env.NEXT_PUBLIC_AD_TOKEN}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        description={'Contract address of the locked token'}
                        type={'text'}
                    />}
                    {tokenType === 'ERC20' && <InputContainer
                        label={'Amount/Backer'}
                        placeholder={'1000000'}
                        onChange={(e) => setTokenAmount(e.target.value)}
                        description={<>        
                        <IconBox onMouseEnter={() => setTokenTooltip(true)} onMouseLeave={() => setTokenTooltip(false)}>
                        Amount of tokens eligible for reward for each backer <InfoIcon width={15} />
                        </IconBox></>}
                        type={'number'}
                    />}
                    {tokenType === 'ERC1155' && <InputContainer
                        label={'Token ID'}
                        placeholder={'1561891981'}
                        onChange={(e) => setNftId(e.target.value)}
                        description={<>        
                        <IconBox onMouseEnter={() => setNftTooltip(true)} onMouseLeave={() => setNftTooltip(false)}>
                          Nft tooltip <InfoIcon width={15} />
                        </IconBox></>}
                        type={'number'}
                    />}
                    {apiError && <ErrText>Not all fields filled correctly</ErrText>}
                    {!success && !apiError && <NextButton onClick={()=>{handleSubmit(objectId)}}>Create reward</NextButton>}
                    {apiError && <NextButton onClick={()=>{handleSubmit(objectId)}}>Error: Check your fields and retry</NextButton>}
                    {success && <NextButton onClick={() => router.push('/')}>Success: Back to the overview</NextButton>}
                </MilestoneContainer>
            </MainMilestoneContainer>
        </RewardContainer>
    </MainContainer>
}

export default RewardCreate