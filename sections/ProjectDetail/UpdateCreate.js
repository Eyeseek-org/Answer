import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputContainer from '../../components/form/InputContainer';
import { MainMilestoneContainer, MilestoneContainer, MainContainer, RewardContainer } from '../../components/form/InputWrappers';
import { HTTPS_URL_REGEX } from '../../util/regex';
import SuccessDisButton from '../../components/buttons/SuccessDisButton';
import { useMutation } from '@tanstack/react-query';
import { DapAPIService } from '../../services/DapAPIService';
import Subtitle from '../../components/typography/Subtitle';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { FormDesc } from '../../components/typography/Descriptions';


const UpdateCreate = ({ objectId, bookmarks, title }) => {
  const [url, setUrl] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');

  // Missing auth for parse, maybe master: true needed
 // const { mutate: updateParseProject, isSuccess, isError } = useMutation(DapAPIService.updateParseProject);
  const { mutate: updateProject, isSuccess, isError } = useMutation(DapAPIService.updateProject);

  const { mutate: notifyReward } = useMutation(DapAPIService.handleRewardNotification);

  const handleUpdate = async (oid) => {
    updateProject(
      {
        id: oid,
        title,
        url,
      },
      {
        onSuccess: () => handleRewardNotifications(),
      }
    );
  };

  const handleRewardNotifications = async () => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        notifyReward({
          title: updateTitle,
          oldTitle: title,
          objectId,
          bookmark,
        });
      });
    }
  };

  // TBD pass correctly formik into the input, right now validations are off
  const formik = useFormik({
    initialValues: {
      url: '',
      title: ''
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      url: Yup.string().required('URL is required field').matches(HTTPS_URL_REGEX, 'References are accepted with HTTPS prefix only'),
      title: Yup.string().required('Title is required field'),
    }),
    onSubmit: (values) => {
      handleUpdate(objectOd);
    },
  });

  return (
    <MainContainer>
      <RewardContainer>
        <MainMilestoneContainer>
          <MilestoneContainer>
             <Subtitle text="Create new update" />
            <FormDesc>
              Notify backers and stakeholders about your project updates, rewards and followups. Insert reference to the project page or
              socials where your progress is described in more detail
            </FormDesc>
            <InputContainer
                key={'title'}
                name={'title'}
                label={'Update title'}
                value={updateTitle}
                placeholder={'Alpha available!'}
                description={'Describe your update in two or three words'}
                onChange={(e) => setUpdateTitle(e.target.value)}
                type={'text'}
                maxLength={30}
                isError={formik.errors[updateTitle] != null}
                errorText={formik.errors[updateTitle]}
              />
            <InputContainer
              key={'url'}
              name={'url'}
              value={url}
              label={'URL'}
              placeholder={'https://updates.kickstarter.com/kickstarters-four-day-work-week/'}
              description={'URL to the project update'}
              onChange={(e) => setUrl(e.target.value)}
              type={'text'}
              maxLength={120}
              isError={formik.errors[url] != null}
              errorText={formik.errors[url]}
            />
            {!isSuccess && !isError && url && (
              <ButtonAlt
                onClick={() => {
                  handleUpdate(objectId);
                }}
                text={' Send notification'}
              />
            )}
            {isError && (
              <ButtonAlt
                onClick={() => {
                  handleUpdate(objectId);
                }} text ='Technical error: Please try again later'
              />
            )}
            {isSuccess && <SuccessDisButton width={'100%'} text="Success! Watchers were notified"></SuccessDisButton>}
          </MilestoneContainer>
        </MainMilestoneContainer>
      </RewardContainer>
    </MainContainer>
  );
};

export default UpdateCreate;
