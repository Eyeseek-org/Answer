import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { Framework } from "@superfluid-finance/sdk-core";
import type { NextPage } from "next";
import { useAccount, useProvider, useSigner, useContractEvent, usePrepareContractWrite, useContractWrite } from 'wagmi'
import {abi} from '../../abi/supertoken.js'
import token from '../../abi/token.json'
import styled from 'styled-components'
import axios from 'axios'
import {moralisApiConfig} from '../../data/moralisApiConfig'
import SectionTitle from "../../components/typography/SectionTitle.js";
import ButtonAlt from "../../components/buttons/ButtonAlt.js";

const Container = styled.div`
  padding-left: 17%;
  padding-right: 17%;
  padding-top: 5%;

`
// TBD component to display current stream - Destination, Flow, Amount sent
const StreamComponent = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid #393939;
  min-width: 500px;
  min-height: 500px;
  padding: 5%;
  padding-left: 10%;
`

const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: 5%;
`

const ValueRow = styled.div`
  width: 50%;
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  background: rgba(107, 255, 255, 0.05);
  border-radius: 15px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 23px;
  margin: 1%;
  padding: 1.2%;
  color: #B0F6FF;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  margin-top: 4%;
`
// TBD component to create a stream 
// With new Superfluid stream, it's needed to call axios as well

const Input = styled.input`
  background: inherit;
  border: none;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
  width: 150px;
  padding-left: 10px;
  padding-right: 10px;
`

const ActiveValue = styled.div`
  color: white;
  font-weight: bold;

`

const RowItem = styled.div`
  width: 33%;
`

const Stream: NextPage = () => {
  const router = useRouter()
  const { objectId } = router.query 
  const { address } = useAccount();
  const [recipient, setRecipient] = useState('0xd4924261323DAc5fAAD8524864d35D43d7190F92')
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [amount, setAmount] = useState(1000)
  const [flowRate, setFlowRate] = useState(amount.toString());
  const provider = useProvider()
  const [ev, setEv] = useState(false)
  const { data: signer } = useSigner()
  const [streamFound, setStreamFound] = useState(false)
  const [streamData, setStreamData] = useState()


  const getFlowData = async() => {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    /// TBD need to repair to get actual balance 
    /// TBD find simple way how to find address
    /// TBD pass correct values to the form and send to Superfluid & Moralis 
    try{
      const flow = await sf.cfaV1.getFlow({
        superToken: process.env.NEXT_PUBLIC_AD_TOKEN,
        sender: address,
        receiver: recipient,
        providerOrSigner: provider
      })
      console.log(flow)
    } catch(err){
      console.log(err)
    }
  }
    


  /// TBD - Update Moralis DB together with the streams on chain
  const addStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, { 
        'project': {oid},
        'flowRate': flowRate,
        'isActive': true
      }, moralisApiConfig)
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  const getStreamState = async (oid) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream?where={"projectId":"${oid}", "isActive": true }`, moralisApiConfig)
      if (res.data.results.length > 0) {
        setStreamFound(true)
        setStreamData(res.data.results[0])
      }
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }
  
  const deleteStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, { 
        'project': {oid} 
      }, moralisApiConfig)
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  const listened = () => {
    setEv(true)
  }

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
    contractInterface: abi,
    functionName: 'approve',
    args: ['0xEB796bdb90fFA0f28255275e16936D25d3418603', flowRate],
  })


  // useContractEvent({
  //   addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
  //   contractInterface: abi,
  //   eventName: 'Approval',
  //   listener: (event) => listened(event),
  //   once: true
  // })

  useEffect(() => {
    getFlowData();
    getStreamState(objectId);
  },[])

  const { write } = useContractWrite(config)


  const handleApprove = async () => {
    await write?.()
    setLoading(true)
  }

  useContractEvent({
      addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
      contractInterface: token.abi,
      eventName: 'Approval',
      listener: (_event) => listened(),
      once: true
    })


  async function createNewFlow() {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: address,
        receiver: recipient,
        flowRate: flowRate,
        superToken: DAIx
      });

      const result = await createFlowOperation.exec(signer);
      console.log(result);
      await addStreamState(objectId)

    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  async function deleteFlow() {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    try {
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender: address,
        receiver: recipient,
        superToken: DAIx
      });
  
      console.log("Deleting your stream...");
  
      await deleteFlowOperation.exec(signer);

    } catch (error) {
      console.error(error);
    }
  }
  return <>
   <SectionTitle title='Streaming PoC' subtitle='Stream resources to your favorite project'/>
    <Container>
      <StreamComponent>
      <button
        onClick={() => {
          createNewFlow();
        }}
      >
        Create stream
      </button>
      <button onClick={()=>{deleteFlow()}}>
        Delete stream
      </button>

      <div>
        Result in console
        <p>
          <li>Recipient: {recipient}</li>
          <li>Flow: {flowRate}</li>
        </p>
      </div>

        <Title>{streamFound ? <>Active stream</>: <>New stream</>}</Title>
        <ValueRow>
          <RowItem>Balance</RowItem>
          <RowItem>
          {streamFound ? <ActiveValue>TBD value</ActiveValue> : <Input type='number' placeholder='enter cap' onChange={(e)=>{setFlowRate(e.target.value)}}/>}     
          </RowItem>
          <RowItem>Value</RowItem>
        </ValueRow>
        <ValueRow>
          <RowItem>Receiver</RowItem>
          <RowItem>
          {streamFound ? <ActiveValue>TBD address</ActiveValue> : <Input type='text' placeholder='enter receiver address' onChange={(e)=>{setFlowRate(e.target.value)}}/>}     
          </RowItem>
          <RowItem>Address</RowItem>
        </ValueRow>
        <ValueRow>
          <RowItem>Flow rate</RowItem>
          <RowItem>
            {streamFound ? <ActiveValue>TBD value</ActiveValue> : <Input type='number' placeholder='enter flow rate' onChange={(e)=>{setFlowRate(e.target.value)}}/>}        
          </RowItem>
          <RowItem>$/month</RowItem>
        </ValueRow>
       {!streamFound ?  <ButtonBox><ButtonAlt width={'150px'} text='Start' onClick={handleApprove}/></ButtonBox> : <ButtonBox><ButtonAlt width={'150px'} text='Stop' onClick={handleApprove}/></ButtonBox>}
      </StreamComponent>

    </Container>
  </>
}

export default Stream;