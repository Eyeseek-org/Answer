import styled from 'styled-components';
import { useEffect } from 'react';
import { useApp } from '../utils/appContext';
import SectionTitle from '../../components/typography/SectionTitle';
import InputContainer from '../../components/form/InputContainer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainContainer, Wrapper } from '../../components/format/Box';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { BetweenRow } from '../../components/format/Row';
import {story_form} from '../../data/forms/createForm'
import { RewardDesc } from '../../components/typography/Descriptions';

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  background: ${(props) => props.theme.colors.gradient};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 4%;
  margin-bottom: 5%;
  input[type='file'] {
    display: none;
  }

  .custom-file-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed ${(props) => props.theme.colors.font};
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    height: 300px;
    text-align: center;
    margin-bottom: 10px;
  }

  .input-span {
    width: 100%;
  }
`;


const TellStory = ({ setStep }) => {
  const { setAppState } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const HTTPS_URL_REGEX = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const YT_REGEX = /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/;

  // Extract id from youtube url
  function YouTubeGetID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      website: '',
      socials: '',
      youtube: ''
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required field'),
      description: Yup.string().required('Description is required field'),
      website: Yup.string()
        .required('Website is required field')
        .matches(HTTPS_URL_REGEX, 'References are accepted with HTTPS prefix only'),
      socials: Yup.string()
        .required('Socials is required field!')
        .matches(HTTPS_URL_REGEX, 'References are accepted with HTTPS prefix only'),
      youtube: Yup.string().matches(YT_REGEX, 'Youtube link is not valid'),
    }),
    onSubmit: (values) => {
      setAppState((prev) => ({
        ...prev,
        pTitle: values.title,
        pDesc: values.description,
        pWeb: values.website,
        pSocial: values.socials,
        pYt: YouTubeGetID(values.youtube),
        stepLock: 2,
      }));
      handleClick();
    },
  });

 

  const handleClick = () => {
    setStep((prev) => (prev += 1));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  };
  
  return ( <MainContainer>
    <SectionTitle title="Define your story" subtitle={'Describe your project and references'} />
    <Wrapper>
    <RewardDesc>Project detail cannot be changed after creation. Please make sure all information is correct.</RewardDesc>
        <FormStyle method="post" action="" enctype="multipart/form-data">
          {story_form.map((sf) => {
            const { title, name, description, text_field, p, maxLength } = sf;
            return (
              <InputContainer
                key={name}
                name={name}
                label={title}
                placeholder={p}
                description={description}
                onChange={formik.handleChange}
                type={text_field ? 'textArea' : 'text'}
                maxLength={maxLength}
                isError={formik.errors[name] != null}
                errorText={formik.errors[name]}
              />
            );
          })}
        </FormStyle>
        <BetweenRow>
          <ButtonAlt onClick={handleBack} text='Back'/>
          <ButtonAlt onClick={formik.submitForm} text='Next'/>
        </BetweenRow>
    </Wrapper>
    </MainContainer>
  );
};

export default TellStory;
