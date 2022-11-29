import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import {useAccount, useContractEvent} from 'wagmi'
import { useReward } from '../utils/rewardContext';
import { RewardDesc, TabRow } from "../start_project/Styles";
import donation from "../../abi/donation.json"
import Tab from "../../components/form/Tab";
import { BetweenRow } from "../../components/format/Row";
import {MainMilestoneContainer, MilestoneContainer,MainContainer,RewardContainer } from '../../components/form/InputWrappers'
import ErrText from "../../components/typography/ErrText";
import { moralisApiConfig } from '../../data/moralisApiConfig';
import Subtitle from '../../components/typography/Subtitle';
import RewardNftSubmit from './RewardNftSubmit';
import RewardTokenSubmit from './RewardTokenSubmit';
import RewardClassicSubmit from './RewardClassicSubmit';
import RewardFormToken from './RewardFormToken';
import RewardFormNft from './RewardFormNft';
import RewardFormClassic from './RewardFormClassic';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { SumRow, SumTitle } from '../start_project/StylesCreate';
import SuccessDisButton from '../../components/buttons/SuccessDisButton';
import Amount from '../../components/functional/Amount';
import { G } from '../../components/typography/ColoredTexts';
import Socials from '../../components/buttons/Socials';
import TabImage from '../../components/form/TabImage';

const Summary = styled.div`
    margin-top: 1%;
    padding-top: 1%;
    border-top: 1px solid #E5E5E5;
    display: flex;
    flex-direction: column;
    width: 50%;
    @media (max-width: 768px) {
        width: 100%;
    }
`

const DescBox = styled.div`
    display: flex;
    margin-left: 10%;
`

const RewardCreate = ({objectId, bookmarks, home, pid, owner}) => {
    const pType = "Standard" // Until stream is implemented
    const [dType, setdType] = useState('Microfund')
    const [tokenType, setTokenType] = useState('Classic')
    const [success, setSuccess] = useState(false)
    const {address} = useAccount()

    const { rewardState, setRewardState } = useReward();
    const { title, desc, pledge, cap, tokenName, tokenAddress, tokenAmount, nftId } = rewardState;
    const [rewardId, setRewardId] = useState(0)
 
    const [apiError, setApiError] = useState(false)

    const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);

    useEffect (() => {
        setAdd(GetProjectFundingAddress(home))
    },[])

    useContractEvent({
        address: add,
        abi: donation.abi,
        eventName: 'RewardCreated',
        listener: (event) => listened(event),
        once: false
      })

    const listened = async(event) => {
        const parse = parseInt(event)
        await setRewardId(parse + 1)
        await handleSaveReward(objectId)
      }    

    const handleCreateReward = async (rType, n) => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward`, {
            "title": title,
            "description": desc,
            "eligibleActual": Number(cap),
            "cap": Number(cap),
            "active": true,
            "type": dType,
            "project": objectId,
            "tokenName": n,
            "tokenAddress": tokenAddress,
            "tokenAmount": Number(tokenAmount),
            "requiredPledge": Number(pledge),
            "nftId": Number(nftId),
            "rType": rType,
            "rewardId": rewardId,
            "owner": address,
            "donors": []
          }, moralisApiConfig)
        
          await setApiError(false)
          setSuccess(true)
        } catch (error) {
            setApiError(true)
        }
      }
    
    const handleSaveReward = async () => {
        if (tokenType === 'ERC20') {
            await handleCreateReward(1,'')
            await handleRewardNotifications('ERC20')
        } else if (tokenType === 'ERC1155') {
            await handleCreateReward(2,tokenName)
            await handleRewardNotifications('ERC1155')
        } else if (tokenType === 'Classic') {
            await handleCreateReward(0,tokenName)
            await handleRewardNotifications('Classic')
        }
    }

    const handleChangeTokenType = async(c) => {
        await setTokenType(c);
        //Clear specific form rows
        if (c === 'Classic'){
            setRewardState({ ...rewardState, tokenAddress: '', nftId: 0, tokenAmount: 0 })
        } else if (c === 'ERC1155'){
            console.log('NFT transmission')
        } else if (c === 'ERC20'){
            setRewardState({ ...rewardState, nftId: 0 })
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
        <RewardContainer>
         <Subtitle text='Create new Reward' />
            <MainMilestoneContainer>
            {!success && !apiError && <>
                <BetweenRow>
                    <Subtitle text={<>
                        {tokenType === 'Classic' && address === owner ? <>Classic crowdfunding reward</> : <>Unable to create this reward type</>}
                        {tokenType === 'ERC20' && <>Fungible token reward</>}
                        {tokenType === 'ERC1155' && <>ERC1155 NFT reward</>}
                    </>}/>
                    <TabRow><TabImage active={tokenType} o1={'Classic'} o2={'ERC20'} o3={'ERC1155'} 
                        change1={() => { handleChangeTokenType('Classic') }} 
                        change2={() => {handleChangeTokenType('ERC20')}}  
                        change3={() => {handleChangeTokenType('ERC1155')}} />
                    </TabRow>
                </BetweenRow>
                <MilestoneContainer>
                    <TabRow> 
                        {pType === 'Standard' && <Tab active={dType} o1={'Microfund'} o2={'Donate'} change1={() => { setdType('Microfund') }} change2={() => { setdType('Donate') }} />}
                        <DescBox>
                            {dType === 'Microfund' && <RewardDesc>Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.</RewardDesc>}
                            {dType === 'Donate' && <RewardDesc>Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.</RewardDesc>}
                        </DescBox>
                    </TabRow>
                        {tokenType === 'ERC20' && <RewardFormToken dType={dType}/>}
                        {tokenType === 'ERC1155' && <RewardFormNft dType={dType}/>}
                        {tokenType === 'Classic' && address === owner && <RewardFormClassic dType={dType}/>}
                    <Summary>
                        {dType === 'Donate' && <SumRow><SumTitle>You will receive if fully claimed =  <b>$<Amount value={Number(cap)*Number(pledge)}/></b></SumTitle></SumRow>}
                        {dType === 'Microfund' && <SumRow><SumTitle>Microfund impact on final collected amount is never same</SumTitle></SumRow>}
                        {tokenType === 'ERC20' && <SumRow><SumTitle>Number of ERC20 you have to lock = <b>$<Amount value={Number(cap)*Number(tokenAmount)}/></b></SumTitle></SumRow>}
                    </Summary>
                {cap > 0 ?  <> 
                    {tokenType === 'ERC1155' && <RewardNftSubmit home={home} pid={pid} cap={cap} tokenAddress={tokenAddress} nftId={nftId} add={add} pledge={pledge}/>}
                    {tokenType === 'ERC20' && <RewardTokenSubmit home={home} pid={pid} cap={cap} tokenAddress={tokenAddress} add={add} pledge={pledge} tokenAmount={tokenAmount}/>}
                    {tokenType === 'Classic' && address === owner && <RewardClassicSubmit home={home} pid={pid} cap={cap} add={add} />}
                    {apiError && <ErrText text='Not all fields filled correctly'/>}
                    </> : <ErrText text="All fields are mandatory"/>}
                </MilestoneContainer>
                 </>}
                {success && !apiError &&    <>     
                        <G>Great job!! Now expose yourself and share it {`:)`}</G>
                        <Socials title={'I have added some juice rewards for participation in this crowdfunding project, check it out!!!'}/>
                        <SuccessDisButton onClick={()=>{setSuccess(false)}} width={'100%'} text="Success: Reward was created (click for new reward)"/>
                    </>}
            </MainMilestoneContainer>
        </RewardContainer>
    </MainContainer>
}

export default RewardCreate
