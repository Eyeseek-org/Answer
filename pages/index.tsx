import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Eye7 from '../public/Eye7.png';
import { useEffect } from 'react';
import Footer from '../sections/Footer/Footer';
import LandingMain from '../sections/Landing/LandingMain';
import LatestProjects from '../sections/Landing/LatestProjects';
import Features from '../sections/Landing/Features';
import Partners from '../sections/Landing/Partners';
import Script from 'next/script';
import {motion, useScroll} from "framer-motion"
import ViewFade from '../components/animated/ViewFade';

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;

const EyeSevenBox = styled.div`
  margin: 5%;
  text-align: center;
  position: relative;
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


  return (
    <>
      <Container>
        <Head>
          <title>Eyeseek Funding</title>
          <meta property="og:title" content="Eyeseek Funding" key="title" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LandingMain width={'60%'} height={'50%'} />
        <ViewFade comp={<Features/>}/>
        <ProgressLine style={{ scaleX: scrollYProgress }} />  
        <LatestProjects my={false} />
        <ViewFade comp={<EyeSevenBox><Image src={Eye7} alt="Eye7" width={'350px'} height={'30px'} /></EyeSevenBox>}/>
        <ViewFade comp={<Footer/>}/>
        <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-WV83C9F" strategy="afterInteractive" />
      </Container>
    </>
  );
};

export default Home;
