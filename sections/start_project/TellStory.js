import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useApp } from '../utils/appContext';
import SectionTitle from '../../components/typography/SectionTitle';
import InputContainer from '../../components/form/InputContainer';
import Moralis from 'moralis-v1';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { MainContainer, Wrapper } from '../../components/format/Box';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { BetweenRow } from '../../components/format/Row';

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
  const { appState, setAppState } = useApp();
  const { pTitle, pDesc, pWeb, pSocial } = { ...appState };
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const HTTPS_URL_REGEX = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      website: '',
      socials: '',
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
    }),
    onSubmit: (values) => {
      setAppState((prev) => ({
        ...prev,
        pTitle: values.title,
        pDesc: values.description,
        pWeb: values.website,
        pSocial: values.socials,
        stepLock: 2,
      }));
      handleClick();
    },
  });

  const story_form = [
    {
      title: 'Title',
      name: 'title',
      p: pTitle,
      description: 'Project title will help to find your project easily',
      text_field: false,
      maxLength: 60,
    },
    {
      title: 'Description',
      name: 'description',
      p: pDesc,
      description: 'Describe your project value in few sentences',
      text_field: true,
      maxLength: 235,
    },
    {
      title: 'Website',
      name: 'website',
      p: pWeb,
      description: 'Provide website with your project detail',
      text_field: false,
      maxLength: 120,
    },
    {
      title: 'Socials',
      name: 'socials',
      p: pSocial,
      description: 'Link to your primary socials. (Twitter, Instagram, Facebook, etc.)',
      text_field: false,
      maxLength: 100,
    },
  ];

  const handleClick = () => {
    setStep((prev) => (prev += 1));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  };

  const handleFileUpload = async (event) => {
    const newImage = event.target.files[0];
    // Save image to IPFS & retrieve its url
    const moralisFileInstance = new Moralis.File(newImage.name, newImage);
    const moralisIPFSImage = await moralisFileInstance.saveIPFS({ useMasterKey: true });
    if (moralisIPFSImage) {
      setAppState((prev) => ({ ...prev, pImageUrl: moralisIPFSImage._url }));
      setImage(moralisIPFSImage._url);
    }
  };

  return ( <MainContainer>
    <SectionTitle title="Define your story" subtitle={'Describe your project and references'} />
    <Wrapper>
        <FormStyle method="post" action="" enctype="multipart/form-data">
          <label className="custom-file-upload">
            <input className="input-file" type="file" id="file" onChange={handleFileUpload} />
            {image ? (
              <Image src={image} width={'400px'} height={'300px'} alt="Project image" />
            ) : (
              <span className="input-span">Upload project image</span>
            )}
          </label>
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
