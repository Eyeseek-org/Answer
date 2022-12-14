import {useContractRead, useNetwork} from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Amount from "./Amount";
import { ethers } from 'ethers';

const Container = styled.div`
      display: flex;
      font-size: 0.9em;
      font-weight: 400;
      font-family: 'Gemunu Libre';
    @media {
      font-size: 1.2em;
  }
`

const Allowance = ({address, spender, apprToken, tokenSymbol}) => {
    const {chain} = useNetwork()


    var fullValue

    const {data} = useContractRead({
        address: apprToken,
        abi: token.abi,
        chainId: chain.id,
        functionName: 'allowance',
        args: [address, spender],
        watch: true,
      })

      if (data){
        fullValue = ethers.utils.formatEther(data);
      }

        
    return <Container>
        {data && <><Amount value={data} /> {tokenSymbol}</>}
    </Container>
}

export default Allowance