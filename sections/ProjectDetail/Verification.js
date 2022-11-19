import styled from 'styled-components';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import InputContainer from '../../components/form/InputContainer';
import { UniService } from '../../services/DapAPIService';
import {useAccount} from 'wagmi'

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
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const {address} = useAccount()

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
      <div>Verification status could be granted only for projects manually verified by the Eyeseek team.</div>
      <div>
        Send us a proof where we can verify your project is connected with Eyeseek funding, for example
        <li>Blogpost</li>
        <li>Post from official socials</li>
        <li>Post from official website</li>
      </div>
      <InputContainer
        label={'URL to verify'}
        placeholder={'https://www.eyeseek.org/'}
        onChange={(e) => setUrl(e.target.value)}
        description={'Link to blogpost, socials announcement'}
        type={'text'}
        maxLength={150}
      />
      <div>{!success ? <ButtonAlt text="Send verification request" onClick={()=>{sendVeriRequest(objectId, url)}} /> : <div>Verification request sent</div>}</div>
      </>}
      {veri && address === owner && <div>Project successfully verified</div>}
      {veri ? <div>Project was manually verified by the Eyeseek team</div> : <>Project is not verified by the Eyeseek team</>}
    </Container>
  );
};

export default Verification;
