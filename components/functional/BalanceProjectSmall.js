import {useEffect, useState} from 'react';
import { B, G } from '../typography/ColoredTexts';
import Amount from './Amount';
import { useContractRead } from 'wagmi';
import diamondAbi from '../../abi/diamondAbi.json';
import { Col, BetweenRowSm } from '../format/Row';
import { diamond } from '../../data/contracts/core';
import MyTooltip from '../Tooltip';


const BalanceProjectSmall = ({pid, chainId}) => {
  const [add, setAdd] = useState();
  const [showTooltip, setShowTooltip] = useState()
  const [t, setT] = useState(t)

    useEffect(() => {
      if (process.env.NEXT_PUBLIC_ENV !== 'production'){
        setAdd(diamond.mumbai)
      } else {
        setAdd(diamond.polygon);
      }
    }, []);

    const handleTooltip = () => {
      setShowTooltip(true)
      setT(`Goal: ${max}, Funded: ${bal}, Backers: ${backers}, Microfunds: ${microInvolved}`)
    }


    let bal = 'na';
    let max = 'na';
    let microInvolved = 'na';
    let backers = 'na';	
  
    const funds = useContractRead({
      address: add,
      abi: diamondAbi,
      functionName: 'getFundDetail',
      chainId: chainId,
      args: [pid],
      watch: false,
    });

  
    if (funds.data) {
      bal = Number(funds.data.balance.toString()) / 1000000;
      max = Number(funds.data.level1.toString()) / 1000000;
      microInvolved = funds.data.micros.toString();
      backers = funds.data.backerNumber.toString();
    }
    return <Col onMouseEnter={()=>{handleTooltip(bal, max, microInvolved, backers)}} onMouseLeave={()=>{setShowTooltip(false)}}>
     {showTooltip && <MyTooltip text={t}/>}
     <div>$<Amount value={max} /></div>
      <BetweenRowSm><G> {bal === 0 ? null : <div>$<Amount value={bal} /></div>}</G>
        {microInvolved > 5 ? <B>{microInvolved}</B> : <>{backers}/{microInvolved}</>}
      </BetweenRowSm>
    </Col>
}

export default BalanceProjectSmall


