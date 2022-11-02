import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'
import { useEffect } from 'react'
import { BlockchainIcon, StreamIcon } from '../../components/icons/Landing'

const Container = styled.div`
    position: absolute;
    right: -100px;
    height: 100%;
    @media (min-width: 1200px){
        right: -150px;
    }
`

const Title = styled.div`
    font-size: 1.1em;
    text-align: right;
    margin-bottom: 7%;
    font-family: 'Montserrat';
    color: #B0F6FF;
    &:hover{
        cursor: default;
    }
`

const I = styled.div`
    margin-bottom: 5%;
    font-family: 'Neucha';
    text-align: right;
    color: white;
    &:hover{
        font-weight: bold;
        cursor: pointer;
    }
`

const TokenItem = styled(I)`
    &:hover{
        font-weight: normal;
        cursor: default;
    }
`

const Modal = styled.div`  
    position: absolute;
    right: 0;
    font-family: 'Montserrat';
    height: 300px;
    padding: 3%;
    width: 300px;
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.99) -21.57%, rgba(0, 0, 0, 0.99) 100%);
    border: 45px;
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }
`

const ModalTitle = styled.div`
    text-decoration: underline;
    margin-bottom: 4%;
    font-size: 1em;
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

const ImageBox = styled.div`
    position: relative;
    z-index: 5;
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
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [rewards, setRewards] = useState([])
    const [tokenReward, setTokenReward] = useState([])
    const [type, setType] = useState('Microfund')
    const [pledged, setPledge] = useState()
    const [cap, setCap] = useState()
    const [apiError, setApiError] = useState(false)

    const showModal = (title,description,amount, type, pledged, cap) => {
        setModal(true)
        setTitle(title)
        setDescription(description)
        setAmount(amount)
        setType(type)
        setPledge(pledged)
        setCap(cap)
    }


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

    const Item = ({title, description, amount, type, cap, pledged}) => {
        return <I onMouseEnter={()=>{showModal(title, description, amount, type, cap, pledged)}} onMouseLeave={()=>{setModal(false)}}>{title}</I>
    }

    /// TBD switched numbers - total vs pledged
    /// TBD incorrect icons
    return <>
    {modal && 
        <Modal>
             <Row><ModalTitle>{title}</ModalTitle><ModalAmount>${amount}</ModalAmount></Row>
            <ModalDesc>{description}</ModalDesc>
             <NumberBox> {pledged} of {cap} </NumberBox>
            <TypeBox>{type === 'Donate' ? <BlockchainIcon width={30}/> : <StreamIcon width={30}/>}</TypeBox>
        </Modal>}
    <Container>
       <Title>Rewards</Title>
       {rewards.map((reward, index) => {
              return <Item key={index} title={reward.title} description={reward.description} amount={reward.amount} type={reward.type} cap={reward.cap} pledged={reward.pledged} />
       })}
       <Title>Token reward</Title>
       {tokenReward.map((reward, index) => {
              return <TokenItem key={index} title={'Token offered'}>
                    <div>{reward.tokenAmount} x {reward.tokenName} </div> 
                    <div>{reward.tokenAddress} </div> 
              </TokenItem>
       })}
    </Container></>
}

export default RewardList