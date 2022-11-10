import Moralis from "moralis";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const Image = styled.img`
  width: auto;
  height: auto;
`;

const NFTDisplay = ({ address, tokenId }) => {
  const [data, setData] = useState();

  const fetchNftData = async () => {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      tokenId,
    });

    const image_url = JSON.parse(response?.data?.metadata)?.image;
    const filtered = image_url.includes("ipfs://") ? image_url.replace("ipfs://", "https://ipfs.io/ipfs/") : image_url;

    setData(filtered);
  };

  useEffect(() => {
    fetchNftData();
  }, []);

  return <Image src={data} />;
};

export default NFTDisplay;