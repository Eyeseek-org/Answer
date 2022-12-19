import { Col, Row } from '../format/Row'
import Address from './Address'
import Amount from './Amount'
import { useToken } from 'wagmi'
import MyTooltip from '../Tooltip'
import {useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const TokenBox = styled.div`
    font-size: 0.9em;
`

const TokenStats = ({ address, amount, chain }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const { data } = useToken({
        address: address,
        chainId: chain
      })

      console.log(data)

    return <Container>
        {data && showTooltip && <MyTooltip text={data?.name} />}
        {address &&   <Col>
        <TokenBox onMouseEnter={()=>{setShowTooltip(true)}}  onMouseLeave={()=>{setShowTooltip(false)}}><Amount value={amount} />x {data && <>{data?.symbol}</>}</TokenBox>  
        <div><Address address={address}/></div> </Col>}
    </Container>    
}
export default TokenStats