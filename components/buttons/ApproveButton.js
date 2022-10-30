import {useState} from 'react'
import Button from './Button'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Rainbow from './Rainbow'
import Lottie from "react-lottie";
import successAnimation from '../../data/successAnimation.json'
import smallLoading from '../../data/smallLoading.json'
import { BigNumber,utils } from 'ethers'

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

const ApproveButton = (sum) => {
    const { address } = useAccount()
    const [ev, setEv] = useState(false)
    const [loading, setLoading] = useState(false)


    const decimals = 18;
    const input = (sum.sum);
    const amount = BigNumber.from(input).mul(BigNumber.from(10).pow(decimals));

    const dec = utils.formatUnits(amount, decimals);

    const listened = () => {
        setEv(true)
    }
    const { config } = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_AD_DONATOR, amount],
    })


    useContractEvent({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
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
        {address && 
         <Button 
            width={'200px'} 
            disabled={!write} 
            onClick={() => handleApprove()} 
            text={<Approve><div>Approve</div><Amount>${sum.sum}</Amount></Approve>} /> 
        }
    </Container>
}

export default ApproveButton