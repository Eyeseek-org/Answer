import styled from 'styled-components';
import {useState} from 'react'
import { useMoralisCloudFunction } from "react-moralis";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import NFTDisplay from '../components/functional/NftDisplay';
import diamondAbi from '../abi/diamondAbi.json';
import { diamond } from '../data/contracts/core';
import { RowCenter } from '../components/format/Row';
import { useBalance } from 'wagmi'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
`;


const Cloud = () => {
  const {data: signer} = useSigner();
  const {address} = useAccount();
  const [rewId, setRewId] = useState(0);
  const balance = useBalance({
    address: "0x3CaA9672A46c0BA5c26cF1343918c43ab78EeF14",
    token: '0xc454Ad7c7136011BF890d254E3C9702562557a9F',
    chainId: 80001
  })
  const claim = async () => {
    write?.();
  }

  const {data} = useContractRead({
    address: diamond.mumbai,
    abi: diamondAbi,
    functionName: 'getRewardItems',
    chainId: 80001
  }) 

  if (data){
    console.log(data)
    console.log(balance.data?.formatted)
  }

  const { config, error } = usePrepareContractWrite({
    address: diamond.mumbai,
    abi: diamondAbi,
    functionName: 'claimRewards',
    chainId: 80001,
    args: [1, address, 0, rewId]
  });

  const {write} = useContractWrite(config);


  const params = { 
    custom: "custom" 
  };
  const { fetch } = useMoralisCloudFunction(
      "firstOne"
  );
    
      const cloudCall = () => {
        fetch({
          onSuccess: (data) => console.log(data), 
          onError: (error) => console.log(error)
        });
      };
  return (
    <Container>
        <h1>Cloud</h1>
        <button onClick={cloudCall}>Make Cloud Call</button>
        <NFTDisplay address={'0x2F33B8870f86B319258380377076147a59E29135'} tokenId={24}/>

        <RowCenter>
            <button onClick={()=>{setRewId(rewId+1)}}>Next Reward</button>
            <button onClick={()=>{setRewId(rewId-1)}}>Prev Reward</button>
            <button onClick={()=>{claim()}}>Claim rewards {rewId}</button>
        </RowCenter>
    </Container>
  );
};

export default Cloud;
