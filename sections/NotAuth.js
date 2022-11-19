import styled from 'styled-components';
import Rainbow from '../components/buttons/Rainbow';
import Lottie from 'react-lottie';
import walletAnimation from '../data/walletAnimation.json';
import { WarnTitle } from '../components/typography/Titles';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15%;
  padding-top: 10%;
  background: ${(props) => props.theme.colors.black};
  text-align: center;
`;

const AnimBox = styled.div`
  position: absolute;
  right: 10%;
  opacity: 0.7;
  @media (max-width: 968px) {
    display: none;
  }
`;

const animOptions = {
  loop: true,
  autoplay: true,
  animationData: walletAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const NotAuth = () => {
  return (
    <Container>
      <AnimBox>
        <Lottie height={150} width={150} options={animOptions} />
      </AnimBox>
      <WarnTitle>Connection not found, please reconnect your wallet</WarnTitle>
      <Rainbow />
    </Container>
  );
};

export default NotAuth;
