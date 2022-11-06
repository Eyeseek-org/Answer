import Image from "next/image"
import styled from "styled-components"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContractWrite, useContractEvent, usePrepareContractWrite, useAccount, useNetwork } from 'wagmi'

import Tag from "../../components/typography/Tag"
import SectionTitle from "../../components/typography/SectionTitle"
import ErrText from '../../components/typography/ErrText'
import ImgSkeleton from "../../components/skeletons/ImgSkeleton"
import { CancelIcon, VerifiedIcon, NonVerifiedIcon} from '../../components/icons/Common'
import Tooltip from '../../components/Tooltip'
import { CanceledTypo } from '../../components/icons/Typography'
import donation from '../../abi/donation.json'
import ProjectDetailRight from "./ProjectDetailRight"
import { BlockchainIcon, StreamIcon } from "../../components/icons/Landing"
import { GetFundingAddress } from "../../components/functional/GetContractAddress"
import { moralisApiConfig } from "../../data/moralisApiConfig"
import polygon from "../../public/icons/donate/polygon.png"
import bnb from "../../public/icons/donate/bnb.png"
import ftm from "../../public/icons/donate/ftm.png"


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
  @media (min-width: 2100px){
    margin-left: 25%;
      margin-right: 25%;
    }
`

const AbsoluteBox = styled.div`
  position: absolute;
  left: -20px;
  top: -30px;
  z-index: 1;
`

const ProjectType = styled.div`
  position: absolute;
  left: -20px;
  font-family: 'Neucha';
  top: 0;
  display: flex;
  flex-direction: column;
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
  position: relative;
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

const LeftTopTooltip = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const ProjectDetail = ({ objectId, pid, title, description, category, subcategory, imageUrl, bookmarks, verified, state, pType, owner, chainId }) => {
  const {address} = useAccount()
  const [cancelTooltip, setCancelTooltip] = useState(false)
  const [verifiedTooltip, setVerifiedTooltip] = useState(false)
  const [nonVerifiedTooltip, setNonVerifiedTooltip] = useState(false)
  const [streamTypeTooltip, setStreamTypeTooltip] = useState(false)
  const [standardTypeTooltip, setStandardTypeTooltip] = useState(false)
  const [chainTooltip, setChainTooltip] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const [apiError, setApiError] = useState(false)

  const {chain} = useNetwork()
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR)

  useEffect(() => {
    setAdd(GetFundingAddress(chain))
  },[])

  const { config } = usePrepareContractWrite({
    addressOrName: add,
    contractInterface: donation.abi,
    functionName: 'cancelFund',
    args: [pid],
  })


  const { write } = useContractWrite(config)

  /// TBD create before the cancellation event is confirmed

  const useEv = async(e) => {
    await cancelMoralis(objectId);
    await handleCancelNotifications();
    console.log(e)
  }

  useContractEvent({
    addressOrName: add,
    contractInterface: donation.abi,
    eventName: 'Cancelled',
    listener: () => useEv(e),
    once: true
  })

  const cancel = async () => {
    await write?.()
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
      await setCanceled(true);
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  return  <>
    <Container>
      {apiError && <ErrText text={'Error with Moralis connection, please try again later'} />}
      <DetailBox>
        <LeftTopTooltip>
          {verifiedTooltip && <Tooltip text={'Verified by Eyeseek team'} />}
          {nonVerifiedTooltip && <Tooltip text={'Project not verified'} />}
          {standardTypeTooltip && <Tooltip text={'Funding type: Standard crowdfunnding'} />}
          {streamTypeTooltip && <Tooltip text={'Funding type: Money streaming'} />}
          {chainTooltip && <Tooltip text={<>Project chain: 
            {chainId === 80001 && <> Polygon Mumbai</>}
            {chainId === 97 && <> BNB Chain testnet</>}
            {chainId === 4002 && <> Fantom testnet</>}
          </>} />}
        </LeftTopTooltip>
        <ProjectType>
          {verified  ? 
              <IconWrapper onMouseEnter={() => { setVerifiedTooltip(true) }} onMouseLeave={() => { setVerifiedTooltip(false) }}><VerifiedIcon width={30} height={30} /></IconWrapper> :
              <IconWrapper onMouseEnter={() => { setNonVerifiedTooltip(true) }} onMouseLeave={() => { setNonVerifiedTooltip(false) }}><NonVerifiedIcon width={70} height={70} /></IconWrapper>
            }
          {pType === 'Stream' ? 
            <IconWrapper onMouseEnter={() => { setStreamTypeTooltip(true) }} onMouseLeave={() => { setStreamTypeTooltip(false) }}>
              <StreamIcon width={30} />
            </IconWrapper> : 
            <IconWrapper onMouseEnter={() => { setStandardTypeTooltip(true) }} onMouseLeave={() => { setStandardTypeTooltip(false) }}>
              <BlockchainIcon width={30} />
            </IconWrapper>
          }
          <IconWrapper onMouseEnter={() => { setChainTooltip(true) }} onMouseLeave={() => { setChainTooltip(false) }}>
            {chainId === 80001 && <><Image src={polygon} alt={'matic'} width={30} height={30}/> </>}
            {chainId === 97 && <><Image src={bnb} alt={'bnb'} width={30} height={30}/></>}
            {chainId === 4002 && <><Image src={ftm} alt={'ftm'} width={20} height={30}/></>}
          </IconWrapper>
        </ProjectType>
   
        {canceled && <CanceledBox><CanceledTypo width={400} /></CanceledBox>}
        {address === owner && <ActionPanel>
          {cancelTooltip && <Tooltip margin={'25px'} text='Cancel project' />}
              <IconWrapper onClick={()=>{cancel()}} onMouseEnter={() => { setCancelTooltip(true) }} onMouseLeave={() => { setCancelTooltip(false) }}>
                <CancelIcon width={30} />
              </IconWrapper>
        </ActionPanel>}
        <LeftPart>
          {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} layout='fill' />}
          <Categories>
            {category && <Tag tag={category} color={"#000850"} />}
            {subcategory && <Tag tag={subcategory} color={"#035201"} />}
          </Categories>
          <Desc>{description}</Desc>
        </LeftPart>
        {state === 4 ? <Inactive>Inactive</Inactive> : <ProjectDetailRight pid={pid} objectId={objectId} bookmarks={bookmarks} pType={pType} owner={owner} add={add} chainId={chainId}/> }
      </DetailBox>
    </Container>
  </>
}

export default ProjectDetail