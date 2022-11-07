import {useState, useEffect} from 'react'
import {useContractRead, useNetwork} from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Amount from "./Amount";
import { GetTokenAddress, GetFundingAddress } from './GetContractAddress';
import { ethers } from 'ethers';

const Container = styled.div`
    display: flex;
    font-size: 0.9em;
    font-weight: 400;
    font-family: 'Gemunu Libre';
`

const ApprovedComponent = ({address}) => {
    const [add, setAdd] = useState(process.env.NEXT_PUBLIC_AD_DONATOR)
    const [tokenAdd, setTokenAdd] = useState(process.env.NEXT_PUBLIC_AD_TOKEN)
    const {chain} = useNetwork()

    useEffect(() => {
        setAdd(GetFundingAddress(chain))
        setTokenAdd(GetTokenAddress(chain))
    },[])

    var fullValue

    const {data} = useContractRead({
        addressOrName: tokenAdd,
        contractInterface: token.abi,
        functionName: 'allowance',
        args: [address, add],
        watch: true,
      })

      if (data){
        fullValue = ethers.utils.formatEther(data);
      }

        
    return <Container>
        {data && <>Approved: <Amount value={fullValue} /></>}
    </Container>
}

export default ApprovedComponent