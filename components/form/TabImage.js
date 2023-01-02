import styled, {useTheme} from 'styled-components';
import { BookmarkFilledIcon, BookmarkIcon, MessageIcon, MessageOpenIcon, UpdateActiveIcon, UpdateIcon, UserIcon } from '../icons/Common'
import { StreamIcon } from '../icons/Landing'
import { DonateActiveIcon, DonateIcon, ProjectActiveIcon, ProjectIcon,  Erc20ActiveIcon, Erc20Icon, NftActiveIcon, NftIcon, RewardActiveIcon } from '../icons/Project'
import { RewardIcon } from '../icons/Common'
import Tooltip from '../Tooltip'
import {useState} from 'react'
import { ImageHover } from '../tables/TableStyles';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.font};
  padding: 0.5%;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 1%;
    padding-left: 3%;
    padding-right: 8%;
    gap: 10%;
`

const Inactive = styled.div`
    font-size: 0.9em;
    font-family: 'Montserrat';
    padding-right: 2%;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
        opacity: 0.9;
    }
    @media (min-width: 1768px) {
        font-size: 1.1em;
    }
`

export const ColBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2%;
  height: 80px;
`;

const IconBox = styled.div`
`

const ActBox = styled(IconBox)`
    display: flex;
    flex-direction: row;
    gap: 5%;
    border-radius: 90px;
    box-shadow: 0px 2px 10px 0px ${(props) => props.theme.colors.font};
`

const Active = styled(Inactive)`
    color: ${(props) => props.theme.colors.primary};
`


const TabImage = ({ active, o1, o2, o3, o4, o5, change1, change2, change3, change4, change5 }) => {

    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState('')
    const [showNotiTooltip, setShowNotiTooltip] = useState(false)
    const [notiTooltipText, setNotiTooltipText] = useState('')
    const theme = useTheme()

    const handleTooltip = (text) => {
        setShowTooltip(true)
        setTooltipText(text)
    }

    const handleNotiTooltip = (text) => {
        setShowNotiTooltip(true)
        setNotiTooltipText(text)
    }


    const Item = ({ act, text, onClick }) => {
        return <>{active === act ? 
            <Active>
                {text === 'Projects' && <ColBetween><ProjectActiveIcon width={50}  color={theme.colors.icon}/><div>{text}</div></ColBetween>} 
                {text === 'Donates' && <ColBetween><DonateActiveIcon width={50}  color={theme.colors.icon}/><div>{text}</div></ColBetween>}
                {text === 'Bookmarks' && <ColBetween><BookmarkFilledIcon width={50} color={theme.colors.icon}/><div>{text}</div></ColBetween>}
                {text === 'Streams' && <ColBetween><StreamIcon width={50} /><div>{text}</div></ColBetween>}
                {text === 'Classic' && <ActBox onMouseEnter={()=>{handleTooltip('Classic reward')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <RewardActiveIcon width={60} height={60} color={theme.colors.icon}/></ActBox>} 
                {text === 'ERC20' && <ActBox onMouseEnter={()=>{handleTooltip('ERC20 Fungible token rewards')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <Erc20ActiveIcon width={60} height={60}  /></ActBox>}
                {text === 'ERC1155' && <ActBox onMouseEnter={()=>{handleTooltip('ERC1155 NFT rewards')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <NftActiveIcon width={60} height={60}  color={theme.colors.icon} /></ActBox>}
                {text === 'Notifications' &&   
                <ImageHover onMouseEnter={()=>handleNotiTooltip('All notifications')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <MessageOpenIcon width={30} height={30}  color={theme.colors.primary}/>
                </ImageHover>}
                {text === 'Updates' && 
                <ImageHover onMouseEnter={()=>handleNotiTooltip('Project updates')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <UpdateActiveIcon width={30} height={30}  color={theme.colors.primary}/>
                </ImageHover>}
                {text === 'Messages' &&
                <ImageHover onMouseEnter={()=>handleNotiTooltip('Direct messages')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <UserIcon width={30} height={30}  color={theme.colors.primary}/>
                </ImageHover>}
            </Active> : 
            <Inactive onClick={onClick}>
              
                {text === 'Projects' && <ColBetween><ProjectIcon width={50}  color={theme.colors.icon}/><div>{text}</div></ColBetween>} 
                {text === 'Donates' && <ColBetween><DonateIcon width={50}  color={theme.colors.icon} /><div>{text}</div></ColBetween>}
                {text === 'Bookmarks' && <ColBetween><BookmarkIcon width={50} color={theme.colors.icon} /><div>{text}</div></ColBetween>}
                {text === 'Streams' && <ColBetween><StreamIcon width={50}  /><div>{text}</div></ColBetween>}
                {text === 'Classic' && <IconBox onMouseEnter={()=>{handleTooltip('Classic reward')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <RewardIcon width={60} height={60}  color={theme.colors.icon} /></IconBox>} 
                {text === 'ERC20' && <IconBox onMouseEnter={()=>{handleTooltip('ERC20 Fungible token rewards')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <Erc20Icon width={60} height={60}  color={theme.colors.icon} /></IconBox>}
                {text === 'ERC1155' && <IconBox onMouseEnter={()=>{handleTooltip('ERC1155 NFT rewards')}} onMouseLeave={()=>{setShowTooltip(false)}}>
                    <NftIcon width={60}  height={60}  color={theme.colors.icon}/></IconBox>}
                {text === 'Notifications' &&   
                <ImageHover onMouseEnter={()=>handleNotiTooltip('All notifications')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <MessageIcon width={30} height={30}  color={theme.colors.icon}/>
                </ImageHover>}
                {text === 'Updates' && 
                <ImageHover onMouseEnter={()=>handleNotiTooltip('Project updates')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <UpdateIcon width={30} height={30}  color={theme.colors.icon}/>
                </ImageHover>}
                {text === 'Messages' &&
                <ImageHover onMouseEnter={()=>handleNotiTooltip('Direct messages')} onMouseLeave={()=>setShowNotiTooltip(false)}>
                    <UserIcon width={30} height={30}  color={theme.colors.icon}/>
                </ImageHover>}
            </Inactive>
        }</>
    }
    return <Container>
     {showTooltip && <Tooltip text={tooltipText} margin={'-50px'}/>}
    <Menu>
       {showNotiTooltip && <Tooltip text={notiTooltipText} margin={'45px'}/>}
        <Item act={o1} text={o1} onClick={change1} />
        <Item act={o2} text={o2} onClick={change2} />

        {o3 && <><Item act={o3} o={o3} text={o3} onClick={change3} /></>}
        {o4 && <><Item act={o4} o={o4} text={o4} onClick={change4} /></>}
        {o5 && <><Item act={o5} o={o5} text={o5} onClick={change5} /></>}
    </Menu>
    </Container>
}

export default TabImage