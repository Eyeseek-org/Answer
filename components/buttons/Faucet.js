import styled from "styled-components"
import {useState} from 'react'
import Button from "./Button"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import faucet from '../../abi/faucet.json'

const Container = styled.div`
    margin-top: 10%;
`
const Faucet = () => {
    const [done, setDone] = useState(false)
    const { config } = usePrepareContractWrite({
        addressOrName: '0xb691033014353d190D661bE697682B46aAf2d7CA',
        contractInterface: faucet.abi,
        functionName: 'requestTokens',
    })

    const listened = async() => {
        await setDone(true)
    }
    useContractEvent({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: faucet.abi,
        eventName: 'FaucetReceived',
        listener: (event) => listened(event),
        once: true
      })

    const { write } = useContractWrite(config)

    const handleFaucet = async () => {
        await write?.()
    }

    return <Container>
            {!done ? <Button text={'Get test tokens'} onClick={()=>{handleFaucet()}}/> :<Buttom text={'Set and done'}/>}
            </Container>
}

export default Faucet