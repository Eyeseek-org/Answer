import styled from "styled-components"
import SectionTitle from "../../components/typography/SectionTitle"
import axios from 'axios'
import {useState, useEffect} from 'react'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { moralisApiConfig } from "../../data/moralisApiConfig"

TimeAgo.addDefaultLocale(en)

const Container = styled.div`
    margin-top: 5%;
    color: white;
`

const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 16%;
    font-family: 'Neucha';
`

const A = styled.a`
    font-size: 1em;
    color: white;
    &:hover{
        opacity: 0.85;
        color: #B0F6FF;
    }
`

const Created = styled.div`
    color: #d0d0d0;   
    font-size: 0.8em;
`

const RefCard = styled.div`
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    border: 1px solid #3C3C3C;
    border-radius: 5px;
    width: 350px;
    padding: 2%;
    margin: 2%;
    border-radius: 15px;
    font-size: 1.1em;
    @media (min-width: 1780px) {
        font-size: 1.4em;
    }
`

const UpdateOverview = ({objectId}) => {
    const [updates, setUpdates] = useState([])

    useEffect(() => {
        getUpdates()
      }, []);

    const getUpdates = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Update?where={"project":"${objectId}"}`, moralisApiConfig)
            setUpdates(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    return <Container>
        <SectionTitle title={'Project updates'} subtitle={'Latest project news'}/>
        <List>
            {updates.length > 0 && 
                updates.map((update)=> 
                    <RefCard key={update.objectId}>
                        <A href={`${update.url}`} rel="noopener noreferrer" target="_blank"><>Update title</></A>
                        <Created><ReactTimeAgo date={update.createdAt} locale="en-US"/></Created>
                  </RefCard>)
            }        
        </List>
    </Container>
}

export default UpdateOverview