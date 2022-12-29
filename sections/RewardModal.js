import {useState} from 'react';
import {AnimatedModal} from '../components/animated/AnimatedModal'
import { CloseIcon, ExpandIcon, ShrinkIcon } from '../components/icons/Notifications';
import styled, {useTheme} from 'styled-components';
import { ButtonRow, Buttons } from '../components/notifications/Styles';
import { BetweenRow, Row } from '../components/format/Row';
import Address from '../components/functional/Address';
import axios from 'axios';
import { moralisApiConfig } from '../data/moralisApiConfig';
import { RewardDesc } from '../components/typography/Descriptions';
import CircleButton from '../components/buttons/CircleButton'
import ClickableIcon from '../components/animated/ClickableIcon'
import { B } from '../components/typography/ColoredTexts';
import { useAccount } from 'wagmi';

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
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    padding: 1%;
`

const HeadRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10%;
    padding: 3%;
`

const Index = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 0.7em;
`


const RewardModal = ({ showMe, rewardId, backers,owner, projectId }) => {
    const [display, setDisplay] = useState(showMe);
    const [expand, setExpand] = useState(false);
    const address = useAccount()
    const theme = useTheme();
    // TBD Notifikace - zamyslet se nad custom message -> Nebo švihnout něco default 
    // Zamyslet se, jestli má smysl při projektu, nebo až pak po ukončení

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
    
    
    const handleRewardNotification = async (reci) => {
          try {
            await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
              'title': `Reward notification`,
              'description': `Owner of this project does have something new for ya. Check project Updates.`,
              'type': 'rewardEligible',
              'project': `${projectId}`, // vzít pak z parenta
              'user': reci,
              'isRead': false
            }, moralisApiConfig)
            } catch (error){
              console.log(error)
            }
          }
        
    
    const handleRewardNotifications = async () => {
            if (backers && backers.length > 0) {
              backers.forEach(async (backer) => {
                await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
                  'title': `Reward notification`,
                  'description': `Take a look which project unlocked rewards for its backers.`,
                  'type': 'rewardEligible',
                  'project': `${projectId}`, // vzít pak z parenta
                  'user': backer.address,
                  'isRead': false
                }, moralisApiConfig)
              })
            }
          }


          
    const backerList = backers.map((backer, index) => {
        return (
            <BackerList key={index}>
                <BetweenRow>
                  {!expand ? <><Address address={backer.address}/>
                   <>
                       {backer.state === 1 &&  <CircleButton onClick={()=>{updateRewardState(backer.id, 2)}} icon={<ClickableIcon type={'handshake'}/>}/>}
                       {backer.state === 2 &&  <CircleButton onClick={()=>{updateRewardState(backer.id, 1)}} icon={<ClickableIcon type={'back'}/>}/>}
                        <CircleButton onClick={()=>{handleRewardNotification(backer.address)}} icon={<ClickableIcon type={'remind'}/>} />
                   </>
                  </> :  <><Index>{index+1}</Index><RewardDesc>{backer.address}</RewardDesc>
                 <>
                       {backer.state === 1 && <CircleButton onClick={()=>{updateRewardState(backer.id, 2)}} icon={<Row>Resolve<ClickableIcon type={'handshake'}/></Row>}/>}
                      {backer.state === 2 &&   <CircleButton onClick={()=>{updateRewardState(backer.id, 1)}} icon={<Row>Unresolve<ClickableIcon type={'back'}/></Row>} />}
                        <CircleButton onClick={()=>{handleRewardNotification(backer.address)}} icon={<Row>Notify one<ClickableIcon type={'remind'}/></Row>}/>
                       </>
                  </>
                  }
                </BetweenRow>
            </BackerList>
        )
    })

    return  <> 
       {display && owner === address && <AnimatedModal expand={expand}>
              <ButtonRow>
            <Buttons>Reward list</Buttons>
                <ActionIcons>
                    <Button onClick={() => setExpand(!expand)}>
                        {!expand ? <ExpandIcon width={20} height={20} color={theme.colors.primary} /> : <ShrinkIcon width={20} height={20} color={theme.colors.primary}  />}
                    </Button>
                    <Button onClick={() => setDisplay(!display)}>
                    <CloseIcon width={20} height={20} color={theme.colors.primary} /> 
                    </Button>
                </ActionIcons>  
            </ButtonRow>
        <div>  
        <HeadRow>
              <RewardDesc>Notify backers about updates</RewardDesc>
              <CircleButton onClick={()=>{handleRewardNotifications()}} icon={ <>{expand ? <Row><B>Notify all</B> <ClickableIcon type={'notifyAll'}/></Row> : <ClickableIcon type={'notifyAll'}/>}</>} />
          </HeadRow>
            {backerList}
        </div>
        </AnimatedModal> }
        </>
}

export default RewardModal