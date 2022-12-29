import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNetwork, useBalance } from 'wagmi';
import Amount from './Amount';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  font-size: 0.9em;
  font-weight: 400;
  font-family: 'Gemunu Libre';
  @media {
    font-size: 1.2em;
  }
`;
const BalanceComponent = ({ token, address, dec }) => {
  const [ch, setCh] = useState(80001);
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      setCh(chain.id);
    }  
  }, []);

  const { data } = useBalance({
    address: address,
    token: token,
    chainId: ch,
  });

  return (
    <Container>
       <div> {!dec ? <Amount value={(Number(data?.formatted))} /> 
        : <Amount value={(Number(data?.formatted)) * dec} /> }</div>
       <div> {data?.symbol}</div>
    </Container>
  );
};

export default BalanceComponent;