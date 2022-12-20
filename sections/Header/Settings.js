
import {useTheme} from "styled-components"
import { AnimatedModal } from "../../components/animated/AnimatedModal";
import Preferences from "./Preferences";
import {useState} from 'react'
import { ButtonRow, Buttons, NotiBox, NotiTabWrapper } from "../../components/notifications/Styles";
import { Col } from "../../components/format/Row";
import Tab from "../../components/form/Tab";
import { ExpandIcon, ShrinkIcon } from "../../components/icons/Notifications";
import MessageForm from "./MessageForm";


const Settings = () => {
    const theme = useTheme();
    const [active, setActive] = useState('Direct');
    const [expand, setExpand] = useState(false);
    return <AnimatedModal expand={expand ? true : undefined}>
        <ButtonRow>
            <Buttons>
            <Col>
                <NotiTabWrapper>
                    <Tab active={active} o1={'Direct'} o2={'Group'} change1={()=>{setActive('Direct')}} change2={()=>{setActive('Group')}}  />
                </NotiTabWrapper>
            </Col>
            </Buttons>
            <Buttons onClick={() => setExpand(!expand)}>
            {!expand ? <ExpandIcon width={20} height={20} color={theme.colors.primary} /> : <ShrinkIcon width={20} height={20} />}
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