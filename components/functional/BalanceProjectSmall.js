import {useEffect, useState} from 'react';
import { B, G } from '../typography/ColoredTexts';
import Amount from './Amount';
import { useContractRead } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import { Col, BetweenRowSm } from '../format/Row';
import { diamond } from '../../data/contracts/core';


const BalanceProjectSmall = ({pid, chainId}) => {
  const [add, setAdd] = useState();

    useEffect(() => {
      if (process.env.PROD !== 'something'){
        setAdd(diamond.mumbai)
      }
    }, []);


    let bal = 'na';
    let max = 'na';
    let microInvolved = 'na';
  
    const funds = useContractRead({
      address: add,
      abi: diamondAbi,
      functionName: 'getFundDetail',
      chainId: chainId,
      args: [pid],
      watch: false,
    });

    const micros = useContractRead({
      address: add,
      abi: diamondAbi,
      functionName: 'getConnectedMicroFunds',
      chainId: chainId,
      args: [pid],
      watch: false,
    });
  
    if (micros.data) {
      microInvolved = Number(micros.data.toString());
    }
  
    if (funds.data) {
      bal = Number(funds.data.balance.toString()) / 1000000;
      max = Number(funds.data.level1.toString()) / 1000000;
    }
    return <Col>
    <div>$<Amount value={max} /></div>
    <BetweenRowSm><G> {bal === 0 ? null : <div>$<Amount value={bal} /></div>}</G>
     {microInvolved > 5 ? <B>{microInvolved}</B> : <>{microInvolved}</>}
    
    </BetweenRowSm>
    
    </Col>
}

export default BalanceProjectSmall


