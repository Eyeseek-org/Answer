import Moralis from 'moralis';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const NFTDisplay = ({ address, tokenId }) => {
  const [data, setData] = useState();

  const fetchNftData = async () => {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });

    // TBD recognize chain from the parameter

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      tokenId,
    });

    const image_url = JSON.parse(response?.data?.metadata)?.image;
    const filtered = image_url.includes('ipfs://') ? image_url.replace('ipfs://', 'https://ipfs.io/ipfs/') : image_url;

    setData(filtered);
  };

  useEffect(() => {
    if (address !== '' && tokenId !== 0) {
      fetchNftData();
    }
  }, []);

  return (
    <>
      <Image src={data} alt="alt" width={200} height={200} />
    </>
  );
};

export default NFTDisplay;
