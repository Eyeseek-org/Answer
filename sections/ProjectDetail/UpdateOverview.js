import styled from "styled-components"
import {useState} from 'react'
import { useQuery } from "@tanstack/react-query"
import {motion} from 'framer-motion'
import { UniService } from "../../services/DapAPIService"
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import TimelineX from '../../components/TimelineX'
import AnimatedLeftPanel from "../../components/animated/AnimatedLeftPanel"

TimeAgo.addDefaultLocale(en)

const Container = styled.div`
    margin-top: 2%;
    color: ${(props) => props.theme.colors.font};
`

const List = styled.div`
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: 'Neucha';
`

const A = styled.a`
    font-size: 1em;
    color: ${(props) => props.theme.colors.font};
    cursor: pointer;
`

const Created = styled.div`
    color: #d0d0d0;   
    font-size: 0.8em;
`

const RefCard = styled(motion.div)`
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    border: 1px solid ${(props) => props.theme.colors.gray};
    border-radius: 5px;
    width: 350px;
    padding: 2%;
    margin: 2%;
    border-radius: 15px;
    font-size: 1.1em;
    @media (min-width: 1780px) {
        font-size: 1.4em;
    }
    &:hover {
        border: 1px solid rgba(160, 244, 255, 0.4);
    }
`

const UpdateOverview = ({objectId}) => {
    const [apiError, setApiError] = useState(false)
    const [showDesc, setShowDesc] = useState(false)

    const query = `/classes/Update?where={"project":"${objectId}"}`

    const { data: updates } = useQuery(['updates'], () => UniService.getDataAll(query),{
        onError: () => {
            setApiError(true)
        },
    });
    

    return <Container>
    
        {updates && updates.length > 0 &&  <AnimatedLeftPanel title={'Timeline'} component={ <TimelineX milestones={updates.slice(0, 10)}/>}/>}
        <List>
            {updates && updates.length > 0 ?
                updates.map((update)=> 
                    <RefCard key={update.objectId} whileHover={{ scale: 1.05 }} onMouseEnter={()=>{setShowDesc(!showDesc)}}>
                        <A href={`${update.url}`} rel="noopener noreferrer" target="_blank"><u>{update.title}</u></A>
                        <Created><ReactTimeAgo date={update.createdAt} locale="en-US"/></Created>
                  </RefCard>) : <>No updates published by the author</>
            }        
        </List>

    </Container>
}

export default UpdateOverview
