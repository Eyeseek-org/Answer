import Image from 'next/image'
import polygon from '../public/icons/polygon.png';
import fantom from '../public/icons/fantom.png';
import binance from '../public/icons/binance.png';

export const ChainIcon = (chain) => {
    if (chain === 80001) {
        return <Image src={polygon} alt={'matic'} width={30} height={30} />
    } else if (chain === 97) {
        return <Image src={binance} alt={'bnb'} width={30} height={30} />
    } else if (chain === 4002) {
        return <Image src={fantom} alt={'ftm'} width={30} height={30} />
    } else {
        return <Image src={polygon} alt={'matic'} width={30} height={30} />;
    }
}
