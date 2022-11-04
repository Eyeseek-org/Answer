import { useEffect, useState } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner} from 'wagmi'
import {abi} from '../../abi/supertoken.js'
import styled from 'styled-components'
import axios from 'axios'
import {moralisApiConfig} from '../../data/moralisApiConfig'

import Address from "../../components/functional/Address"
import ButtonAlt from "../../components/buttons/ButtonAlt.js";
import Subtitle from "../../components/typography/Subtitle.js";
import ApproveUniversal from "../../components/buttons/ApproveUniversal.js";

const Container = styled.div`
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 5%;
  min-height: 300px;
`
// TBD component to display current stream - Destination, Flow, Amount sent
const StreamComponent = styled.div`
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
  width: 100%;
  padding: 5%;
  padding-left: 10%;
  min-height: 280px;
`

const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: 5%;
`

const ValueRow = styled.div`
  width: 100%;
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
  padding: 1.4%;
  padding-left: 10px;
  padding-right: 10px;
  color: #B0F6FF;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  min-width: 150px;
`

const RowItem = styled.div`
  width: 33%;
`

const RowRightItem = styled(RowItem)`
  text-align: right;
`

const ErrorBox = styled.div`
  color: red;
`

const Stream = ({objectId, recipient}) => {
  const { address } = useAccount();
  const [apiError, setApiError] = useState(false)
  const [flowRate, setFlowRate] = useState(0);
  const provider = useProvider()
  const [ev, setEv] = useState(false)
  const { data: signer } = useSigner()
  const [streamFound, setStreamFound] = useState(false)
  const [streamData, setStreamData] = useState()
  const [deposit, setDeposit] = useState(0)
  const [owedDeposit, setOwedDeposit] = useState(0)
  const [superfluidError, setSuperfluidError] = useState(false)

  // Gameplan 
  // 1. Approve and create a stream from App
  // 2. Add an item to the db - flowRate, deposit
  // 3. Preview - Get stream from DB
  // 4. Synthetic calculation
  // 5. Stop stream from the app


  const getFlowData = async() => {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    /// TBD need to repair to get actual balance 
    /// TBD find simple way how to find address
    /// TBD pass correct values to the form and send to Superfluid & Moralis 
    try{
      const flow = await sf.cfaV1.getFlow({
        superToken: DAIx,
        sender: address,
        receiver: recipient,
        providerOrSigner: provider
      })
      console.log(flow)
      if(flow.flowRate !== '0'){
        setDeposit(flow.deposit)
        setOwedDeposit(flow.owedDeposit)
        setFlowRate(flow.flowRate)
      }
    } catch(err){
      console.log(err)
      setSuperfluidError("Stream not found")
    }
  }
    


  /// TBD - Update Moralis DB together with the streams on chain
  const addStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, { 
        'project': {oid},
        'flowRate': flowRate,
        'recipient': recipient,
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
      } else {
        setStreamFound(false)
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

  useEffect(() => {
    getStreamState(objectId);
  },[])

  async function startStream() {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    const amount = flowRate.toString();
    console.log(DAIx)
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: address,
        receiver: recipient,
        flowRate: amount,
        superToken: DAIx
      });

      const result = await createFlowOperation.exec(signer);
      console.log("Success" + result);
      await addStreamState(objectId)
      setApiError(false)
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
      setApiError(true)
      console.log(address, recipient, amount, DAIx)
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
    <Container>
      <StreamComponent>
        <Title>{streamFound ? <Subtitle text={'Active stream'}/> : <Subtitle text={'New stream'}/>}</Title>
      {streamFound && <ValueRow>
          <RowItem>Deposit</RowItem>
          <RowItem>
            <ActiveValue>{deposit}</ActiveValue>     
          </RowItem>
          <RowRightItem>Value</RowRightItem>
        </ValueRow>}
        <ValueRow>
          <RowItem>Recipient</RowItem>
          <RowItem>
              <ActiveValue><Address address={'0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f'}/></ActiveValue>   
          </RowItem>
          <RowRightItem>Address</RowRightItem>
        </ValueRow>
        <ValueRow>
          <RowItem>Flow rate</RowItem>
          <RowItem>
            {streamFound ? <ActiveValue>{flowRate}</ActiveValue> : <Input type='number' placeholder='enter flow rate' onChange={(e)=>{setFlowRate(e.target.value)}}/>}        
          </RowItem>
          <RowRightItem>dai/mo</RowRightItem>
        </ValueRow>
       {!streamFound ?  
       <ButtonBox>
        <ApproveUniversal tokenContract={'0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f'} spender={'0xEB796bdb90fFA0f28255275e16936D25d3418603'} amount={flowRate}/>
        <ButtonAlt width={'100px'} text='Start' onClick={()=>(startStream())}/></ButtonBox> : 
       <ButtonBox><ButtonAlt width={'100px'} text='Stop' /></ButtonBox>}
      </StreamComponent>
        {apiError && <ErrorBox>Insufficient funds, no approval, or owner = backer</ErrorBox>}
    </Container>
  </>
}

export default Stream;