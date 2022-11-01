import { useState } from "react";
import { useRouter } from "next/router"
import { Framework } from "@superfluid-finance/sdk-core";
import type { NextPage } from "next";
import { useAccount, useProvider, useSigner, useContractEvent, usePrepareContractWrite, useContractWrite } from 'wagmi'
import {abi} from '../../abi/supertoken.js'
import token from '../../abi/token.json'
import styled from 'styled-components'
import axios from 'axios'
import {moralisApiConfig} from '../../data/moralisApiConfig'

// TBD component to display current stream - Destination, Flow, Amount sent
const StreamComponent = styled.div`

`

// TBD component to create a stream 
// With new Superfluid stream, it's needed to call axios as well
const Create = styled.div`

`

// TBD component to stop stream  
const Display = styled.div`

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


  /// TBD - Update Moralis DB together with the streams on chain
  const addStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, { 
        'project': {oid} 
        // Cap, FlowRate, State 
      }, moralisApiConfig)
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  const getStreamState = async (oid) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream?where={"project":${oid}`, moralisApiConfig)
      console.log(res)
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
    args: [0xEB796bdb90fFA0f28255275e16936D25d3418603, flowRate],
  })


  useContractEvent({
    addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
    contractInterface: abi,
    eventName: 'Approval',
    listener: (event) => listened(event),
    once: true
  })


  const { write } = useContractWrite(config)


  const handleApprove = async () => {
    await write?.()
    setLoading(true)
  }

  useContractEvent({
      addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
      contractInterface: token.abi,
      eventName: 'Approval',
      listener: (event) => listened(event),
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
      await addStream(objectId)

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
    <div>
      <h2>Create a Flow</h2>
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
    </div>
  </>
}

export default Stream;