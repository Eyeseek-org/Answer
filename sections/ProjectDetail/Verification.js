import styled from 'styled-components';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import InputContainer from '../../components/form/InputContainer';
import { UniService } from '../../services/DapAPIService';
import {useAccount} from 'wagmi'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {veri_form} from '../../data/forms/veriForm'
import { RewardDesc } from '../../components/typography/Descriptions';

const Container = styled.div`
  padding-left: 18%;
  font-family: 'Neucha';
  letter-spacing: 0.2px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Verification = ({ objectId, owner }) => {
  const [apiError, setApiError] = useState(false);

  const [success, setSuccess] = useState(false);
  const {address} = useAccount()

  const HTTPS_URL_REGEX = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      url: Yup.string()
        .required('Website is required field')
        .matches(HTTPS_URL_REGEX, 'References are accepted with HTTPS prefix only'),
    }),
    onSubmit: (values) => {
      sendVeriRequest(objectId, values.url)
    },
  });

  const sendVeriRequest = async (objectId, url) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAPP}/classes/Verification`,
        {
          projectId: objectId,
          url: url,
        },
        moralisApiConfig
      );
      setApiError(false);
      await setSuccess(true);
    } catch (err) {
      console.log(err);
      setApiError(true);
    }
  };

  const query = `/classes/Verification?where={"projectId":"${objectId}"}`
  const { data: veri } = useQuery(['verifications'], () => UniService.getDataSingle(query),{
      onError: () => {
          setApiError(true)
      },
  });


  /// TBD Socials share link

  return (
    <Container>
    {!veri && address === owner && <>
      <RewardDesc>Verification status could be granted only for projects manually verified by the Eyeseek team.</RewardDesc>
      <div>
        Send us a proof where we can verify your project is connected with Eyeseek funding, for example
        <li>Blogpost</li>
        <li>Post from official socials</li>
        <li>Post from official website</li>
      </div>
      <InputContainer
        key={veri_form[0].name}
        name={veri_form[0].name}
        label={veri_form[0].label}
        placeholder={veri_form[0].p}
        onChange={formik.handleChange}
        description={veri_form[0].description}
        type={'text'}
        maxLength={veri_form[0].maxLength}
        isError={formik.errors[name] != null}
        errorText={formik.errors[name]}
      />
      <div>{!success ? <ButtonAlt text="Send verification request" onClick={()=>{sendVeriRequest(objectId, url)}} /> : <div>Verification request sent</div>}</div>
      </>}
      {veri ? <RewardDesc>Project was sent to verification by the Eyeseek team</RewardDesc> : <RewardDesc>Project is not verified by the Eyeseek team</RewardDesc>}
    </Container>
  );
};

export default Verification;
