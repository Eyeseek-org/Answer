
import {useTheme} from "styled-components"
import { AnimatedModal } from "../../components/animated/AnimatedModal";
import {useState} from 'react'
import { ButtonRow, Buttons, NotiBox, NotiTabWrapper } from "../../components/notifications/Styles";
import Tab from "../../components/form/Tab";
import { ExpandIcon, ShrinkIcon } from "../../components/icons/Notifications";
import MessageForm from "./MessageForm";


const Settings = () => {
    const theme = useTheme();
    const [active, setActive] = useState('Direct');
    const [expand, setExpand] = useState(true);
    return <AnimatedModal expand={expand ? true : undefined}       
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                key="notifications">
        <ButtonRow>
            <Buttons>
                <NotiTabWrapper>
                    <Tab active={active} o1={'Direct'} o2={undefined} change1={()=>{setActive('Direct')}} change2={undefined}  />
                </NotiTabWrapper>
            </Buttons>
            <Buttons onClick={() => setExpand(!expand)}>
            {!expand ? <ExpandIcon width={20} height={20} color={theme.colors.primary} /> : <ShrinkIcon width={20} height={20} color={theme.colors.primary}/>}
        </Buttons>
        </ButtonRow>
        <NotiBox>
          {/* {active === 'Preferences' &&  <Preferences/>} */}
           {active === 'Direct' && <MessageForm type='private'/>}
           {active === 'Group' && <MessageForm type='group'/>}
        </NotiBox>
    </AnimatedModal>
}

export default Settings