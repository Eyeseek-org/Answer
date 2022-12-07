import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputContainer from '../../components/form/InputContainer';
import { MainMilestoneContainer, MilestoneContainer, MainContainer } from '../../components/form/InputWrappers';
import { HTTPS_URL_REGEX } from '../../util/regex';
import SuccessDisButton from '../../components/buttons/SuccessDisButton';
import { useMutation } from '@tanstack/react-query';
import { DapAPIService } from '../../services/DapAPIService';
import Subtitle from '../../components/typography/Subtitle';
import ButtonAlt from '../../components/buttons/ButtonAlt';
import { FormDesc } from '../../components/typography/Descriptions';


const UpdateCreate = ({ objectId, bookmarks }) => {
  const { mutate: updateProject, isSuccess, isError } = useMutation(DapAPIService.updateProject);

  const { mutate: notifyReward } = useMutation(DapAPIService.handleRewardNotification);

  const handleUpdate = async (title, oid, description, url) => {
    updateProject(
      {
        title, id: oid,description, url,
      },
      {
        onSuccess: () => handleRewardNotifications(title, oid, description, url),
      }
    );
  };

  const handleRewardNotifications = async (title, oid, description, url) => {
    if (bookmarks) {
      bookmarks.forEach(async (bookmark) => {
        notifyReward({
          title: `Project update - ${title}`,
          description: description,
          objectId: oid,
          bookmark,
          long: true
        });
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      url: '',
      title: '',
      description: '',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      url: Yup.string().required('URL is required field').matches(HTTPS_URL_REGEX, 'HTTPS prefix is required'),
      title: Yup.string().required('Title is required field'),
      description: Yup.string().required('Description is required field'),
    }),
    onSubmit: (values) => {
      handleUpdate(values.title, objectId, values.description, values.url);
    },
  });

  return (
    <MainContainer>
        <MainMilestoneContainer>
          <MilestoneContainer>
            <form onSubmit={formik.handleSubmit}>
             <Subtitle text="Create new update" />
            <FormDesc>
              Notify backers and stakeholders about your project updates, rewards and followups. Insert reference to the project page or
              socials where your progress is described in more detail
            </FormDesc>
            <InputContainer
                key={'title'}
                name={'title'}
                label={'Update title'}
                placeholder={'Alpha available!'}
                description={'Entitle the update in two or three words'}
                onChange={formik.handleChange}
                type={'text'}
                maxLength={30}
                isError={formik.errors['title'] != null}
                errorText={formik.errors['title']}
              />
            <InputContainer
                key={'description'}
                name={'description'}
                label={'Description'}
                placeholder={'Check latest update on our website'}
                description={'Describe your update briefly'}
                onChange={formik.handleChange}
                type={'textArea'}
                maxLength={250}
                isError={formik.errors['description'] != null}
                errorText={formik.errors['description']}
              />
            <InputContainer
              key={'url'}
              name={'url'}
              label={'URL'}
              placeholder={'https://updates.kickstarter.com/kickstarters-four-day-work-week/'}
              description={'URL to the project update'}
              onChange={formik.handleChange}
              type={'text'}
              maxLength={120}
              isError={formik.errors['url'] != null}
              errorText={formik.errors['url']}
            />
            {!isSuccess && !isError && (
              <ButtonAlt text={' Send notification'} />      
            )}
            {isError && (
              <ButtonAlt text ='Technical error: Please try again later'/>
              
            )}
            </form>
            {isSuccess && <SuccessDisButton  width={'100%'} text="Success! Watchers were notified"></SuccessDisButton>}
          </MilestoneContainer>
        </MainMilestoneContainer>
    </MainContainer>
  );
};

export default UpdateCreate;
