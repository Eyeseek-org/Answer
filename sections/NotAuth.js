import styled from 'styled-components'
import Rainbow from '../components/buttons/Rainbow'
import Lottie from "react-lottie";
import walletAnimation from '../data/walletAnimation.json'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15%;
    padding-top: 10%;
    background: black;
    text-align: center;
`

const Title = styled.div`
    color: white;
    font-family: 'Neucha';
    margin-bottom: 10%;
    font-size: 1.1em;
`

const AnimBox = styled.div`
    position: absolute;
    right: 10%;
    opacity: 0.7;
    @media (max-width: 968px) {
        display: none;
    }
`

const animOptions = {
    loop: true,
    autoplay: true,
    animationData: walletAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const NotAuth = () => {
    return <Container>
        <AnimBox><Lottie height={150} width={150} options={animOptions} /></AnimBox>
        <Title>Connection not found, please reconnect your wallet</Title>
        <Rainbow/>
    </Container>
}

export default NotAuth