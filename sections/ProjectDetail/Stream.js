import { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { useNetwork, useAccount, useProvider, useSigner, useSwitchNetwork } from 'wagmi'
import styled from 'styled-components'
import axios from 'axios'
import { moralisApiConfig } from '../../data/moralisApiConfig'
import Address from "../../components/functional/Address"
import ButtonAlt from "../../components/buttons/ButtonAlt";
import Subtitle from "../../components/typography/Subtitle";
import {RewardDesc} from '../../components/typography/Descriptions'
import ApproveUniversal from "../../components/buttons/ApproveUniversal";
import StreamCounter from "../../components/functional/StreamCounter";
import StreamBalances from './StreamBalances';
import { BetweenRow } from "../../components/format/Row.js";
import ButtonErr from "../../components/buttons/ButtonErr.js";
import {notify} from 'reapop'
import {useDispatch} from 'react-redux'
import { useMoralisCloudFunction } from "react-moralis";

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
  padding: 10px;
`

const ActiveValue = styled.div`
  color: white;
  min-width: 150px;
`

const RowItem = styled.div`
  font-family: 'Gemunu Libre';
  width: 33%;
  color: ${(props) => props.theme.colors.primary};
  @media (min-width: 1550px) {
    font-size: 1.2em;
  }
`

const RowRightItem = styled(RowItem)`
  text-align: right;
`

const ErrorBox = styled.div`
  color: red;
  font-size: 0.8em;
  font-family: 'Neucha';
`

const Stream = ({ objectId, recipient, chainId }) => {
  const { address } = useAccount();
  const [apiError, setApiError] = useState(false)
  const [flowRate, setFlowRate] = useState(0);
  const provider = useProvider()
  const { data: signer } = useSigner()
  const [streamTotal, setStreamTotal] = useState()
  const [sumDeposited, setSumDeposited] = useState(0)
  const [newStream, setNewStream] = useState(false)
  const [displayRate, setDisplayRate] = useState(0)
  const [superTokenAddress, setSuperTokenAddress] = useState('0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f')
  const {chain} = useNetwork()
  const { switchNetwork } = useSwitchNetwork();

  const dispatch = useDispatch() 

  const noti = (text, type) => {
    dispatch(notify(text, type))
  }

  /// CFAv1Forwarder
  const superContract = "0xcfA132E353cB4E398080B9700609bb008eceB125" // Same address fro both Polygon and Optimism

  const params = 
  {
    "projectId": objectId
  }

    const { fetch } = useMoralisCloudFunction(
        "getStreamData", params
      );
    
      const cloudCall = () => {
        fetch({
          onSuccess: (data) => {
            setStreamTotal(data)
            setDisplayRate(data.flowRate)
            setSumDeposited(data.deposited)
          }, 
          onError: (error) => console.log(error)
        });
      };

  useEffect(() => {
    cloudCall()
  }, [])

  /// TBD - Update Moralis DB together with the streams on chain
  const addStreamState = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Stream`, {
        'projectId': oid,
        'flowRate': flowRate,
        'owner': recipient,
        'isActive': true,
        'chainId': chainId,
        'addressBacker': address,
      }, moralisApiConfig)
      noti("Well done, stream was successfully created", "success")
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
      noti("Stream was deactivated", "success")
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
      setNewStream(false)
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
      setFlowRate(0)

    } catch (error) {
      console.error(error);
    }
  }

  return <>
    <Container>
      <StreamComponent>
        {newStream ? <>
          <Title><Subtitle text={'New stream'} /></Title>
          <RewardDesc>
            Experimental feature - accepts only wrapped DAIx (fDAIx) as a deposit.
        </RewardDesc>
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
            <ApproveUniversal tokenContract={superTokenAddress} spender={superContract} amount={flowRate} dec={1000000} />
            {address && <ButtonAlt width={'100px'} text='Start' onClick={() => (startStream())} />}
            </BetweenRow>
          {apiError && <ErrorBox>Insufficient funds or allowance</ErrorBox>}
        </> : <>
          {streamTotal ? <>
            <Title><Subtitle text={'Overview'} /></Title>
            <ValueRow>
              <RowItem>Flow rate</RowItem>
              <RowItem>
                <ActiveValue>${displayRate}</ActiveValue>
              </RowItem>
              <RowRightItem>monthly</RowRightItem>
            </ValueRow>

            <ValueRow>
              <RowItem>Deposited</RowItem>
              <RowItem>
                <ActiveValue><StreamCounter startValue={sumDeposited} endValue={displayRate} /></ActiveValue>
              </RowItem>
              <RowRightItem>total</RowRightItem>
            </ValueRow>
            <BetweenRow>
           {address === recipient ?  <ButtonAlt width={'100%'} text='Close stream' onClick={()=>{stopStream()}}  /> : <>
            {address && recipient !== address && <ButtonAlt width={'100%'} text='Setup stream' onClick={()=>{setNewStream(true)}}  />} 
            {address && recipient === address && <RewardDesc>Cannot setup stream to yourself</RewardDesc>}
            {chain && chain.id !== chainId && <ButtonErr text='Wrong network' onClick={() => switchNetwork(chain)} width={'250px'}/>}
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
        </StreamComponent>
        {newStream &&  <StreamBalances 
                            address={address} 
                            provider={provider} 
                            signer={signer} 
                            token={superTokenAddress} 
                            superContract={superContract} 
                            chainId={chainId}
                            />}
    </Container>
  </>
}

export default Stream;
