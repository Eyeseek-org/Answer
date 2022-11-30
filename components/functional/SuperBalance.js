import styled from 'styled-components';
import { useBalance } from 'wagmi';
import { G } from '../typography/ColoredTexts';
import Amount from './Amount';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;
  font-size: 0.9em;
  font-weight: 400;
  font-family: 'Gemunu Libre';
`;
const SuperBalance = ({ chain, address}) => {

  // Load supertoken 
  // Temporary hardcode my address

  const { data } = useBalance({
    address: address,
    token: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
    chainId: chain,
  });


  return (
    <Container>
       <G> <Amount value={(Number(data?.formatted))} /> </G>
       <G> {data?.symbol}</G>
    </Container>
  );
};

export default SuperBalance;