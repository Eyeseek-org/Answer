import { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { useNetwork, useAccount, useProvider, useSigner } from 'wagmi'
import { abi } from '../../abi/supertoken.js'
import { useQuery } from "@tanstack/react-query";
import { UniService } from "../../services/DapAPIService";
import styled from 'styled-components'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'

import Address from "../../components/functional/Address"
import ButtonAlt from "../../components/buttons/ButtonAlt";
import Subtitle from "../../components/typography/Subtitle";
import {Reference} from '../../components/typography/Descriptions'
import ApproveUniversal from "../../components/buttons/ApproveUniversal";
import StreamCounter from "../../components/functional/StreamCounter";
import StreamBalances from './StreamBalances';
import { BetweenRow } from "../../components/format/Row.js";

const Container = styled.div`
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 5%;
  min-height: 300px;
`
// TBD component to display current stream - Destination, Flow, Amount sent
const StreamComponent = styled.div`
  background: ${(props) => props.theme.colors.transparent};
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  min-height: 280px;
`

const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 1.1em;
`

const ValueRow = styled.div`
  width: 100%;
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.invisible};
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
  color: ${(props) => props.theme.colors.primary};
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
  font-size: 0.8em;
  font-family: 'Neucha';
`

const A = styled.a`
  color: green;
  text-decoration: underline;
  margin-left: 5px;
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
`


const Stream = ({ objectId, recipient, chainId }) => {
  const { address } = useAccount();
  const [apiError, setApiError] = useState(false)
  const [flowRate, setFlowRate] = useState(0);
  const provider = useProvider()
  const { data: signer } = useSigner()
  const [streamFound, setStreamFound] = useState(false)
  const [deposit, setDeposit] = useState(0)
  const [superfluidError, setSuperfluidError] = useState(false)
  const [newStream, setNewStream] = useState(false)
  const [myStream, setMyStream] = useState(false)
  const [displayRate, setDisplayRate] = useState(50)
  const [superTokenAddress, setSuperTokenAddress] = useState('0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f')
  const {chain} = useNetwork()

  /// CFAv1Forwarder
  const superContract = "0xcfA132E353cB4E398080B9700609bb008eceB125" // Same address fro both Polygon and Optimism


  // Multiple currencies


  const query = `/classes/Stream?where={"projectId":"${objectId}", "isActive": true }`
  const { data: streamData } = useQuery(['streams'], () => UniService.getDataAll(query),{
    onError: () => {
      setApiError(true)
    },
    onSuccess: () => {
      setApiError(false)
      if (streamData && streamData.length > 0) {
        setStreamFound(true)
        for (let i = 0; i < streamData.length; i++) {
          if (streamData[i].flowRate) {
            /// Error here - For each array item add number to the displayRate total
            setDisplayRate(parseInt(displayRate) + parseInt(streamData[i].flowRate))
          }
        }
      }
    }
  });

  useEffect(() => {
    getFlowData()
  }, [])


  // Maybe rather call on backend - Aggregate automations 

  const getFlowData = async () => {
    // Key service to retrieve current deposit 
    const sf = await Framework.create({
      provider: provider,
      chainId: chainId
    })
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    await setSuperTokenAddress(DAIx)
    /// TBD need to repair to get actual balance 
    /// TBD find simple way how to find address
    /// TBD pass correct values to the form and send to Superfluid & Moralis 
    try {
      const flow = await sf.cfaV1.getFlow({
        superToken: DAIx,
        sender: address,
        receiver: recipient,
        providerOrSigner: provider
      })
      if (flow.flowRate !== '0') {
        setMyStream(true)
        setDeposit(flow.deposit)
        setFlowRate(flow.flowRate)
      }
    } catch (err) {
      console.log(err)
      setSuperfluidError("Stream not found")
    }
  }


  /// TBD - Update Moralis DB together with the streams on chain
  const addStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, {
        'projectId': oid,
        'flowRate': flowRate,
        'owner': address,
        'isActive': true,
        'addressBacker': address,
      }, moralisApiConfig)
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  const deleteStreamState = async (oid) => {
    // Only owner of the stream should be able to delete it
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, {
        'projectId': { oid },
        'isActive': false
      }, moralisApiConfig)
      setApiError(false)
    } catch (error) {
      console.log(error)
      setApiError(true)
    }
  }

  async function startStream() {
    const sf = await Framework.create({
      provider: provider,
      chainId: chainId
    })
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    const amount = flowRate.toString();
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: address,
        receiver: recipient,
        flowRate: amount,
        superToken: DAIx
      });

      await createFlowOperation.exec(signer);
      await addStreamState(objectId)
      setApiError(false)
      await setNewStream(false)
      await setStreamFound(true)
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
      setApiError(true)
    }
  }

  async function stopStream() {
    const sf = await Framework.create({
      provider: provider,
      chainId: chainId
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
      await deleteStreamState(objectId)
      setStreamFound(false)
      setMyStream(false)

    } catch (error) {
      console.error(error);
    }
  }

  return <>
    <Container>
      <StreamComponent>
        {newStream ? <>
          <Title><Subtitle text={'New stream'} /></Title>
          <ErrorBox>
       Highly experimental feature - accepts only
        <A href='https://docs.superfluid.finance/superfluid/developers/super-tokens/super-token-faucet' rel="noopener noreferrer" target="_blank">Super token</A> 
        </ErrorBox>
          <ValueRow>
            <RowItem>Recipient</RowItem>
            <RowItem>
              <ActiveValue><Address address={recipient} /></ActiveValue>
            </RowItem>
            <RowRightItem>Address</RowRightItem>
          </ValueRow>

          <ValueRow>
            <RowItem>Flow rate</RowItem>
            <RowItem>
              <Input type='number' placeholder='enter flow rate' onChange={(e) => { setFlowRate(e.target.value) }} />
            </RowItem>
            <RowRightItem>dai/mo</RowRightItem>
          </ValueRow>

         <BetweenRow>
            <ApproveUniversal tokenContract={superTokenAddress} spender={superContract} amount={flowRate} />
            {address && <ButtonAlt width={'100px'} text='Start' onClick={() => (startStream())} />}
            </BetweenRow>
          {apiError && <ErrorBox>Insufficient funds, no approval, or owner = backer</ErrorBox>}

        </> : <>
          {streamFound ? <>
            <Title><Subtitle text={'Overview'} /></Title>
            <ValueRow>
              <RowItem>Flow rate</RowItem>
              <RowItem>
                <ActiveValue>{displayRate}</ActiveValue>
              </RowItem>
              <RowRightItem>dai/mo</RowRightItem>
            </ValueRow>

            <ValueRow>
              <RowItem>Deposited</RowItem>
              <RowItem>
                <ActiveValue><StreamCounter startValue={deposit} endValue={displayRate} /></ActiveValue>
              </RowItem>
              <RowRightItem>Value</RowRightItem>
            </ValueRow>
            <BetweenRow>
          {myStream ?    <ButtonAlt width={'100%'} text='Close stream' onClick={()=>{stopStream()}}  /> : <>
            {address && recipient !== address && <ButtonAlt width={'100%'} text='Setup stream' onClick={()=>{setNewStream(true)}}  />} 
            {chain && chain.id !== chainId && <ErrorBox>Wrong network</ErrorBox>}
          </>}
            </BetweenRow>
          </> : <> 
          <Title><Subtitle text={'No active stream found'} /></Title>
              <BetweenRow>
               {address && recipient !== address ? <ButtonAlt width={'100%'} text='Setup stream' onClick={()=>{setNewStream(true)}}  /> : <></>}
              </BetweenRow>
              </>
          }
        </>}
        <BetweenRow>
               <a href='https://app.superfluid.finance' rel="noopener noreferrer" target="_blank">  
                <Reference>Manage your streams in Superfluid App</Reference>
               </a>
            </BetweenRow>
        </StreamComponent>
    {newStream &&  <StreamBalances 
                        address={address} 
                        provider={provider} 
                        signer={signer} 
                        token={superTokenAddress} 
                        superContract={superContract} 
                        chainId={chainId}/>}
    </Container>
  </>
}

export default Stream;
