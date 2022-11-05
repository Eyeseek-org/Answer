import styled from 'styled-components'
import {useBalance} from 'wagmi'
import Amount from "./Amount";

const Container = styled.div`
    display: flex;
    font-size: 0.9em;
    font-weight: 400;
    font-family: 'Gemunu Libre';
`
const BalanceComponent = ({token, address, amount}) => {

    const {data} = useBalance({
        addressOrName: address,
        token: token
      })

    return <Container>
         {amount ? <>Balance: <Amount value={amount} /> {data?.symbol}</> : <>Balance: <Amount value={data?.formatted} /> {data?.symbol}</>}
    </Container>
}

export default BalanceComponent