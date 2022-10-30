import styled from "styled-components"
import SectionTitle from "../../components/typography/SectionTitle"
import axios from 'axios'
import {useState, useEffect} from 'react'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const Container = styled.div`
    margin-top: 5%;
    color: white;
`

const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 15%;
    font-family: 'Neucha';
`

const A = styled.a`
    padding: 2%;
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
    background: black;
    width: 150px;
    padding: 2%;
    margin: 2%;
    border-radius: 15px;
`

const UpdateOverview = ({objectId}) => {
    const [updates, setUpdates] = useState([])

    useEffect(() => {
        getUpdates()
      }, []);

    const getUpdates = async () => {
        const config = {
            headers: {
                "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`
            }
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Update?where={"project":"${objectId}"}`, config)
            setUpdates(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    return <Container>
        <SectionTitle title={'Project updates'}/>
        <List>
            {updates.length > 0 && 
                updates.map((update)=> 
                    <RefCard key={update.objectId}>
                        <A href={`${update.url}`} rel="noopener noreferrer" target="_blank"><>Update reference</></A>
                        <Created><ReactTimeAgo date={update.createdAt} locale="en-US"/></Created>
                  </RefCard>)
            }        
        </List>
    </Container>
}

export default UpdateOverview