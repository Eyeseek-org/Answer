import {useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const Container = styled.div`
    background: linear-gradient(180deg, rgba(22, 0, 0, 0) 50%, rgba(22, 0, 0, 0.75)  100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    margin-top: 25%;
    padding-bottom: 20%;
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
    background: white;
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
    color: #B0F6FF;
    margin-bottom: 2%;
`

const O = styled.div`
    position: relative;
`

const Line = styled(motion.div)`
    position: absolute;
    height: 100px;
    width: 2px;
    background: white;
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
    color: #5E82DF;
    font-weight: 500;
    font-size: 1.2em;
`
const dummy = [
{
    "date": "2021-10-01",
    "title": "Whitepaper finished",
},{
    "date": "2021-09-01",
    "title": "Project funded",
},
{
    "date": "2021-10-01",
    "title": "Whitepaper finished",
},{
    "date": "2021-09-01",
    "title": "Project funded",
},
{
    "date": "2021-10-01",
    "title": "Whitepaper finished",
},{
    "date": "2021-09-01",
    "title": "Project funded",
},
{
    "date": "2021-10-01",
    "title": "Whitepaper finished",
},{
    "date": "2021-09-01",
    "title": "Project funded",
}

]

const Timeline = () => {
    const [milestones, setMilestones] = useState(dummy)

    const handleClick = (e) => {
        console.log('Clicked')
    }

    const Mil = ({date, title}) => {
        const [show, setShow] = useState(false)
        return <>
                <O>
                  <Circle 
                    whileHover={{ scale: 2 }}  
                    transition={{ type: "spring", stiffness: 500, damping: 3 }} 
                    onHoverStart={() => setShow(true)}
                    onHoverEnd={() => setShow(false)}
                    onClick={() => handleClick()}
                    
                    /> 
                  {show && 
                    <Line
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        transition={{ duration: 1.1 }}
                    />}
                  <Date>{date}</Date>
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
            {milestones.map((mil, index) => {
                            return <Mil
                                key={index}
                                date={mil.date}
                                title={mil.title}
                            />
                        })}
        </TimeBox>
    </Container>
    </>
}

export default Timeline