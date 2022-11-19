import { useState, useEffect } from 'react';
import { useContractRead, useNetwork } from 'wagmi';
import styled from 'styled-components';
import token from '../../abi/token.json';
import Amount from './Amount';
import { GetFundingAddress } from '../../helpers/GetContractAddress';
import { ethers } from 'ethers';

const Container = styled.div`
  display: flex;
  font-size: 0.9em;
  font-weight: 400;
  font-family: 'Gemunu Libre';
`;

const ApprovedComponent = ({ address, currencyAddress }) => {
  const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR);
  const { chain } = useNetwork();

  useEffect(() => {
    setAdd(GetFundingAddress(chain));
  }, []);

  var fullValue;

  console.log('address', currencyAddress);
  

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

  console.log(data)

  return (
    <Container>
      {data && (
        <>
          <Amount value={data} />
        </>
      )}
    </Container>
  );
};

export default ApprovedComponent;
