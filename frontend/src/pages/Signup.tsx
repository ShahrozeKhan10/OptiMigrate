import * as React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// import LoadingSpinner from "src/components/LoadingSpinner";
import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import Toast from 'src/components/Toast';
import { Plane } from 'src/constants/images';
import { validationSignupSchema } from 'src/services/form';

import { ISignup } from 'src/@types';
import { Auth } from 'src/api';
import { ROUTES } from 'src/constants/routes';
import SignupComponent from 'src/components/Signup';

const initialError = { show: false, msg: '' };

const SignUp = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(initialError);

  const handleSubmit = async (data: ISignup) => {
    setError(initialError);
    setLoader(true);
    try {
      await Auth.signUp(data);
      navigate(ROUTES.EMAIL);
      Toast.fire({ icon: 'success', title: 'Account Created Successfully' });
    } catch {
    } finally {
      setLoader(false);
    }
  };

  const signUpFormik = useFormik({
    initialValues: {
      confirm_password: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
    },
    validationSchema: validationSignupSchema,
    onSubmit: async values => {
      await handleSubmit({
        name: `${values.first_name} ${values.last_name}`,
        email: values.email,
        password: values.password,
        gender: 'male',
      });
    },
  });

  return (
    <div className='md:w-96 mx-auto my-[150px]'>
      <Title title='Sign Up'>
        <Plane />
      </Title>
      <div className='mt-10 px-2'>
        <TitleDescription
          title='Create an account'
          description="Let's create your profile for moving abroad"
        />
        <SignupComponent
          loader={loader}
          ButtonText='Get Started'
          formik={signUpFormik}
          error={error}
        />
      </div>
    </div>
  );
};

export default SignUp;
