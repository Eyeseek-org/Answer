import {useState} from 'react'
import styled from "styled-components"
import { WarningIcons } from "../icons/Common"
import {AnimatePresence, motion} from 'framer-motion'
import { B, R } from '../typography/ColoredTexts'
import { ProjectTitle } from '../typography/Titles'

const Container = styled.div`
    position: fixed;
    top: 100px;
    left: 70%;
    z-index: 80;
    @media (max-width: 1168px) {
      display: none;
    }
`

const Icons = styled(motion.div)`
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`

const WarningBox = styled(motion.div)`
  position: absolute;
  top: 150px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: ${({theme})=>theme.colors.darkRed};
  border: 1px solid #500000;
  border-radius: 5px;
  letter-spacing: 0.9px;
  line-height: 1.3;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  color: ${(props) => props.theme.colors.font};
  z-index: 80;
  width: 400px;
  margin-right: 50px;
  @media (min-width: 1768px) {
    width: 600px;
  }
`;


const Warning = () => {
    const [show, setShow] = useState(false)
    return <Container>
        <Icons           
        initial={{ scale: 0.8 }}
           whileHover={{
               scale: 1.1
            }}
          transition={{  duration: 0.3 }}  onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>{setShow(false)}}><WarningIcons width={80}/></Icons>
      <AnimatePresence>
      {show && 
        <WarningBox
           initial={{ scale: 0.8, x: 200 }}
           key="warning"
           exit={{ scale: 0.8, x: 200, opacity: 0, transition: { duration: 1 } }}
           animate={{
               x: 0,
            }}
          transition={{  duration: 0.3 }}> 
        <ProjectTitle>Beware of scammers</ProjectTitle>
        <div>
        <B>Project founders are not obligated to verify their identities to the Eyeseek</B>. Backing is provided on your own risk, it is
       recommended to verify project validity on project website and socials. <R>Do not trust projects without any reference</R> to Eyeseeek funding.
         </div>
    </WarningBox> 
    }
     </AnimatePresence>
    </Container>
}

export default Warning 