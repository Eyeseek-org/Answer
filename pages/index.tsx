import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import Eye7 from '../public/Eye7.png';
import { useEffect } from 'react';
import Footer from '../sections/Footer';

import LandingMain from '../sections/Landing/LandingMain';
import LatestProjects from '../sections/Landing/LatestProjects';
import Features from '../sections/Landing/Features';
import Script from 'next/script';

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
`;

const EyeSevenBox = styled.div`
  margin: 5%;
  text-align: center;
  position: relative;
`;

const Home: NextPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Container>
        <Head>
          <title>Eyeseek Funding</title>
          <meta name="title" content="Blockchain crowdfunding application powered by Moralis" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LandingMain width={'100%'} height={'100%'} />
        {/* <ImageBox><Image src={Eye1} alt='Eye1' width={'1000px'} /></ImageBox> */}
        <Features />
        <LatestProjects my={false} />
        <EyeSevenBox>
          <Image src={Eye7} alt="Eye7" width={'350px'} height={'30px'} />
        </EyeSevenBox>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GTM-WV83C9F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', GTM-WV83C9F');
          `}
        </Script>
      </Container>
    </>
  );
};

export default Home;
