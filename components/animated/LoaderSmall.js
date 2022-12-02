import Lottie from 'react-lottie';
import { loadingAnim } from './Animations';

const LoaderSmall = () => {
    return <>
         <Lottie height={100} width={100} options={loadingAnim} />
    </>
}

export default LoaderSmall