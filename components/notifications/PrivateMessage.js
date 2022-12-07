import InputContainer from "../form/InputContainer"
import styled from 'styled-components'
import { RewardDesc } from "../typography/Descriptions"
import ButtonAlt from "../buttons/ButtonAlt"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { DapAPIService } from "../../services/DapAPIService"
import { useMutation } from "@tanstack/react-query"
import { useAccount } from "wagmi"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    gap: 10px;
`

const PrivateMessage = () => {
    const { address } = useAccount()

    const addRegex = /^0x[a-fA-F0-9]{40}$/

    const formik = useFormik({
        initialValues: {
          message: '',
          address: '',
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: Yup.object({
          message: Yup.string().required('Message is required field'),
          address: Yup.string().required('Address is required field').matches(addRegex, 'EVM address in invalid format'),
        }),
        onSubmit: (values) => {
          handleClick(values.message, values.address);
        },
      });

    const { mutate: sendMessage } = useMutation({
        mutationFn: (address, receiver, message) => DapAPIService.sendMessage(address, receiver, message),
      });

    const handleClick = () => {
        console.log('Clicked')
        sendMessage(address, formik.values)
    }

   

    return <Container>
        <RewardDesc>Send message to another user</RewardDesc>
        <InputContainer
                key={'message'}
                name={'message'}
                placeholder={'Hello friend, please check out my project, I think you will like it.'}
                description={'Description'}
                type={'textArea'}
                maxLength={250}
                onChange={formik.handleChange}
                isError={formik.errors['message'] != null}
                errorText={formik.errors['message']}
              />
        <InputContainer
                key={'address'}
                name={'address'}
                placeholder={'Address TBD'}
                description={'Description'}
                type={'text'}
                maxLength={50}
                onChange={formik.handleChange}
                isError={formik.errors['address'] != null}
                errorText={formik.errors['address']}
              />
        <ButtonAlt text='Send message' onClick={()=>{handleClick}}/>
    </Container>
}

export default PrivateMessage