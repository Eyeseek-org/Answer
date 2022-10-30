import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import loadingAnimation from "../data/loadingAnimation.json";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Loading = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? (
    <LoadingContainer>
      <Lottie animationData={loadingAnimation} loop={true} />
    </LoadingContainer>
  ) : (
    props.children
  );
};

export default Loading;
