import {useState, useEffect} from 'react'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Rainbow from './Rainbow'
import Lottie from "react-lottie";
import ButtonAlt from './ButtonAlt'
import {okAnim, loadingAnim} from '../animated/Animations';
import { AbsoluteLeft } from '../format/Box'
import { Col } from '../format/Row'

const Container = styled.div`
    position: relative;
`

const Amount = styled.div`
    font-size: 0.8em;
    position: absolute;
    color: ${(props) => props.theme.colors.black};
    right: 0;
    top: -3px;
    font-family: 'Gemunu Libre';
`

const Wrapper = styled.div`
    position: relative;
`

const ApproveUniversal = ({tokenContract, spender, amount, dec}) => {
    const { address } = useAccount()
    const [ev, setEv] = useState(false)
    const [loading, setLoading] = useState(false)

    const listened = async() => {
        setEv(true)
        setLoading(false)
    }


    const { config, error } = usePrepareContractWrite({
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
        write?.()
        setLoading(true)
    }


    return <Container>
        {!address && <Rainbow/>}
        {address && <Wrapper>
        <AbsoluteLeft>
            {ev && !loading && <><Lottie height={30} width={30} options={okAnim} /></>} 
            {!ev && loading && !error && <><Lottie height={50} width={50} options={loadingAnim} /></>}
        </AbsoluteLeft>
            {!ev ?  
            <ButtonAlt 
                width={'200px'} 
                onClick={() => handleApprove()} 
                text={<Col><div>Approve</div><Amount><>{amount / dec}</></Amount></Col>} />
                : 
            <ButtonAlt width={'200px'} text={'Approve again'} onClick={() => handleApprove()}  />}
         </Wrapper>}
    </Container>
}

export default ApproveUniversal
