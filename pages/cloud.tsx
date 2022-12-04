import styled from 'styled-components';
import { useMoralisCloudFunction } from "react-moralis";
import { useSigner } from 'wagmi';


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
    </Container>
  );
};

export default Cloud;
