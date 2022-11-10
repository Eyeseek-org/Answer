import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup";

import InputContainer from "../../components/form/InputContainer";
import { NextButton } from "../start_project/Category/StyleWrapper";
import { MainMilestoneContainer, MilestoneContainer, MainContainer, RewardContainer } from '../../components/form/InputWrappers'
import { HTTPS_URL_REGEX } from '../../util/regex'
import SuccessDisButton from '../../components/buttons/SuccessDisButton'

const Description = styled.div`
  font-size: 1em;
  font-family: 'Montserrat';
  margin-bottom: 2%;
  letter-spacing: 0.2px;
  line-height: 1.5em;
  background: rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(176, 246, 255, 0.4);
  padding-top: 0.5%;
`

const UpdateCreate = ({ objectId, bookmarks, title }) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [url, setUrl] = useState('URL example')
  const [updateTitle, setUpdateTitle] = useState('Update')

  const moralisApiConfig = {
    headers: {
      "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      "Content-Type": "application/json"
    }
  }

  const handleUpdate = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Update`, {
        'title': updateTitle,
        'url': url,
        'project': oid
      }, moralisApiConfig)
      setSuccess(true)
      setError(false)
      await handleRewardNotifications()
    } catch (error) {
      setError(true)
    }
  }

  const handleRewardNotifications = async () => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
          'title': updateTitle,
          'description': `Project ${title} has been updated!`,
          'type': 'projectUpdate',
          'project': objectId,
          'user': bookmark
        }, moralisApiConfig)
      })
    }
  }

  // TBD pass correctly formik into the input, right now validations are off
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required field"),
      description: Yup.string().required("Description is required field"),
      website: Yup.string().required("Website is required field").matches(
        HTTPS_URL_REGEX,
        'Refernces are accepted with HTTPS prefix only'
      ),
      socials: Yup.string().required("Socials is required field!").matches(
        HTTPS_URL_REGEX,
        'Refernces are accepted with HTTPS prefix only'
      ),
    }),
    onSubmit: (values) => {
      setAppState((prev) => ({ ...prev, pTitle: values.title, pDesc: values.description, pWeb: values.website, pSocial: values.socials }));
      handleClick();
    }
  });


  return <MainContainer>
    <RewardContainer>
      <MainMilestoneContainer>
        <MilestoneContainer>
          <Description>Notify backers and stakeholders about your project updates, rewards and followups. Insert reference to the project page or socials where your progress is described in more detail</Description>
          <InputContainer
            label={'Update title'}
            placeholder={'Alpha available!'}
            description={'Describe your update in two or three words'}
            onChange={(e) => setUpdateTitle(e.target.value)}
            type={'text'}
          />
          <InputContainer
            label={'URL'}
            placeholder={'https://updates.kickstarter.com/kickstarters-four-day-work-week/'}
            description={'URL to the project update'}
            onChange={(e) => setUrl(e.target.value)}
            type={'text'}
          />
          {!success && !error && !url !== 'URL example' && <NextButton onClick={() => { handleUpdate(objectId) }}>Send notification</NextButton>}
          {error && <NextButton onClick={() => { handleUpdate(objectId) }}>Technical error: Please try again later</NextButton>}
          {success && <SuccessDisButton width={'100%'} text='Success! Watchers were notified'></SuccessDisButton>}
        </MilestoneContainer>
      </MainMilestoneContainer>
    </RewardContainer>
  </MainContainer>
}

export default UpdateCreate