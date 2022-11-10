import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'
import { useEffect } from 'react'
import RewardCard from "../../components/cards/RewardCard"
import ErrText from '../../components/typography/ErrText'
import NoFound from '../../components/typography/NoFound'
import { useApp } from '../utils/appContext'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 280px;

`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5%;
    flex-wrap: wrap;
`

// Display rewards
// Add reward types and other metadata
const RewardList = ({oid}) => {
    const [tokenRewards, setTokenRewards] = useState([])
    const { setAppState } = useApp();
    const [apiError, setApiError] = useState(false)
    const [selected, setSelected] = useState("")

    // Dummy data
    const [ipfsUri, setIpfsUri] = useState('https://ipfs.moralis.io:2053/ipfs/QmYdN8u9Wvay3uJxxVBgedZAPhndBYMUZYsysSsVqzfCQR/5000.json')

    // Extract image json.image, display it 

    const getRewards = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward?where={"project":"${oid}", "nftType": false}`,moralisApiConfig)
            setTokenRewards(res.data.results), 
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    useEffect(() => {
        getRewards()
    }, [])

    const handleRewardClick = (sel, rewAmount, type, rid) => {
        setSelected(sel)
        if (type === 'Microfund') {
            setAppState((prev) => ({ ...prev, rewMAmount: rewAmount, rewDAmount: 0, rewId: rid }));
        } else if (type === 'Donation') {
            setAppState((prev) => ({ ...prev, rewDAmount: rewAmount, rewMAmount: 0, rewId: rid   }));
        }
        
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
    /// TBD incorrect icons + Microfund vs Donate 
    /// TBD push to the donate
    return <>
        <Main>
      <Container>

    {tokenRewards.length > 0 ? <>{tokenRewards.map((reward) => {
              return  <RewardCard 
                key={reward.objectId}
                rid={reward.rewardId}
                title={reward.title} 
                pledge={reward.requiredPledge} 
                description={reward.description} 
                eligibleActual={reward.eligibleActual} 
                type={reward.type} 
                cap={reward.cap} 
                tokenAddress={reward.tokenAddress} 
                nftId={reward.nftId}
                tokenName={reward.tokenName}
                selected={selected}
                onClick={()=>{handleRewardClick(reward.title, reward.requiredPledge, reward.type, reward.rewardId)}}
              />
       })} </> : <NoFound text={''}/>}
        {apiError && <ErrText text={'Communication error - please try again later'}/>}
    </Container></Main></>
}

export default RewardList