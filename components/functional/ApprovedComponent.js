import { useState, useEffect } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import token from '../../abi/token.json';
import Amount from './Amount';
import { GetFundingAddress } from '../../helpers/GetContractAddress';
import { ethers } from 'ethers';
import Tooltip from '../Tooltip';
import { InfoIcon } from '../icons/Common';

const ApprovedComponent = ({ address, currencyAddress }) => {
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const [showTooltip, setShowTooltip] = useState(false);
  const { chain } = useNetwork();

  useEffect(() => {
    setAdd(GetFundingAddress(chain));
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
    fullValue = ethers.utils.formatEther(data);
  }

  return (
    <>
      {showTooltip && <Tooltip text='Funded amount must be approved before spending'/>}
      {data && (
        <div onMouseEnter={()=>{setShowTooltip(true)}} onMouseLeave={()=>{setShowTooltip(false)}}>
          <Amount value={fullValue} />
          <InfoIcon width={15}/>
        </div>
      )}
    </>
  );
};

export default ApprovedComponent;
