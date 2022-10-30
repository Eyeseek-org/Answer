import {useContractRead} from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'

const Container = styled.div`
    display: flex;
    font-size: 0.9em;
    font-weight: 400;
    font-family: 'Gemunu Libre';
`

const ApprovedComponent = ({address}) => {
    const {data} = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        functionName: 'allowance',
        args: [address, process.env.NEXT_PUBLIC_AD_DONATOR]
      })

        
    return <Container>
        {data && <>Approved: ${data?.toString()}</>}
    </Container>
}

export default ApprovedComponent