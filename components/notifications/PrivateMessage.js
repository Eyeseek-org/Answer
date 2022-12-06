import InputContainer from "../form/InputContainer"
import styled from 'styled-components'
import { RewardDesc } from "../typography/Descriptions"
import ButtonAlt from "../buttons/ButtonAlt"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    gap: 10px;
`

const PrivateMessage = () => {
    return <Container>
        <RewardDesc>Send message to another user</RewardDesc>
        <InputContainer
                key={'message'}
                name={'message'}
                placeholder={'Hello friend, please check out my project, I think you will like it.'}
                description={'Description'}
                type={'textArea'}
                maxLength={250}
              />
        <InputContainer
                key={'address'}
                name={'address'}
                placeholder={'Address TBD'}
                description={'Description'}
                type={'text'}
                maxLength={50}
              />
        <ButtonAlt text='Send message' />
    </Container>
}

export default PrivateMessage