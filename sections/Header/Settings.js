
import {useTheme} from "styled-components"
import { AnimatedModal } from "../../components/animated/AnimatedModal";
import Preferences from "./Preferences";
import {useState} from 'react'
import { ButtonRow, Buttons, NotiBox, NotiTabWrapper } from "../../components/notifications/Styles";
import { Col } from "../../components/format/Row";
import Tab from "../../components/form/Tab";
import { ExpandIcon, ShrinkIcon } from "../../components/icons/Notifications";
import PrivateMessage from "../../components/notifications/PrivateMessage";


const Settings = () => {
    const theme = useTheme();
    const [active, setActive] = useState('Pref');
    const [expand, setExpand] = useState(false);
    return <AnimatedModal expand={expand}>
        <ButtonRow>
            <Buttons>
            <Col>
                <NotiTabWrapper>
                    <Tab active={active} o1={'Pref'} o2={'Message'} change1={()=>{setActive('Pref')}} change2={()=>{setActive('Message')}}  />
                </NotiTabWrapper>
            </Col>
            </Buttons>
            <Buttons onClick={() => setExpand(!expand)}>
            {!expand ? <ExpandIcon width={20} height={20} color={theme.colors.primary} /> : <ShrinkIcon width={20} height={20} />}
        </Buttons>
         {active === 'Preferences' &&  <Preferences/>}
        </ButtonRow>
        <NotiBox>
           {active === 'Message' && <PrivateMessage/>}
        </NotiBox>
    </AnimatedModal>
}

export default Settings