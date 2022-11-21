import Image from 'next/image'
import polygon from '../public/icons/polygon.png';
import fantom from '../public/icons/fantom.png';
import binance from '../public/icons/binance.png';
import {useState, useEffect} from 'react';
import { ExpandIcon } from '../components/icons/Notifications';

export const ChainIconComponent = ({ch}) => {
  const [chainIcon, setChainIcon] = useState(<Image src={polygon} alt={'matic'} width={30} height={30} />);
  useEffect(() => {
    setChainIcon(ChainIcon(ch))
  }, []);
  return <>{chainIcon}</>
}

export const ExplorerReference = ({ch, tx}) => {
  const [explorer, setExplorer] = useState('https://polygonscan.com/tx/');
  useEffect(() => {
    setExplorer(ChainExplorer(ch))
  }, []);
  return   <a href={`${explorer}${tx}`} target="_blank" rel="noreferrer">
        <ExpandIcon width={20} height={20} />
      </a>
}

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

export const ChainExplorer = (chain) => {
    if (chain === 80001) {
        return 'https://mumbai.polygonscan.com/tx/';
      } else if (chain === 97) {
        return  'https://bscscan.com/tx/';
      } else if (chain === 4002) {
        return 'https://testnet.ftmscan.com/tx';
      }
}

export const ChainName = (chain) => {
    if (chain === 80001) {
        return 'Polygon Mumbai';
      } else if (chain === 97) {
        return  'Binance testnet';
      } else if (chain === 4002) {
        return 'Fantom testnet';
      } else {
        return 'Polygon';
      }
}