import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { useEffect } from 'react';
import Script from 'next/script';
import {motion, useScroll, useSpring} from "framer-motion"
import ViewFade from '../components/animated/ViewFade';
import FooterEyes from '../components/animated/FooterEyes';

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;


const ProgressLine = styled(motion.div)`
  height: 0.5px;
  background: ${({ theme }) => theme.colors.border};
  width: 100%;
`

const Home: NextPage = () => {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <>
      <Container>
        <Head>
          <title>Eyeseek Funding</title>
          <meta property="og:title" content="Eyeseek Funding" key="title" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Container>
    </>
  );
};

export default Home;
