import {useState} from 'react';
import { useQuery } from "@tanstack/react-query";
import { useAccount, useProvider, useSigner } from 'wagmi'
import { UniService } from "../../services/DapAPIService";
import styled from 'styled-components'
import { RewardDesc } from "../../components/typography/Descriptions";
import { F, G } from "../../components/typography/ColoredTexts";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Divider = styled.div`
    height: 1px;
    margin-bottom: 2%;
`

const MyStreams = () => {
    const {address} = useAccount()
    const [owner, setOwner] = useState()
    const [backer, setBacker] = useState()


    const query = `/classes/Stream?where={"addressBacker":"${address}", "isActive": true }`
    const { data: streamData } = useQuery(['my-stream'], () => UniService.getDataSingle(query),{
        onSuccess: (data) => {
            setOwner(data.owner)
            setBacker(data.addressBacker)
            // Get data from the stream - - Very similarly to Stream
          },
     });

    // Verify the stream - pair backer and addressBacker 


    return <Container>
        <RewardDesc>Streaming is an experimental feature, we use for now Superfluid contracts to keep flow secured</RewardDesc>
        <Divider/>
        {streamData ? 
        <RewardDesc>Hey, you have an active stream on  
              <a href={`/project/${streamData.projectId}`} target="_blank" rel="noreferrer"><G> this project</G></a>
        </RewardDesc> : 
        <RewardDesc>You don't have an active stream</RewardDesc>}
        <Divider/>
        <a href='https://app.superfluid.finance' rel="noopener noreferrer" target="_blank">  
            <RewardDesc>If you think otherwise, check your current status in <F> Superfluid App</F></RewardDesc>
        </a>
    </Container>
}

export default MyStreams