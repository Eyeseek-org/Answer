import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import ImgSkeleton from '../skeletons/ImgSkeleton'
import Tag from "../../components/typography/Tag"
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'
import { BlockchainIcon, StreamIcon } from '../icons/Landing'
import {GetFundingAddress} from '../functional/GetContractAddress'
import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

import polygon from "../../public/icons/donate/polygon.png"
import bnb from "../../public/icons/donate/bnb.png"
import ftm from "../../public/icons/donate/ftm.png"
import Tooltip from '../Tooltip'
import {Erc20Icon, NftIcon} from "../../components/icons/Project"


const A = styled(Link)`
    &:hover{
        text-decoration: none;  
    }
`

const Container = styled(motion.div)`
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    max-height: 450px;
    width: 32%;
    max-width: 500px;
    padding: 2%;
    margin-top: 3%;
    border: 1px solid rgba(163, 163, 163, 0.3);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    border-radius: 5px;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 5%;
        margin-top: 7%;
    }
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Amount = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    color: #00FFA3;
`

const Title = styled.div`
    font-family: "Gemunu Libre";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    color: #b0f6ff;
    margin-top: 5%;
`

const Desc = styled.div`
    font-family: 'Neucha';
    letter-spacing: 0.1px;
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    color: #FFFFFF;
    margin-top: 5%;
`

const Days = styled.div`
    position: absolute;
    font-size: 0.7em;
    font-family: 'Gemunu Libre';
    right: 5px;
    top: 5px;
`

const ProjectType = styled.div`
  display: flex;
flex-direction: column;
  position: absolute;
  left: 0;
  font-family: 'Neucha';
  top: 0;
`

const Status = styled.div`
    font-size: 0.9em;
    font-family: 'Gemunu Libre';
`

const IconWrapper = styled.button`
  position: relative;
  background: inherit;
  border: none;
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
`

const ImagePart = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4%;
`


const ProjectCard = ({ title, description, category, subcategory, link, pid, imageUrl, pType, state, chainId, hasFungible, hasNft }) => {
    const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR)
    const [chainTooltip, setChainTooltip] = useState(false)
    const [streamTypeTooltip, setStreamTypeTooltip] = useState(false)
    const [standardTypeTooltip, setStandardTypeTooltip] = useState(false)
    const [nftTooltip, setNftTooltip] = useState(false)
    const [erc20Tooltip, setErc20Tooltip] = useState(false)

    useEffect(() => {
        setAdd(GetFundingAddress(chainId))
    }, [])

    let bal = 'n/a';
    let days = 'n/a';
    let max = 'n/a';

    const funds = useContractRead({
        address: add,
        abi: donation.abi,
        functionName: 'funds',
        chain: chainId,
        args: [pid],
        watch: false,
    })

    if (funds.data) {
        bal = funds.data.balance.toString()
        /// TBD Fix deadline - Block timestamp - current deadline?
        const d = funds.data.deadline.toString()
        const test = new Date(d * 1000);
        days = test.getDate()
        max = funds.data.level1.toString()
    }

    // Condition for ERC20 & NFT from the profile

    return <A href={link}>
        <Container
            whileHover={{ scale: 1.05 }} 
        >
            {chainTooltip && <Tooltip text={<>Project chain: 
                {chainId === 80001 && <> Polygon Mumbai</>}
                {chainId === 97 && <> BNB Chain testnet</>}
                {chainId === 4002 && <> Fantom testnet</>}
            </>} />}
          {standardTypeTooltip && <Tooltip text={'Funding type: Standard crowdfunnding'} />}
          {streamTypeTooltip && <Tooltip text={'Funding type: Money streaming'} />}
          {nftTooltip && <Tooltip text={'NFT Rewards offered'} />}
          {erc20Tooltip && <Tooltip text={'ERC20 Rewards offered'} />}
            {pType !== 'Stream' && <Days>{days}d</Days>}
            <ProjectType>
                    {pType === 'Stream' ? 
                    <IconWrapper onMouseEnter={() => { setStreamTypeTooltip(true) }} onMouseLeave={() => { setStreamTypeTooltip(false) }}><StreamIcon width={30} /></IconWrapper> : 
                    <IconWrapper onMouseEnter={() => { setStandardTypeTooltip(true) }} onMouseLeave={() => { setStandardTypeTooltip(false) }}><BlockchainIcon width={30}/></IconWrapper>}
                    <IconWrapper onMouseEnter={() => { setChainTooltip(true) }} onMouseLeave={() => { setChainTooltip(false) }}>
                        {chainId === 80001 && <><Image src={polygon} alt={'matic'} width={30} height={30}/> </>}
                        {chainId === 97 && <><Image src={bnb} alt={'bnb'} width={30} height={30}/></>}
                        {chainId === 4002 && <><Image src={ftm} alt={'ftm'} width={20} height={30}/></>}
                      </IconWrapper>
              {hasFungible && <IconWrapper onMouseEnter={() => { setErc20Tooltip(true) }} onMouseLeave={() => { setErc20Tooltip(false) }}>
                    <Erc20Icon width={50} height={70} />
                </IconWrapper>}
               {hasNft && <IconWrapper onMouseEnter={() => { setNftTooltip(true) }} onMouseLeave={() => { setNftTooltip(false) }}>
                    <NftIcon width={40} height={40} />
                </IconWrapper>}
             </ProjectType>
            <ImagePart> {!imageUrl ? <ImgSkeleton /> : <Image src={imageUrl} alt={title} width={'220px'} height={'200px'} />}</ImagePart>
            <Row>
                <Row>
                    <div>{category && <>
              {category === 'Art' && <Tag tag={category} color={"#7E0000"} />}
              {category === 'Games' && <Tag tag={category} color={"#7E3D00"} />}
              {category === 'Open_Source' && <Tag tag={category} color={"#7C007E"} />}
              {category === 'Science' && <Tag tag={category} color={"#00502E"} />}
              {category === 'Technology' && <Tag tag={category} color={"#2B2B2B"} />}
              {category === 'Web3' && <Tag tag={category} color={"#687900"} />}
              
            </>}</div>
                    <div>{subcategory && <Tag tag={subcategory} color={"#035201"} />}</div>
                </Row>
                <Amount>
                    {bal} / {max}
                </Amount>
            </Row>
            <Row>
                <Title>{title}</Title>
                <Status>
                    {state === 0 && <>Initiated</>}
                    {state === 1 && <>Active</>}
                    {state === 2 && <>Completed</>}
                    {state === 3 && <>Failed</>}
                    {state === 4 && <>Canceled</>}
                </Status> 
            </Row>
            <Desc>{description}</Desc>
        </Container>
    </A>
}

export default ProjectCard