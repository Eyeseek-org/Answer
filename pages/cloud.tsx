import styled from 'styled-components';
import { useMoralisCloudFunction } from "react-moralis";
import { useSigner } from 'wagmi';
import NFTDisplay from '../components/functional/NftDisplay';

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
    </Container>
  );
};

export default Cloud;
