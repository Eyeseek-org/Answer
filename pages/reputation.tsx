import type { NextPage } from 'next';
import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;



const Reputation: NextPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  
  return (
    <>
      <Container>
      </Container>
    </>
  );
};

export default Reputation;
