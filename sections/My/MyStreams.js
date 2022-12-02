import { useQuery } from "@tanstack/react-query";
import {useState} from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { UniService } from "../../services/DapAPIService";
import styled from 'styled-components'
import { RewardDesc } from "../../components/typography/Descriptions";
import { G } from "../../components/typography/ColoredTexts";
import { Framework } from "@superfluid-finance/sdk-core";
import { MainContainer } from "../../components/format/Box";
import SuperBalance from "../../components/functional/SuperBalance";
import { Col, RowCenter } from "../../components/format/Row";
import Subtitle from "../../components/typography/Subtitle";
import ButtonAlt from "../../components/buttons/ButtonAlt";
import {ethers} from 'ethers'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Divider = styled.div`
    height: 1px;
    margin-bottom: 2%;
`

const BalDivider = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.font};
  width: 100%;
  padding-bottom: 2%;
  margin-top: 2%;
`

const Input = styled.input`
  background: inherit;
  border: none;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
  width: 150px;
  padding-left: 10px;
  padding-right: 10px;
`

const MyStreams = () => {
    const {address} = useAccount()
    const provider = useProvider()
    const [wrappedAmount, setWrappedAmount] = useState(1000)
    const { data: signer } = useSigner()
    const token = '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f'
    const [chainId, setChainId] = useState(80001)
    const query = `/classes/Stream?where={"addressBacker":"${address}", "isActive": true }`
    const { data: streamData } = useQuery(['my-stream'], () => UniService.getDataSingle(query),{
        onSuccess: (data) => {
            // Get data from the stream - - Very similarly to Stream
            setChainId(data.chainId)
            getFlowData(data.owner,data.backer,chainId)
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

    const wrap = async(amt) => {
      const sf = await Framework.create({
        provider: provider,
        chainId: 80001
      })
    
    
      const DAIx = await sf.loadSuperToken(
        token
      );
  
    
      try {
        console.log(`upgrading $${amt} DAI to DAIx`);
        const amtToUpgrade = ethers.utils.parseEther(amt.toString());
        const upgradeOperation = DAIx.upgrade({
          amount: amtToUpgrade.toString()
        });
        const upgradeTxn = await upgradeOperation.exec(signer);
        await upgradeTxn.wait().then(function (tx) {
          console.log(`Congrats - you've just upgraded DAI to DAIx!`);
        });
      } catch (error) {
        console.error(error);
      }
    }
  
  
    async function unwrap(amt) {
      const sf = await Framework.create({
        provider: provider,
        chainId: 80001
      })
  
    
      const DAIx = await sf.loadSuperToken(token);
      try {
        console.log(`Downgrading $${amt} fDAIx...`);
        const amtToDowngrade = ethers.utils.parseEther(amt.toString());
        const downgradeOperation = DAIx.downgrade({
          amount: amtToDowngrade.toString()
        });
        const downgradeTxn = await downgradeOperation.exec(signer);
        await downgradeTxn.wait().then(function (tx) {
          console.log(`Looks like success`);
        });
      } catch (error) {
        console.error(error);
      }
    }


    return <MainContainer>
      <Container>
        <Container><Subtitle text='Active stream'/>        
        {streamData ? 
        <RewardDesc>
              <a href={`/project/${streamData.projectId}`} target="_blank" rel="noreferrer"><G>You have 1 active stream <u>here</u></G></a>
        </RewardDesc> : 
        <RewardDesc>You don't have an active stream</RewardDesc>}</Container>
        <Divider/>
        <RewardDesc>Streaming is an experimental feature, we use for now Superfluid contracts to keep flow secured</RewardDesc>
        <Divider/>
        <RewardDesc>Right now you can donate only via 1 stream in parallel. We'll do more if users would favor this feature.</RewardDesc>
        <BalDivider/>
        <Col><Subtitle text='Wrapped balance'/><SuperBalance chain={80001} address={address} /></Col>
        <Divider/>
        <RowCenter>
            <Input type='number' placeholder='un/wrap amount' onChange={(e) => { setWrappedAmount(e.target.value) }} />
           <ButtonAlt width={100} text='Wrap' onClick={()=>{wrap(wrappedAmount)}}/>
           <ButtonAlt width={100} text='Unwrap' onClick={()=>{unwrap(wrappedAmount)}}/>
        </RowCenter>
    </Container>
    </MainContainer>
}

export default MyStreams