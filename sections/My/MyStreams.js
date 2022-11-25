import { useQuery } from "@tanstack/react-query";
import { useAccount, useProvider } from 'wagmi'
import { UniService } from "../../services/DapAPIService";
import styled from 'styled-components'
import { RewardDesc } from "../../components/typography/Descriptions";
import { G } from "../../components/typography/ColoredTexts";
import { Framework } from "@superfluid-finance/sdk-core";
import { MainContainer } from "../../components/format/Box";

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
    const provider = useProvider()

    const query = `/classes/Stream?where={"addressBacker":"${address}", "isActive": true }`
    const { data: streamData } = useQuery(['my-stream'], () => UniService.getDataSingle(query),{
        onSuccess: (data) => {
            // Get data from the stream - - Very similarly to Stream
            getFlowData(data.owner,data.backer,data.chainId)
          },
     });

     const getFlowData = async (o,b,c) => {
        // Key service to retrieve current deposit 
        const sf = await Framework.create({
          provider: provider,
          chainId: c
        })
        const DAIxContract = await sf.loadSuperToken("fDAIx");
        const DAIx = DAIxContract.address;

        try {
          const flow = await sf.cfaV1.getFlow({
            superToken: DAIx,
            sender: o,
            receiver: b,
            providerOrSigner: provider
          })
          if (flow.flowRate !== '0') {
            console.log('Stream found')
          }
        } catch (err) {
          console.log('Error')
        }
      }

    // Verify the stream - pair backer and addressBacker 


    return <MainContainer>
      <Container>
        <RewardDesc>Streaming is an experimental feature, we use for now Superfluid contracts to keep flow secured</RewardDesc>
        <Divider/>
        {streamData ? 
        <RewardDesc>
              <a href={`/project/${streamData.projectId}`} target="_blank" rel="noreferrer"><G>Active stream found on this project</G></a>
        </RewardDesc> : 
        <RewardDesc>You don't have an active stream</RewardDesc>}
        <Divider/>
        <RewardDesc>Right now you can donate only via 1 stream in parallel. We'll do more if users would favor this feature.</RewardDesc>
    </Container>
    </MainContainer>
}

export default MyStreams