import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ResumeLogo from 'src/assets/images/CV copy.webp';
import { PaymentStatus } from 'src/constants/enum';
import GradientButton from '../../src/components/GradientButton';
import Title from '../../src/components/Title';
import TitleDescription from '../../src/components/TitleDescription';

import FileUploadButton from 'src/components/FileUploadButton';
import { Chats, User } from './../../src/api';

import { ROUTES } from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';

const Assessment = () => {
  const { id, userPayment, token } = useAuth();
  const [uploadCV, setUploadCV] = React.useState<File | null>(null);
  const [loader, setLoader] = React.useState(false);
  const [, setFile] = React.useState(null);
  const [, setHasData] = React.useState(false);
  const [, setHelperText] = React.useState('');
  const [, setUpdateProfileModal] = React.useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const assessmentId = searchParams.get('assessmentId');
  const professionId = searchParams.get('professionId');

  const uploadHandler = () => {
    if (!uploadCV) return false;
    setLoader(true);

    const formData = new FormData();
    formData.append('file', uploadCV);
    formData.append('user_id', id);

    setHelperText('Extracting PDF Data...');
    Chats.getDataFromResume(formData, token)
      .then(res => {
        setHelperText('Adding Information to Profile...');
        User.updateUserProfile(
          {
            education: res.data.data.formatedEducation,
            experience: res.data.data.formatedExperience,
            soft_skills: res.data.data.formatedSoftSkills,
            hard_skills: res.data.data.formatedHardSkills,
            certificate: res.data.data.formatedCertificate,
            project: res.data.data.formatedProject,
            profession: res.data.data.profession,
            location: res.data.data.location,
            user_id: id,
            assessmentId,
            professionId,
          },
          token,
        )
          .then(() => {
            setLoader(true);
            setHelperText('Resume Data Added. Please wait...');
            setUpdateProfileModal(true);
            if (userPayment?.payment_status === PaymentStatus.PAID) {
              navigate(ROUTES.THANK_YOU);
            } else {
              navigate(ROUTES.PLAN);
            }
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            setLoader(false);
          });
      })
      .catch(e => {
        setLoader(false);
      })
      .finally(() => {
        setFile(null);
        setHasData(true);
      });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setUploadCV(file);
    } else {
      console.error('No file selected');
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const button = document.getElementById('submitButton');
        button?.click();
      }
    });
  }, []);

  return (
    <div className='bg-primary-div-bg mt-[150px] w-full md:w-[400px] lg:w-[700px] py-10 rounded-xl mx-auto'>
      <div>
        <Title title='Resume' className='mt-0'>
          <img src={ResumeLogo} alt='resume-icon' className='shadow-custom-color' />
        </Title>
        <div className='mt-0'>
          <TitleDescription
            titleStyle='text-3xl font-semibold'
            title='Upload your CV'
            descriptionStyle='text-text-color font-normal text-base px-2 md:px-0'
            description='We need your CV for assessment'
          />
          <div className=' flex justify-center'>
            <div>
              <FileUploadButton onChange={file => handleFileChange(file)} />
              <GradientButton
                id='submitButton'
                label='Upload your CV'
                classNames='mt-4'
                onClick={uploadHandler}
                disabled={loader}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
