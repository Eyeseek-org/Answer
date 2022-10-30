import Image from "next/image"
import styled from "styled-components"
import { useState, Suspense } from 'react'
import axios from 'axios'

import Tag from "../../components/typography/Tag"
import SectionTitle from "../../components/typography/SectionTitle"
import ImgSkeleton from "../../components/skeletons/ImgSkeleton"
import { CancelIcon, VerifiedIcon, RewardIcon, UpdateSvg } from '../../components/icons/Common'
import Tooltip from '../../components/Tooltip'
import { CanceledTypo } from '../../components/icons/Typography'
import dynamic from 'next/dynamic'
import donation from '../../abi/donation.json'
import { useContractWrite, useNetwork, useContractEvent, usePrepareContractWrite } from 'wagmi'
import UpdateCreate from './UpdateCreate'
import { useMoralisFile } from "react-moralis"

const RewardCreate = dynamic(() => import('./RewardCreate'), {
  suspense: false,
})

const UpdateOverview = dynamic(() => import('./UpdateOverview'), {
  suspense: false,
})

const RewardList = dynamic(() => import('./RewardList'), {
  suspense: false,
})

const ProjectDetailRight = dynamic(() => import('./ProjectDetailRight'), {
  suspense: false,
})

const Container = styled.div`
  position: relative;
  margin-top: 5%;
`

const DetailBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid #2f2f2f;
  padding: 3%;
  padding-left: 5%;
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 1%;
    padding: 1%;
  }
`

const AbsoluteBox = styled.div`
  position: absolute;
  left: -20px;
  top: -30px;
  z-index: 1;
`

const Categories = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const Desc = styled.div`
  margin-top: 2%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 1em;
  line-height: 20px;
  color: #ffffff;
`

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`

const ActionPanel = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute; 
  right: 0;
  top: -70px;
  right: 4%;
`

const IconWrapper = styled.button`
  position: relative;
  background: inherit;
  border: none;
  padding-left: 10px;
  margin-left: 10px;
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
`

const CanceledBox = styled.div`
  position: absolute;
  z-index: 1;
  top: -25%;
  right: 0;
  @media (max-width: 1068px) {
    top: 25%;
  }
`

const Inactive = styled.div`
  position: absolute;
  display: flex;
  font-size: 2em;
  font-family: 'Neucha';
  color: #d90000;
`

// @param "my" indicates whether component visualized in context of MyProjects or Landing page
const ProjectDetail = ({ objectId, pid, title, description, category, subcategory, imageUrl, bookmarks, verified, my, state }) => {
  const [cancelTooltip, setCancelTooltip] = useState(false)
  const [verifiedTooltip, setVerifiedTooltip] = useState(false)
  const [rewardTooltip, setRewardTooltip] = useState(false)
  const [updateTooltip, setUpdateTooltip] = useState(false)
  const [mode, setMode] = useState('Overview')
  const [nonVerifiedTooltip, setNonVerifiedTooltip] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const [error, setError] = useState(false)
  const { chain } = useNetwork()

  console.log(imageUrl)


  // TBD add prepare contract write - To make blockchain part work
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    functionName: 'cancelFund',
    args: [pid],
  })

  const moralisApiConfig = {
    headers: {
      "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      "Content-Type": "application/json"
    }
  }

  const {isError, isLoading, write } = useContractWrite(config)

  /// TBD create before the cancellation event is confirmed

  const useEv = (e) => {
    handleCancelNotifications();
    setCanceled(true);
  }

  useContractEvent({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    eventName: 'Cancelled',
    listener: () => useEv(e),
    once: true
  })

  const cancel = async (oid) => {
    write?.()
    await cancelMoralis(oid);
  }

  const handleCancelNotifications = async () => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
          'title': 'Project Canceled',
          'description': `Project ${title} was cancelled before the deadline by the owner. All resources were refunded to the backers.`,
          'type': 'projectCanceled',
          'user': bookmark
        }, moralisApiConfig)
      })
    }
  }

  const cancelMoralis = async (oid) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'state': 4 }, moralisApiConfig)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return  <Suspense fallback={`...`}>
    <Container>
      {my ? <SectionTitle title={'Active project'} subtitle={title} /> : <SectionTitle title={"Project detail"} subtitle={title} />}
    {mode === 'Overview' ? <DetailBox>
        {verifiedTooltip && <Tooltip text={'Verified by Eyeseek team'} />}
        {nonVerifiedTooltip && <Tooltip text={'Not verified'} />}
        <AbsoluteBox>
          {verified ?
            <div onMouseEnter={() => { setVerifiedTooltip(true) }} onMouseLeave={() => { setVerifiedTooltip(false) }}><VerifiedIcon width={70} /></div> :
            <></>
          }
          {isError && <>Error</>}</AbsoluteBox>
        {canceled && <CanceledBox><CanceledTypo width={400} /></CanceledBox>}
        {my && <ActionPanel>
          {cancelTooltip && <Tooltip margin={'25px'} text='Cancel project' />}
          {rewardTooltip && <Tooltip margin={'25px'} text='Add project reward' />}
          {updateTooltip && <Tooltip margin={'25px'} text='Send project update to users' />}
          <IconWrapper onClick={() => { setMode('Update') }} onMouseEnter={() => { setUpdateTooltip(true) }} onMouseLeave={() => {setUpdateTooltip(false)}}><UpdateSvg width={75} /></IconWrapper>
          <IconWrapper onClick={() => { setMode('Reward') }} onMouseEnter={() => { setRewardTooltip(true) }} onMouseLeave={() => {setRewardTooltip(false)}}><RewardIcon width={25} /></IconWrapper>
          {!canceled && !isLoading ? <>
            {chain && chain.name === 'Mumbai' ?
              <IconWrapper onClick={() => { cancel(objectId, pid) }} onMouseEnter={() => { setCancelTooltip(true) }} onMouseLeave={() => { setCancelTooltip(false) }}>
                <CancelIcon width={30} />
              </IconWrapper> :
              <IconWrapper onMouseEnter={() => { setCancelTooltip(true) }} onMouseLeave={() => { setCancelTooltip(false) }}>
                {cancelTooltip && <Tooltip text='Switch to Mumbai' />}
                <CancelIcon width={30} />
              </IconWrapper>
            }</> : <></>}
        </ActionPanel>}
        <LeftPart>
          {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={500} height={500} />}
          <Categories>
            {category && <Tag tag={category} color={"#000850"} />}
            {subcategory && <Tag tag={subcategory} color={"#035201"} />}
          </Categories>
          <Desc>{description}</Desc>
        </LeftPart>
        {state === 1 ? <ProjectDetailRight pid={pid} objectId={objectId} bookmarks={bookmarks} /> : <Inactive>Inactive</Inactive>}
        <RewardList/>
      </DetailBox> : null}
      {mode === 'Reward' && <RewardCreate objectId={objectId} bookmarks={bookmarks} title={title}/>}
      {mode === 'Update' && <UpdateCreate objectId={objectId} bookmarks={bookmarks} title={title}/>}
    </Container>
  <UpdateOverview objectId={objectId}/>
  </Suspense>
}

export default ProjectDetail