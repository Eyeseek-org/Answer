import styled from 'styled-components'
import {useState} from 'react'

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

// Display rewards
// Add reward types and other metadata
const RewardList = () => {
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState('Microfund')

    const showModal = (title,description,amount, type) => {
        setModal(true)
        setTitle(title)
        setDescription(description)
        setAmount(amount)
        setType(type)
    }

    const Item = ({item, title, description, amount}) => {
        return <I onMouseEnter={()=>{showModal(title, description, amount)}} onMouseLeave={()=>{setModal(false)}}>{item}</I>
    }

    return <>
    {modal && 
        <Modal>
             <Row><ModalTitle>{title}</ModalTitle><ModalAmount>${amount}</ModalAmount></Row>
            <ModalDesc>{description}</ModalDesc>
        </Modal>}
    
    <Container>
       <Title>Rewards</Title>
        <Item item='idsadsadsadsadtem' title='title' description='description' amount='amount' type='Microfund'/>
        <Item item='itedssadsadsadm' title='title' description='description' amount='amount' type='Microfund'/>
        <Item item='itdsadasem' title='title' description='description' amount='amount' type='Microfund'/>
        <Item item='item' title='title' description='description' amount='amount' type='Microfund'/>
        <Item item='item' title='title' description='description' amount='amount' type='Microfund'/>
    </Container></>
}

export default RewardList