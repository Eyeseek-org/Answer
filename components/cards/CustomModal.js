import styled from 'styled-components'
import { RewardAnimatedBox } from '../format/RewardAnimatedBox'
import { motion } from 'framer-motion'

const Container = styled(motion.div)`
    position: fixed;
    top: 100px;
    background: ${(props) => props.theme.colors.cardGradient};
    width: 100px;
    height: 100px;
    left: 30%;
    z-index: 1000;
`


const CustomModal = ({openModal, desc, delivery, estimation, title, pledge}) => {
    
    return <>
    {openModal &&  <Container
            initial={{  width: 100, height: 50 }} 
            animate={{ width: 500, height: 250}}
            transition={{ duration: 0.3}}
        >
          <RewardAnimatedBox text={desc} delivery={delivery} estimation={estimation} title={title} pledge={pledge} />
    </Container>}
    </>
}

export default CustomModal