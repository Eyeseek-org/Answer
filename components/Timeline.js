import {useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 9%;
    padding-bottom: 5%;
    @media (max-width: 1068px) {
        display: none;
    }
    @media (min-width: 1768px) {
        margin-top: 15%;
    }
`

const Circle = styled(motion.div)`
    height: 12px;
    width: 12px;
    background: ${(props) => props.theme.colors.font};
    box-shadow: 0px 2px 15px white, inset 0px 1px 3px white;
    border-radius: 45px;
    &:hover {
        cursor: pointer;
    }
`

const TimeBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
    height: 2px;
    background: #004207;
`

const MileTitle = styled(motion.div)`
    font-family: 'Gemunu Libre';
    text-align: left;
    letter-spacing: 0.8px;
    font-size: 1.3em;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 2%;
`

const O = styled.div`
    position: relative;
`

const Line = styled(motion.div)`
    position: absolute;
    height: 100px;
    width: 2px;
    background: ${(props) => props.theme.colors.font};
    left: 5px;
`


const Milestone = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 30px;
    top: 70px;
    width: 400px;
`

const Date = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    font-family: 'Neucha';
    top: -30px;
    width: 100px;
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 500;
    font-size: 1.2em;
`

const Timeline = ({milestones}) => {
    

    const Mil = ({date, title, url}) => {
        const [show, setShow] = useState(false)
        return <>
                <O>
                    <a href={url} rel="noopener noreferrer" target="_blank" >
                  <Circle 
                    whileHover={{ scale: 2 }}  
                    transition={{ type: "spring", stiffness: 500, damping: 3 }} 
                    onHoverStart={() => setShow(true)}
                    onHoverEnd={() => setShow(false)}
                    
                    /> </a>
                  {show && 
                    <Line
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        transition={{ duration: 1.1 }}
                    />}
                  <Date>{date.substring(0,10)}</Date>
                  {show &&    <Milestone>
                    <MileTitle
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0}}
                        transition={{ duration: 0.3 }}
                    >{title}</MileTitle>
                  </Milestone>}
                </O>
        </>
    }

    return <>
    <Container>
        <TimeBox>
            {milestones && milestones.map((mil) => {
                            return <Mil
                                key={mil.objectId}
                                date={mil.createdAt}
                                title={mil.title}
                                url={mil.url}
                            />
                        })}
        </TimeBox>
    </Container>
    </>
}

export default Timeline