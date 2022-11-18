import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNetwork, useBalance } from 'wagmi';
import Amount from './Amount';

const Container = styled.div`
  display: flex;
  font-size: 0.9em;
  font-weight: 400;
  font-family: 'Gemunu Libre';
`;
const BalanceComponent = ({ token, address }) => {
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

  ///TBD multiply with decimals

  return (
    <Container>
      <>
        <Amount value={data?.formatted} /> {data?.symbol}
      </>
    </Container>
  );
};

export default BalanceComponent;