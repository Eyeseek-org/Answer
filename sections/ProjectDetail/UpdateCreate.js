import { useState } from 'react'
import axios from 'axios'
import InputContainer from "../../components/form/InputContainer";
import { NextButton } from "../start_project/Category/StyleWrapper";
import { MainMilestoneContainer, MilestoneContainer, MainContainer, RewardContainer } from '../../components/form/InputWrappers'
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from "yup";
import { HTTPS_URL_REGEX } from '../../util/regex'


const UpdateCreate = ({ objectId, bookmarks, title }) => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(false)
  const [url, setUrl] = useState('URL example')

  const moralisApiConfig = {
    headers: {
      "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      "Content-Type": "application/json"
    }
  }

  const handleUpdate = async (oid) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Update`, {
        'url': url,
        'project': oid
      }, moralisApiConfig)
      setSuccess(true)
      setError(false)
      handleRewardNotifications
    } catch (error) {
      setError(true)
    }
  }

  const handleRewardNotifications = async () => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification`, {
          'title': `UPDATE!! ${title}`,
          'description': `${url}`,
          'type': 'projectUpdate',
          'user': bookmark
        }, moralisApiConfig)
      })
    }
  }

  // TBD pass correctly formik into the input
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
          <InputContainer
            label={'URL'}
            placeholder={'https://updates.kickstarter.com/kickstarters-four-day-work-week/'}
            description={'URL to the project update'}
            onChange={(e) => setUrl(e.target.value)}
            type={'text'}
          />
          {!success && !error && <NextButton onClick={() => { handleUpdate(objectId) }}>Sent update notification</NextButton>}
          {error && <NextButton onClick={() => { handleUpdate(objectId) }}>Technical error: Please try again later</NextButton>}
          {success && <NextButton onClick={() => router.push('/')}>Success: Back to the overview</NextButton>}
        </MilestoneContainer>
      </MainMilestoneContainer>
    </RewardContainer>
  </MainContainer>
}

export default UpdateCreate