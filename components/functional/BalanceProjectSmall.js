import {useEffect, useState} from 'react';
import { B, G } from '../typography/ColoredTexts';
import Amount from './Amount';
import { useContractRead } from 'wagmi';
import donation from '../../abi/donation.json';
import { GetProjectFundingAddress } from '../../helpers/GetContractAddress';
import { Col, BetweenRowSm } from '../format/Row';


const BalanceProjectSmall = ({pid, chainId}) => {
  const [add, setAdd] = useState();

    useEffect(() => {
      const res = GetProjectFundingAddress(chainId);
      setAdd(res);
    }, []);


    let bal = 'na';
    let max = 'na';
    let microInvolved = 'na';
  
    const funds = useContractRead({
      address: add,
      abi: donation.abi,
      functionName: 'funds',
      chainId: chainId,
      args: [pid],
      watch: false,
    });

    const micros = useContractRead({
      address: add,
      abi: donation.abi,
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


