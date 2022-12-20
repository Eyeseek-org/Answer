import Lottie from 'react-lottie';
import { loadingAnim } from './Animations';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: -20px;
    right: 7px;
`

const LoaderSmall = () => {
    return <Container>
         <Lottie height={50} width={50} options={loadingAnim} />
    </Container>
}

export default LoaderSmall