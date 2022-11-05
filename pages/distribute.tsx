import styled from 'styled-components'
import type { NextPage } from "next";
import { usePrepareContractWrite, useContractWrite, useNetwork } from 'wagmi';
import {useState, useEffect} from 'react'
import Lottie from "react-lottie";

import donation from "../abi/donation.json";
import SectionTitle from '../components/typography/SectionTitle';
import successAlt from '../data/animations/successAlt.json';
import { GetFundingAddress } from '../components/functional/GetContractAddress';

const okAnim = {
    loop: false,
    autoplay: true,
    animationData: successAlt,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Container = styled.div`
    padding-left: 17%;
    padding-right: 17%;
    display: flex;
    flex-direction: row;
`

const Input = styled.div`
    display: flex;
    font-family: 'Neucha';
    letter-spacing: 0.3px;
    flex-direction: column;
    margin-top: 8%;
    max-width: 500px;
    gap: 15px;
    background: black;
    padding: 2%;
    border-radius: 15px;
`

const Animations = styled.div`
    position: relative;
`

const AnimBox = styled.div`
    position: absolute;
    left: 20%;
`

const AnimBox2 = styled.div`
    position: absolute;
    bottom: 10%;
`

const AnimBox3 = styled.div`
    position: absolute;
    bottom: 55%;
`

const Distribute: NextPage = () => {
    const [identifier, setIdentifier] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [ev, setEv] = useState<boolean>(false);
    const {chain} = useNetwork();

    const [add, setAdd] = useState<string>(process.env.NEXT_PUBLIC_AD_DONATOR);

    useEffect(() => {
        setAdd(GetFundingAddress(chain))
    }, [])
    
    const { config } = usePrepareContractWrite({
        addressOrName: add,
        contractInterface: donation.abi,
        functionName: 'distribute',
        args: [identifier, '0x2107B0F3bB0ccc1CcCA94d641c0E2AB61D5b8F3E'],
    })

    const { write } = useContractWrite(config)

    const handleContract = async () => { write?.()}

    // useContractEvent({
    //     addressOrName: add,
    //     contractInterface: donation.abi,
    //     eventName: 'DistributionAccomplished',
    //     listener: (event) => useEv(event),
    //     once: true
    // })

    /// TBD lottie animation

    const useEv = async(event) => {
        setLoading(true)
        await setEv(true);
        await setLoading(false)
    }


    return <>
    <SectionTitle title='Distribute' subtitle='Reward distribution helper'/>
        <Container>
          <div> <p>For hackathon admin only...</p>
            <Input>
                <div>Pass project ID to distribute rewards from successfully funded project</div>
              <div><input type="number" placeholder={'Project ID'} value={identifier} onChange={(e) => setIdentifier(Number(e.target.value))} />
              <button disabled={!write} onClick={()=>{handleContract()}}>DEW IT</button></div>
              {loading && <div>Processing...</div>}
              {ev && <div>Success!</div>}
            </Input></div>
         {ev && <Animations><AnimBox><Lottie height={100} width={100} options={okAnim} /></AnimBox>
            <AnimBox2><Lottie height={100} width={100} options={okAnim} /></AnimBox2>
            <AnimBox3><Lottie height={100} width={100} options={okAnim} /></AnimBox3></Animations>}
        </Container>
    </>
}

export default Distribute