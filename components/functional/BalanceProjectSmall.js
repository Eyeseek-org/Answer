import styled from 'styled-components';
import { G } from '../typography/ColoredTexts';
import Amount from './Amount';
import { useContractRead } from 'wagmi';
import donation from '../../abi/donation.json';

const FundsSmall = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const FundsPartial = styled.div`
  font-size: 0.7em;
`


const BalanceProjectSmall = ({pid, chainId}) => {

    let bal = 'na';
    let max = 'na';

  
    // const funds = useContractRead({
    //   address: add,
    //   abi: donation.abi,
    //   functionName: 'funds',
    //   chainId: chainId,
    //   args: [pid],
    //   watch: false,
    // });

    
//   if (funds.data) {
//     bal = Number(funds.data.balance.toString()) / 1000000;
//     max = Number(funds.data.level1.toString()) / 1000000;
//   }
    return <FundsSmall><div><Amount value={bal} /></div><FundsPartial>/<G>${max}</G></FundsPartial></FundsSmall>
}

export default BalanceProjectSmall


