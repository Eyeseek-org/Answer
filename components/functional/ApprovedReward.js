import { useState, useEffect } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import token from '../../abi/token.json';
import Amount from './Amount';
import { diamond } from '../../data/contracts/core';


const ApprovedReward = ({ address, currencyAddress }) => {
  const [add, setAdd] = useState();
  const { chain } = useNetwork();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== 'production'){
      setAdd(diamond.mumbai)
    } else {
      setAdd(diamond.polygon);
    }
  }, []);

  const { data } = useContractRead({
    address: currencyAddress,
    abi: token.abi,
    chainId: chain.id,
    functionName: 'allowance',
    args: [address, add],
    watch: true,
  });

  return (
    <>
      {data && (
        <>
          {data === 0 ? <b>{data}</b> : <Amount value={data} />}
        </>
      )}
    </>
  );
};

export default ApprovedReward;
