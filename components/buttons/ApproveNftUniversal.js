import {useState} from 'react'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import styled from 'styled-components'
import multi from '../../abi/multi.json'
import Rainbow from './Rainbow'
import Lottie from "react-lottie";
import successAnimation from '../../data/successAnimation.json'
import smallLoading from '../../data/smallLoading.json'
import ButtonAlt from './ButtonAlt'


// Animation configs 
const okAnim = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
const loadingAnim = {
    loop: true,
    autoplay: true,
    animationData: smallLoading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

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
    color: white;
    right: 0;
    top: -3px;
    font-family: 'Gemunu Libre';
`

const ApproveNftUniversal = ({tokenContract, spender, amount}) => {
    const { address } = useAccount()
    const [ev, setEv] = useState(false)
    const [loading, setLoading] = useState(false)

    const listened = async() => {
        await setEv(true)
        await setLoading(false)
    }

    const { config } = usePrepareContractWrite({
        address: tokenContract, 
        abi: multi.abi,
        functionName: 'setApprovalForAll',
        args: [spender, true],
    })


    useContractEvent({
        address: tokenContract,
        abi: multi.abi,
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
            <ButtonAlt width={'200px'} text={'Approved'} />}
         </>}
    </Container>
}

export default ApproveNftUniversal