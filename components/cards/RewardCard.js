import styled from 'styled-components'
import {motion} from 'framer-motion'

const Modal = styled(motion.div)`  
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

const RewardCard = ({key, pledge, title, description, eligibleActual, type}) => {
    return <Modal 
        key={key}
        whileHover={{ scale: 1.05 }} 
        onClick={onClick}>
    <Row><ModalTitle>{title}</ModalTitle><ModalAmount>${pledge}</ModalAmount></Row>
    <ModalDesc>{description}</ModalDesc>
    <NumberBox> {eligibleActual} of {cap} </NumberBox>
    <TypeBox>{type === 'Donate' ? <BlockchainIcon width={30}/> : <StreamIcon width={30}/>}</TypeBox>
</Modal>
}

export default RewardCard 