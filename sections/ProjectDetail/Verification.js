import styled from 'styled-components';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { useState } from 'react';
import axios from 'axios';
import { moralisApiConfig } from '../../data/moralisApiConfig';
import InputContainer from '../../components/form/InputContainer';

const Container = styled.div`
  padding-left: 17%;
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

const Verification = ({ objectId }) => {
  const [apiError, setApiError] = useState(false);
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const handleMoralis = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DAPP}/classes/VeriRequest`,
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

  /// TBD Socials share link

  return (
    <Container>
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
      <div>{!success ? <ButtonAlt text="Send verification request" /> : <div>Verification request sent</div>}</div>
    </Container>
  );
};

export default Verification;
