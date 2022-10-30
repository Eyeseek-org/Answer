import styled from 'styled-components'
import {useBalance} from 'wagmi'

const Container = styled.div`
    display: flex;
    font-size: 0.9em;
    font-weight: 400;
    font-family: 'Gemunu Libre';
`
const BalanceComponent = ({token, address, amount}) => {

    const {data} = useBalance({
        addressOrName: address,
       // token: token,
      })
     // TBD Finish tier - format number to 2 decimals, compare amount to balance, color red if insufficient

    return <Container>
         {amount ? <>Balance: {data?.formatted} {data?.symbol}</> : <>Balance: {data?.formatted} {data?.symbol}</>}
    </Container>
}

export default BalanceComponent