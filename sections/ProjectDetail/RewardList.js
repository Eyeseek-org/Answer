import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'
import { useEffect } from 'react'
import { BlockchainIcon, StreamIcon } from '../../components/icons/Landing'
import SectionTitle from '../../components/typography/SectionTitle'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 18%;
    padding-right: 18%;
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

// Display rewards
// Add reward types and other metadata
const RewardList = ({oid}) => {
    const [rewards, setRewards] = useState([])
    const [tokenReward, setTokenReward] = useState([])
    const [apiError, setApiError] = useState(false)

    const getRewards = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward?where={"project":"${oid}"}`,moralisApiConfig)
            setRewards(res.data.results)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    const getTokenReward = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/TokenReward?where={"project":"${oid}"}`,moralisApiConfig)
            setTokenReward(res.data.results)
            setApiError(false)
        } catch (err) {
            console.log(err)
            setApiError(true)
        }
    }

    useEffect(() => {
        getRewards()
        getTokenReward()
    }, [])

    /// TBD switched numbers - total vs pledged
    /// TBD incorrect icons + Complet the UI
    return <>
        <SectionTitle title="Rewards" subtitle={'Display current rewards'} />
        <Main>


    <Container>
       {rewards.map((reward, index) => {
              return  <Modal key={index}>
                    <Row><ModalTitle>{reward.title}</ModalTitle><ModalAmount>${reward.amount}</ModalAmount></Row>
                    <ModalDesc>{reward.description}</ModalDesc>
                    <NumberBox> {reward.pledged} of {reward.cap} </NumberBox>
                    <TypeBox>{reward.type === 'Donate' ? <BlockchainIcon width={30}/> : <StreamIcon width={30}/>}</TypeBox>
               </Modal>
       })}
       
    {tokenReward.length > 0 && <>{tokenReward.map((reward, index) => {
              return  <Modal key={index}>  
              {reward.tokenAmount > 0 ?  <> <Row><ModalTitle>Token reward</ModalTitle><ModalAmount>${reward.tokenAmount}</ModalAmount></Row>
              <ModalDesc>{reward.tokenName} - {reward.tokenAddress}</ModalDesc></> : <i>No Token reward offered for this project</i> }

         </Modal>
       })} </>}
    </Container></Main></>
}

export default RewardList