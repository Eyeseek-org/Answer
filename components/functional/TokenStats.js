import { Row } from '../format/Row'
import Address from './Address'
import Amount from './Amount'


const TokenStats = ({ address, amount, name }) => {
    return <Row>
        {address &&   <><Amount value={amount} />x   <Address address={address}/> </>}
    </Row>    
}
export default TokenStats