import { useState, useEffect } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import token from '../../abi/token.json';
import Amount from './Amount';
import { GetFundingAddress } from '../../helpers/GetContractAddress';
import Tooltip from '../Tooltip';
import { InfoIcon } from '../icons/Common';
import {useTheme} from 'styled-components';

const ApprovedComponent = ({ address, currencyAddress }) => {
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const [showTooltip, setShowTooltip] = useState(false);
  const { chain } = useNetwork();
  const theme = useTheme()

  const dec = 6

  useEffect(() => {
    setAdd(GetFundingAddress(chain));
    console.log(add)
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

  if (data && dec === 6) {
    fullValue = data / 1000000;
  }

  return (
    <>
      {showTooltip && <Tooltip text='Funded amount must be approved before spending'/>}
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
