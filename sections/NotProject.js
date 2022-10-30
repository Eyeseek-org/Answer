import styled from 'styled-components'
import Lottie from "react-lottie";
import notFoundAnimation from '../data/notFoundAnimation.json'
import Button from '../components/buttons/Button';
import Link from 'next/link';

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

const ActionBox = styled.div`
    text-align: center;
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
    animationData: notFoundAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const NotProject = () => {
    return <Container>
        <AnimBox><Lottie height={150} width={150} options={animOptions} /></AnimBox>
        <Title>No active project found for this wallet address</Title>
        <ActionBox><Link href='/startproject'><Button text={'Create new project'}/></Link></ActionBox>
    </Container>
}

export default NotProject