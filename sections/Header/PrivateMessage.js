import InputContainer from "../../components/form/InputContainer"
import styled, { useTheme } from 'styled-components'
import { RewardDesc } from "../../components/typography/Descriptions"
import ButtonAlt from "../../components/buttons/ButtonAlt"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useAccount } from "wagmi"
import axios from "axios"
import { moralisApiConfig } from "../../data/moralisApiConfig"
import Lottie from 'react-lottie'
import { useState } from 'react'
import { errAnim, okAnim } from "../../components/animated/Animations"
import { G, R } from "../../components/typography/ColoredTexts"
import { Col, RowCenter} from "../../components/format/Row"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    gap: 10px;
`

const Divider = styled.div`
  height: 20px;
`

const PrivateMessage = () => {
  const { address } = useAccount()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const addRegex = /^0x[a-fA-F0-9]{40}$/

  const formik = useFormik({
    initialValues: {
      message: '',
      address: '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      message: Yup.string().required('Message is required field'),
      address: Yup.string().required('Address is required field').matches(addRegex, 'EVM address in invalid format'),
    }),
    onSubmit: (values) => {
      sendMessage(address, values.address, values.message);
    },
  });

  const sendMessage = async (sender, recipient, message) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Message`, {
        sender: sender,
        recipient: recipient,
        message: message,
      }, moralisApiConfig)
      setError(false)
      setSuccess(true)
    }

    catch (e) { setError(true) }
  }

  return <Container>
    <RewardDesc>Send message to another user</RewardDesc>
    <form onSubmit={formik.handleSubmit}>
      <InputContainer
        key={'message'}
        name={'message'}
        placeholder={'Hello friend, please check out my project, I think you will like it.'}
        description={'Message to a recipient'}
        type={'textArea'}
        maxLength={250}
        onChange={formik.handleChange}
        isError={formik.errors['message'] != null}
        errorText={formik.errors['message']}
      />
      <InputContainer
        key={'address'}
        name={'address'}
        placeholder={'0x...'}
        description={'Wallet address'}
        type={'text'}
        maxLength={42}
        onChange={formik.handleChange}
        isError={formik.errors['address'] != null}
        errorText={formik.errors['address']}
      />
      <Divider />
      {!success ? <Col>
        <ButtonAlt text='Send message' width={'100%'} />
        <Divider />
        <RewardDesc>Message is not encrypted, serves purely to help with rewards settlement between you and the opposite</RewardDesc>
      </Col> : <Lottie height={100} width={100} options={okAnim} />}
      {error && <Lottie height={100} width={100} options={errAnim} />}
      <Divider />
      <RowCenter>
        {success && <RewardDesc><G>Message sent</G></RewardDesc>}
        {error && <RewardDesc><R>Message failed, service not available</R></RewardDesc>}
      </RowCenter>
    </form>
  </Container>
}

export default PrivateMessage