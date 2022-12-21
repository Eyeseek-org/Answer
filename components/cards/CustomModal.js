import styled from 'styled-components'
import {AnimatePresence, motion} from 'framer-motion'

const Container = styled(motion.div)`
    position: fixed;
    top: 100px;
    background: ${(props) => props.theme.colors.cardGradient};
    width: 100px;
    height: 100px;
    left: 30%;
    z-index: 1000;
`


const CustomModal = ({openModal}) => {
    
    return <AnimatePresence>
   {openModal &&  <Container
        initial={{  width: 100, height: 50 }} 
        key={'image'}
        animate={{ width: 500, height: 250}}
        transition={{ duration: 0.3}}
        exit={{ width: 100, height: 50 , opacity: 0.5, transition: { duration: 0.5 } }}
    >

    </Container>}
    </AnimatePresence>
}

export default CustomModal