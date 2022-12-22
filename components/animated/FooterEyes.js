import styled, {useTheme}  from 'styled-components'
import { motion } from "framer-motion";
import { FooterEyesOpen, FooterEyesClosed } from '../icons/Eyes'

const EyeSevenBox = styled.div`
  margin: 10%;
  text-align: center;
  position: relative;
`;

const EyesClosed = styled(motion.div)`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    opacity: 0.8;
`

const EyesOpen = styled(motion.div)`
    position: absolute;
    top: -80px;
    width: 100%;
    display: flex;
    justify-content: center;
    opacity: 0.8;
`

const FooterEyes = () => {
    const theme = useTheme()

    return <EyeSevenBox>
       <EyesOpen 
            initial={{opacity: 0}}  
            whileHover={{ opacity: 1,transition: { duration: 1 }}} > 
       <FooterEyesOpen width={500} height={110} color={theme.colors.font}/></EyesOpen>
       <EyesClosed
            initial={{opacity: 1}}  
            whileHover={{ opacity: 0,transition: { duration: 1 }}} > 
        <FooterEyesClosed width={380} height={28} color={theme.colors.font} />
      </EyesClosed>
    </EyeSevenBox>
}

export default FooterEyes