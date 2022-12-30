import styled, {useTheme} from 'styled-components'
import { RewardAnimatedBox } from '../format/RewardAnimatedBox'
import { motion } from 'framer-motion'
import { Erc20Icon, NftIcon } from '../icons/Project'
import { Row } from '../format/Row'
import Address from '../functional/Address'

const Container = styled(motion.div)`
    position: fixed;
    top: 100px;
    background: ${(props) => props.theme.colors.cardGradient};
    width: 100px;
    height: 100px;
    left: 30%;
    z-index: 1000;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.border};
`

const IconBox = styled.div`
  position: absolute;
  z-index: 150;
  right: 15px;
  bottom: 15px;
`


const CustomModal = ({openModal, reward}) => {
    const theme = useTheme()
    
    return <>
    {openModal && reward &&  <Container
            initial={{  width: 100, height: 50 }} 
            animate={{ width: 500, height: 270}}
            transition={{ duration: 0.3}}
        >
        <IconBox>
            <Row>
                {reward?.rType >= 1 && <Address address={reward.tokenAddress} />}
                {reward?.rType  === 1 && <Erc20Icon width={50} height={50}  color={theme.colors.icon}/>}
                {reward?.rType  === 2 && <NftIcon width={50} height={50}  color={theme.colors.icon}/>}
            </Row>
        </IconBox>
          <RewardAnimatedBox reward={reward} />
    </Container>}
    </>
}

export default CustomModal