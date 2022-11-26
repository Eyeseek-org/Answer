import styled from "styled-components"
import Script from 'next/script'
import {motion} from 'framer-motion'

const Container = styled.div`
    display: flex;
`
const Eyes = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
    opacity: 0.8;
`
const EyeBall = styled.div`
    width: 5px;
    height: 5px;
    opacity: 1;
    border-radius: 50%;
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.7), inset 0 0 7px #63c2b8,inset 0 0 8px #000000;
`

const Eye = styled(motion.div)`
    position: relative;
    width: 2em;
    height: 2em;
    border-radius: 50%;
`
const Eyeballs = () => {

    return <Container>
            <Eyes>
            <Eye  className="eye" 
                >
          <EyeBall className="eyeball"></EyeBall>
        </Eye>
                </Eyes>
    <Script src="script.js" ></Script>
    </Container>
}

export default Eyeballs