import {useState} from 'react';
import {AnimatedModal} from '../components/animated/AnimatedModal'
import { CloseIcon, ExpandIcon, ShrinkIcon } from '../components/icons/Notifications';
import styled from 'styled-components';
import { ButtonRow, Buttons } from '../components/notifications/Styles';
import { BetweenRow } from '../components/format/Row';
import Address from '../components/functional/Address';
import { WarnTitle } from '../components/typography/Titles';

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


const RewardModal = ({  showMe, backers,owner }) => {
    const [display, setDisplay] = useState(showMe);
    const [expand, setExpand] = useState(false);


    const backerList = backers.map((backer, index) => {
        return (
            <BackerList key={index}>
                <BetweenRow>
                  {!expand ? <Address address={backer.address}/> :  <WarnTitle>{backer.address}</WarnTitle>}
                   {owner && <div>Action panel</div>}
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