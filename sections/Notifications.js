import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Preferences from './Preferences'
import {CanceledIcon} from '../components/icons/Notifications'
import { RewardIcon } from '../components/icons/Common'
import { BellIcon } from '../components/icons/Landing'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    right: 4%;
    z-index: 1;
    top: 15%;
    transition: all 0.7s ease-in-out;
    height: 300px;
    width: 300px;
    background: linear-gradient(155.74deg, #1C1C1C 0%, #000000 120.65%);
    border-radius: 10px;
    border: 1px solid #4E4E4E;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 2px;
    
    }
    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #9bffff;
    }
`

const NotiBox = styled.div`
    margin-top: 35px;
`

const NotiItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #585858;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 1%;
    font-size: 0.8em;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    padding: 2%;
    margin-top: 2px;
    margin-bottom: 2px;
    cursor: pointer;
    &:hover{
        opacity: 0.9;
    }
`


const Desc = styled.div`
    font-family: 'Arial';
    font-weight: 300;
    letter-spacing: 0.2px;
    font-size: 0.9em;
    color: #FFFFFF;
`

const Ago = styled.div`
    font-family: 'Arial';
    font-size: 0.7em;
    color: white;
`

const ButtonRow = styled.div`
    position: absolute; 
    display: flex;
    flex-direction: row;
    width: 100%;
    background: black;
    padding: 2%;
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: 'Neucha';
    font-style: italic;
    font-weight: 400;
    font-size: 0.9em;
    color: #B0F6FF;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`

const Unread = styled.div`
    font-family: 'Gemunu Libre';
    background: #FFD1D1;
    box-shadow: 0px 4px 40px rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    color: #AC0000;
    padding: 2px;
    margin-top: 2px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 0.7em;
`

const HidUnread = styled(Unread)`
    visibility: hidden;
`

const IconWrapper = styled.div`
    padding-right: 2%;
    padding-left: 2%;
    padding-top: 2%;
`

const Notifications = ({notis}) => {
    const [profile, setProfile] = useState(false)

    const moralisApiConfig = {
        headers: {
          "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
          "Content-Type": "application/json"
        }
      }

    useEffect(() => {
        confirmRead()
    },[])

    const confirmRead = async () => {
        if (notis) {
            notis.forEach(async (noti) => {
                if (noti.isRead === false)
                    await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification/${noti.objectId}`, {
                    'isRead': true,
                    }, moralisApiConfig)
            })
        } 
      }

    return <Container>  
       {!profile ?<NotiBox> 
        {notis && notis.map((noti) => <NotiItem>            
            <Link href={`/project/${noti.project}`}><Row>            
                 <IconWrapper>
                    {noti.type === 'projectCanceled' && <CanceledIcon width={15} height={15}/>}
                    {noti.type === 'rewardAdded' && <RewardIcon width={15}/>}
                    {noti.type === 'projectUpdate' && <BellIcon/>}
                </IconWrapper>
                <Col><Desc>{noti.description}</Desc><Ago><ReactTimeAgo date={noti.createdAt} locale="en-US"/></Ago></Col>
                <Col>
                     {noti.isRead === false ? <Unread>New</Unread> : <HidUnread></HidUnread>}
             
                </Col>
            </Row></Link>
            </NotiItem>)}
        </NotiBox> : <Preferences/>}
      <ButtonRow>{!profile ? <Buttons onClick={()=>{setProfile(true)}}>Edit preferences</Buttons> : <Buttons onClick={()=>{setProfile(false)}}>Notifications</Buttons>}</ButtonRow>
    </Container>
}

export default Notifications