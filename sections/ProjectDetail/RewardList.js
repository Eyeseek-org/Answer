import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'
import { useEffect } from 'react'
import { BlockchainIcon, StreamIcon } from '../../components/icons/Landing'
import SectionTitle from '../../components/typography/SectionTitle'
import Address from '../../components/functional/Address'
import RewardCard from "../../components/cards/RewardCard"
import { NftIcon } from '../../components/icons/Project'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 18%;
    padding-right: 18%;
    min-height: 300px;

`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5%;
    flex-wrap: wrap;
`

const Modal = styled.div`  
    position: relative;
    font-family: 'Montserrat';
    height: 200px;
    margin: 1%;
    padding: 3%;
    width: 300px;
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    border: 1px solid #3C3C3C;
    border-radius: 5px;
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }
    @media (min-width: 1750px){
        font-size: 1.3em;
    }
`

const ModalTitle = styled.div`
    padding-bottom: 2%;
    border-bottom: 1px dashed #3C3C3C;
    margin-bottom: 4%;
    color: #B0F6FF;
    font-size: 1em;
    font-family: 'Gemunu Libre';
    letter-spacing: 0.4px;
`

const ModalDesc = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Neucha';
    letter-spacing: 0.4px;
    font-size: 0.9em;
    color: white;
`

const ModalAmount = styled.div`
    font-family: 'Neucha';
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


const TypeBox = styled.div`
    position: absolute;
    right: 10px;
    bottom: 0;
`

const NumberBox = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
`

const NftBox = styled.div`
    cursor: pointer;
`

// Display rewards
// Add reward types and other metadata
const RewardList = ({oid}) => {
    const [rewards, setRewards] = useState([])
    const [tokenReward, setTokenReward] = useState([])
    const [nftRewards, setNftRewards] = useState([])
    const [apiError, setApiError] = useState(false)

    // Dummy data
    const [ipfsUri, setIpfsUri] = useState('https://ipfs.moralis.io:2053/ipfs/QmYdN8u9Wvay3uJxxVBgedZAPhndBYMUZYsysSsVqzfCQR/5000.json')

    // Extract image json.image, display it 

    const getRewards = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward?where={"project":"${oid}", "nftType": false}`,moralisApiConfig)
            setRewards(res.data.results), 
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const getTokenReward = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/TokenReward?where={"project":"${oid}", "nftType":false}`,moralisApiConfig)
            setTokenReward(res.data.results)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const getNftRewards = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward?where={"project":"${oid}", "nftType": true}`,moralisApiConfig)
            if (res.data.results.length > 0) {
                setNftRewards(res.data.results)
            }
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    useEffect(() => {
        getRewards()
        getTokenReward()
        getNftRewards()
    }, [])

    const header = {
        headers: {accept: 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY, 'Content-Type': 'application/json'}
    }

    const params = {
        chain: 'mumbai', format: 'decimal'
    }
    const getNft = async (address, id) => {
        try {
            const res = await axios.get(`https://deep-index.moralis.io/api/v2/nft/${address}/${id}`, {params}, {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
                    'Content-Type': 'application/json'
                }
            }   
            )
            console.log(res.data)
            if (res.data.length > 0) {
                setIpfsUri(res.data.result.token_uri)
            }
        } catch (err) {
            console.log(err)
        }
    }
    /// TBD switched numbers - total vs pledged
    /// TBD incorrect icons + Microfund vs Donate 
    /// TBD push to the donate
    return <>
        <SectionTitle title="Rewards" subtitle={'Project rewards'} />
        <Main>

    <Container>
        {/* {rewards.map((reward, index) => {
            return <RewardCard key={index} title={reward.title} pledge={reward.requiredPledge}/>
        })} */}
       {rewards.map((reward, index) => {
              return  <Modal key={index}>
                    <Row><ModalTitle>{reward.title}</ModalTitle><ModalAmount>${reward.amount}</ModalAmount></Row>
                    <ModalDesc>{reward.description}</ModalDesc>
                    <NumberBox> {reward.eligibleActual} of {reward.cap} </NumberBox>
                    <TypeBox>{reward.type === 'Donate' ? <BlockchainIcon width={30}/> : <StreamIcon width={30}/>}</TypeBox>
               </Modal>
       })}    
    {tokenReward.length > 0 && <>{tokenReward.map((reward, index) => {
              return  <Modal key={index}>  
              {reward.tokenAmount > 0 ?  <> <Row><ModalTitle>Token reward</ModalTitle><ModalAmount>${reward.tokenAmount}</ModalAmount></Row>
              <ModalDesc>{reward.tokenName} - {reward.tokenAddress}</ModalDesc></> : <i>No ERC20 token reward offered for this project</i> }

         </Modal>
       })} </>}
    {nftRewards.length > 0 && <>{nftRewards.map((reward, index) => {
              return  <Modal key={index}>  
              <Row><ModalTitle>NFT limited rewards</ModalTitle><ModalAmount>{reward.cap}x</ModalAmount></Row>
              <NftBox onClick={()=>{getNft(reward.tokenAddress, reward.nftId)}}><NftIcon width={30}/></NftBox>
              <ModalDesc><div>{reward.tokenName}</div><Address address={reward.tokenAddress}/></ModalDesc>

         </Modal>
       })} </>}
    </Container></Main></>
}

export default RewardList