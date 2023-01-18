import type { NextPage } from 'next';
import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { D3Tree } from "../sections/Tree/D3Tree";

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;



const Map: NextPage = () => {
  const [d3Tree, setD3Tree] = useState<any>({});
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);


  
  return (
    <>
      <D3Tree d3Tree={d3Tree} />
    </>
  );
};

export default Map;
