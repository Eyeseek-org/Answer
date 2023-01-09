import Image from 'next/image'
import polygon from '../public/icons/polygon.png';
import fantom from '../public/icons/fantom.png';
import binance from '../public/icons/binance.png';
import optimism from '../public/icons/optimism.png';
import {useState, useEffect} from 'react';
import { ExpandIcon } from '../components/icons/Notifications';
import {useTheme} from 'styled-components';
import { stable } from '../data/contracts/stablecoins';

export const ChainIconComponent = ({ch}) => {
  const [chainIcon, setChainIcon] = useState(<Image src={polygon} alt={'matic'} width={30} height={30} />);
  useEffect(() => {
    setChainIcon(ChainIcon(ch))
  }, []);
  return <>{chainIcon}</>
}

export const ExplorerReference = ({ch, tx}) => {
  const [explorer, setExplorer] = useState('https://polygonscan.com/tx/');
  const theme = useTheme();
  useEffect(() => {
    setExplorer(ChainExplorer(ch))
  }, []);
  return   <a href={`${explorer}${tx}`} target="_blank" rel="noreferrer">
        <ExpandIcon width={20} height={20} color={theme.colors.primary} />
      </a>
}

export const ChainIcon = (chain) => {
    if (chain === 80001 || chain === 137) {
        return <Image src={polygon} alt={'matic'} width={30} height={30} />
    } else if (chain === 97 || chain === 56) {
        return <Image src={binance} alt={'bnb'} width={30} height={30} />
    } else if (chain === 4002 || chain === 250) {
        return <Image src={fantom} alt={'ftm'} width={30} height={30} />
    } else if (chain === 420 || chain === 10) {
      return <Image src={optimism} alt={'optimism'} width={30} height={30} />
    } else if (chain === undefined){
      return <></>
    }
    else {
        return <></>;
    }
}

export const ChainSmallIconComponent = ({ch}) => {
  const [chainIcon, setChainIcon] = useState(<Image src={polygon} alt={'matic'} width={30} height={30} />);
  useEffect(() => {
    setChainIcon(ChainSmallIcon(ch))
  }, []);
  return <>{chainIcon}</>
}

export const ChainSmallIcon = (chain) => {
  if (chain === 80001 || chain === 137) {
      return <Image src={polygon} alt={'matic'} width={15} height={15} />
  } else if (chain === 97 || chain === 56) {
      return <Image src={binance} alt={'bnb'} width={15} height={15} />
  } else if (chain === 4002 || chain === 250) {
      return <Image src={fantom} alt={'ftm'} width={15} height={15} />
  } else if (chain === 420 || chain === 10) {
    return <Image src={optimism} alt={'optimism'} width={15} height={15} />
  } else if (chain === undefined){
    return <></>
  }
  else {
      return <></>;
  }
}

export const CurrAddress = (curr, chain) => {
  switch(chain) {
    case 80001: if (curr === 'USDC') { return stable.mumbai.usdc} else if (curr === 'USDT') { return stable.mumbai.usdt}  break;
    case 137:if (curr === 'USDC') { return stable.polygon.usdc} else if (curr === 'USDT') { return stable.polygon.usdt}  break;
    case 97:  if (curr === 'USDC') {return stable.bnbTestnet.usdc} else if (curr === 'USDT') {return stable.bnbTestnet.usdt} break;
    case 56:  if (curr === 'USDC') {return stable.bnb.usdc} else if (curr === 'USDT') {return stable.bnb.usdt}break;
    case 4002: if (curr === 'USDC') { return stable.ftmTestnet.usdc} else if (curr === 'USDT') {return stable.ftmTestnet.usdt}  break;
    case 250:if (curr === 'USDC') { return stable.ftm.usdc} else if (curr === 'USDT') {return stable.ftm.usdt} break;
    case 420:  if (curr === 'USDC') {return stable.optimismTestnet.usdc} else if (curr === 'USDT') {return stable.optimismTestnet.usdt}  break;
    case 10:  if (curr === 'USDC') {return stable.optimism.usdc} else if (curr === 'USDT') {return stable.optimism.usdt}  break;
  }
 }

 export const handleDec = async(cur) => {  
  switch(cur) {
    case stable.bnb.busd: return 18;
    case stable.bnb.usdc: return 6;
    case stable.bnbTestnet.usdc: return 6;
    case stable.bnbTestnet.usdt: return 6;
    case stable.ftm.usdc: return 6;
    case stable.ftm.dai: return 18;
    case stable.ftmTestnet.usdc: return 6;
    case stable.ftmTestnet.usdt: return 6;
    case stable.mumbai.usdc: return 6;
    case stable.mumbai.usdt: return 6;
    case stable.polygon.usdc: return 6;
    case stable.polygon.usdt: return 6;
    case stable.optimismTestnet.usdc: return 6;
    case stable.optimismTestnet.usdt: return 6;
    case stable.optimism.usdc: return 6;
    case stable.optimism.usdt: return 6;
    default : return 18;
  }
}

export const ChainExplorer = (chain) => {
    if (chain === 80001 || chain === 137) {
        return 'https://mumbai.polygonscan.com/tx/';
      } else if (chain === 97 || chain === 56) {
        return  'https://bscscan.com/tx/';
      } else if (chain === 4002 || chain === 250) {
        return 'https://testnet.ftmscan.com/tx';
      } else if (chain === 420 || chain === 10) {
        return 'https://optimistic.etherscan.io/tx/';
      } 
}

export const ChainName = (chain) => {
    if (chain === 80001 || chain === 137) {
        return 'Polygon';
      } else if (chain === 97 || chain === 56) {
        return  'Binance';
      } else if (chain === 4002 || chain === 250) {
        return 'Fantom';
      } else if (chain === 420 || chain === 10) {
        return 'Optimism';
      } else {
        return 'Polygon';
      }
}

