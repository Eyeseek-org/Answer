import { useState, useEffect } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import token from '../../abi/token.json';
import Amount from './Amount';
import Tooltip from '../Tooltip';
import { InfoIcon } from '../icons/Common';
import {useTheme} from 'styled-components';
import { diamond } from '../../data/contracts/core';

const ApprovedComponent = ({ address, currencyAddress, dec }) => {
  const [add, setAdd] = useState(diamond.mumbai);
  const [showTooltip, setShowTooltip] = useState(false);
  const { chain } = useNetwork();
  const theme = useTheme()
  const [d, setD] = useState(1000000) // Stablecoins USDT, USDCT

  useEffect (() => {
    if (dec === 6){
        setD(1000000) // Stablecoins USDT, USDCT
    } else if (dec === 18){
        setD(1000000000000000000) // Standard ERC20 tokens
    } else if (dec === 1){
        setD(1) // Universal basic unit for all
    }
},[])


  useEffect(() => {
    if (process.env.PROD !== 'something'){
      setAdd(diamond.mumbai)
    }
  }, []);

  var fullValue;


  const { data } = useContractRead({
    address: currencyAddress,
    abi: token.abi,
    chainId: chain.id,
    functionName: 'allowance',
    args: [address, add],
    watch: true,
  });

  if (data) {
    fullValue = data / d;
  }

  return (
    <>
      {showTooltip && <Tooltip text='Funded amount must be approved before spending' margin={'-100px'}/>}
      {data && (
        <div onMouseEnter={()=>{setShowTooltip(true)}} onMouseLeave={()=>{setShowTooltip(false)}}>
          <Amount value={fullValue} />
          <InfoIcon width={15} color={theme.colors.icon}/>
        </div>
      )}
    </>
  );
};

export default ApprovedComponent;
