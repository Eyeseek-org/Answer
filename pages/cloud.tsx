import styled from 'styled-components';
import { useMoralisCloudFunction } from "react-moralis";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 5%;
`;


const Cloud = () => {
    const { fetch } = useMoralisCloudFunction(
        "firstOne"
      );
    
      const cloudCall = () => {
        fetch({
          onSuccess: (data) => console.log(data), 
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
