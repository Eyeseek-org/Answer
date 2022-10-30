import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Eye7 from "../public/Eye7.png";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Footer from "../sections/Footer";
import {cats} from '../data/cats'
import { LandingSvg } from "../sections/Landing/LandingMain";
import LatestProjects from "../sections/Landing/LatestProjects";
import Features from "../sections/Landing/Features";


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

const Categories = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5%;
    gap: 4%;
    justify-content: center;
`
const Cat = styled.div`
    font-size: 1em;
    font-family: 'Montserrat';
    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }
`

const ACat = styled(Cat)`
    color: white;
`


const Home: NextPage = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All')


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getProjects();
  }, []);

  const getProjects = async () => {
    const config = {
      headers: {
        "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      },
    };
    try {
      if (category === "All") {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"state":1}`, config);
        setProjects(res.data.results);
      }
      else {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"category":"${category}", "state": 1}`, config);
        setProjects(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCat = async(cat) => {
    try {
      await setCategory(cat)
      await getProjects()
    } catch(err) {
        console.log(err)
      }
  }


  return (
    <>
      <Container>
        <Head>
          <title>Eyeseek Funding</title>
          <meta name="title" content="Blockchain crowdfunding application powered by Moralis" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LandingSvg width={'100%'} height={'100%'}/>
        {/* <ImageBox><Image src={Eye1} alt='Eye1' width={'1000px'} /></ImageBox> */}
        <Features />
        <Categories>
            {cats.map((cat) =>
             <div key={cat}>{cat === category ? <Cat onClick={handleCat(cat)}>{cat}</Cat> : <ACat  onClick={()=>{handleCat(cat)}}>{cat}</ACat>}</div>
        )}
        </Categories>
        <LatestProjects data={projects} my={false}/>
        <EyeSevenBox>
        <Image src={Eye7} alt="Eye7" width={"350px"} height={"30px"} />
        </EyeSevenBox>



        <Footer />
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TKH8YE4L07"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TKH8YE4L07');
          `}
        </Script> */}
      </Container>
    </>
  );
};

export default Home;
