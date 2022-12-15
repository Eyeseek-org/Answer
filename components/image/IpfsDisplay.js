import {useState, useEffect} from 'react'
import styled from 'styled-components'

const Img = styled.img`
    width: '100%';
    height: '100%';
    max-height: 300px;
    max-width: 300px;
`

const IpfsDisplay = ({ ipfsHash }) => {	
    const [ipfsUrl, setIpfsUrl] = useState(null);
    useEffect(() => {
        if (ipfsHash) {
        const url = `https://ipfs.io/ipfs/${ipfsHash}`;
        setIpfsUrl(url);
        }
    }, [ipfsHash]);
    return <>

        {ipfsUrl && (
            <Img
                src={ipfsUrl}
                alt="invalid ipfs"
            />
        )}
    </>
}

export default IpfsDisplay