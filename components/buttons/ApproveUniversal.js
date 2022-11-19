import {useState} from 'react'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Rainbow from './Rainbow'
import Lottie from "react-lottie";
import ButtonAlt from './ButtonAlt'
import {okAnim, loadingAnim} from '../animated/Animations';

const Container = styled.div`
    position: relative;
`

const ApprovalBox = styled.div`
    position: absolute;
    bottom: 1px;
    left: 0;
    z-index: 50;
`

const Approve = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const Amount = styled.div`
    font-size: 0.8em;
    position: absolute;
    color: ${(props) => props.theme.colors.font};
    right: 0;
    top: -3px;
    font-family: 'Gemunu Libre';
`

const ApproveUniversal = ({tokenContract, spender, amount}) => {
    const { address } = useAccount()
    const [ev, setEv] = useState(false)
    const [loading, setLoading] = useState(false)

    const listened = async() => {
        await setEv(true)
        await setLoading(false)
    }
    const { config } = usePrepareContractWrite({
        address: tokenContract,
        abi: token.abi,
        functionName: 'approve',
        args: [spender, amount],
    })


    useContractEvent({
        address: tokenContract,
        abi: token.abi,
        eventName: 'Approval',
        listener: (event) => listened(event),
        once: true
      })
    

    const { write } = useContractWrite(config)


    const handleApprove = async () => {
        await write?.()
        setLoading(true)
    }

    return <Container>
        <ApprovalBox>
            {ev && loading && <><Lottie height={30} width={30} options={okAnim} /></>} 
            {!ev && loading && <><Lottie height={50} width={50} options={loadingAnim} /></>}
        </ApprovalBox>
        {!address && <Rainbow/>}
        {address && <>
            {!ev ?  
            <ButtonAlt 
                width={'200px'} 
                onClick={() => handleApprove()} 
                text={<Approve><div>Approve</div><Amount>{amount}</Amount></Approve>} />
                : 
            <ButtonAlt width={'200px'} text={'Approve again'} onClick={() => handleApprove()}  />}
         </>}
    </Container>
}

export default ApproveUniversal
