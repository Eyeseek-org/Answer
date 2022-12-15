import { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import IpfsDisplay from '../image/IpfsDisplay'

const NFTDisplay = ({ address, tokenId }) => {
  const [data, setData] = useState();
  const add = ethers.utils.isAddress(address) 


    const getNftMetadata = async () => {
      const header = {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          'Content-Type': 'application/json'
        },
      }
      try {
        const response = await axios.get(`https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}?chain=mumbai`, header)
        const image_url = JSON.parse(response?.data?.metadata)?.image;
        const filtered = image_url.includes('ipfs://') ? image_url.replace('ipfs://', 'https://ipfs.io/ipfs/') : image_url;
        setData(filtered);
        console.log(data)
      } catch (err){
        console.log(err)
      }
    }

  useEffect(() => {
    if (add) {
      getNftMetadata();
    }
  }, []);

  return (
    <>
      {data && data !== undefined && <IpfsDisplay ipfsHash={data} />}
      {!add && <p>Invalid contract address</p>}
    </>
  );
};

export default NFTDisplay;
