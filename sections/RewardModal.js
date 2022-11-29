import {useState} from 'react';
import {AnimatedModal} from '../components/animated/AnimatedModal'
import { CloseIcon, ExpandIcon, ShrinkIcon } from '../components/icons/Notifications';
import styled, {useTheme} from 'styled-components';
import { ButtonRow, Buttons } from '../components/notifications/Styles';
import { BetweenRow, RowCenter } from '../components/format/Row';
import Address from '../components/functional/Address';
import axios from 'axios';
import { moralisApiConfig } from '../data/moralisApiConfig';
import { RewardDesc } from '../components/typography/Descriptions';
import { HandshakeIcon, BackArrow, RemindIcon } from '../components/icons/Actions';
import CircleButton from '../components/buttons/CircleButton'

const Button = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        opacity: 0.7;
    }
`

const ActionIcons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 25px;
`

const BackerList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    padding: 5%;
`

const Index = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 0.7em;
`


const RewardModal = ({ showMe, rewardId, backers,owner }) => {
    const [display, setDisplay] = useState(showMe);
    const [expand, setExpand] = useState(false);
    const theme = useTheme();
    // Upravit UI - Ikonky

    const updateRewardState = async(rewItemId, status) => {
        const updatedBackers = backers;
        var upd_obj = 0;
        upd_obj = updatedBackers.findIndex((obj => obj.id == rewItemId));
        updatedBackers[upd_obj].status = status;
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Reward/${rewardId}`, {donors: updatedBackers }, moralisApiConfig);
          } catch (error) {
            console.log(error);
          }
        };
    
    const handleRewardNotifications = async () => {
            if (backers && backers.length > 0) {
              backers.forEach(async (backer) => {
                await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
                  'title': `Reward elibility`,
                  'description': `Update about project rewards.`,
                  'type': 'rewardEligible',
                  'project': `${objectId}`, // vzít pak z parenta
                  'user': backer.address
                }, moralisApiConfig)
              })
            }
          }

    const backerList = backers.map((backer, index) => {
        return (
            <BackerList key={index}>
                <BetweenRow>
                  {!expand ? <><Address address={backer.address}/>
                  {owner && <RowCenter>
                        <CircleButton onClick={()=>{updateRewardState(backer.id, 2)}} icon={<HandshakeIcon width={20} height={20} color={theme.colors.icon}/>}/>
                        <CircleButton onClick={()=>{updateRewardState(backer.id, 1)}} icon={<BackArrow width={20} height={15} color={theme.colors.icon}/>} />
                        <CircleButton onClick={()=>{handleRewardNotifications()}} icon={<RemindIcon width={20} height={15} color={theme.colors.icon}/>} />
                   </RowCenter>}
                  </> :  <><Index>{index+1}</Index><RewardDesc>{backer.address}</RewardDesc>
                  {owner &&   <>
                        <CircleButton onClick={()=>{updateRewardState(backer.id, 2)}} icon={<>Resolve<HandshakeIcon width={20} height={20} color={theme.colors.icon}/></>}/>
                        <CircleButton onClick={()=>{updateRewardState(backer.id, 1)}} icon={<>Unresolve<BackArrow width={20} height={15} color={theme.colors.icon}/></>} />
                        <CircleButton onClick={()=>{handleRewardNotifications()}} icon={<>Reminder<RemindIcon width={20} height={15} color={theme.colors.icon}/></>}/>
                       </>}
                  </>
                  }
                </BetweenRow>
            </BackerList>
        )
    })

    return  <> 
       {display &&  <AnimatedModal expand={expand}>
              <ButtonRow>
            <Buttons>Reward list</Buttons>
                <ActionIcons>
                    <Button onClick={() => setExpand(!expand)}>
                        {!expand ? <ExpandIcon width={20} height={20} /> : <ShrinkIcon width={20} height={20} />}
                    </Button>
                    <Button onClick={() => setDisplay(!display)}>
                    <CloseIcon width={20} height={20} /> 
                    </Button>
                </ActionIcons>  
            </ButtonRow>
            {backerList}
        </AnimatedModal> }
        </>
}

export default RewardModal