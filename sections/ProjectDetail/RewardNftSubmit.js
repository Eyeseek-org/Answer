import styled from 'styled-components';
import { useState } from 'react';
import {useContractWrite, usePrepareContractWrite, useContractEvent} from 'wagmi'
import donation from "../../abi/donation.json"
import multi from "../../abi/multi.json"
import ApproveNftUniversal from '../../components/buttons/ApproveNftUniversal';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import ErrText from '../../components/typography/ErrText';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-end;
`

const RewardNftSubmit = ({add, home, pid, pledge, tokenAddress, nftId, cap}) => {
    const [ev, setEv] = useState(false)

    const listened = async() => {
        await setEv(true)
    }

    const handleSubmit = async () => {
        await write?.()
    }
    useContractEvent({
        address: tokenAddress,
        abi: multi.abi,
        eventName: 'ApprovalForAll',
        listener: (event) => listened(event),
        once: true
      })

    const { config, error } = usePrepareContractWrite({
        address: add,
        abi: donation.abi,
        chainId: home,
        functionName: 'createNftReward',
        args: [pid, cap, tokenAddress, nftId],
    });

    const { write } = useContractWrite(config);

    return <Container>
        <ButtonBox>
             <ApproveNftUniversal tokenContract={tokenAddress} spender={add} cap={cap} nftId={nftId} />
             <ButtonAlt text={'Submit'} onClick={()=>{handleSubmit()}}  />
        </ButtonBox> 
        {error && <ErrText text={'Missing/Incorrect parameter'} />}
    </Container>
}

export default RewardNftSubmit