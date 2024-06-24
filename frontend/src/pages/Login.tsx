import { useFormik } from 'formik';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import Toast from 'src/components/Toast';

import { Plane } from 'src/constants/images';
import { validationLoginSchema } from 'src/services/form';

import { ILogin } from 'src/@types';
import { Auth } from 'src/api';

import LoginComponent from 'src/components/Login';
import { ROUTES } from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';

const initialError = { show: false, msg: '' };

interface AuthError extends Error {
  error_code?: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(initialError);
  const [loader, setLoader] = React.useState(false);

  const { setUserDetails } = useAuth();

  const handleSubmit = async (data: ILogin) => {
    setError(initialError);
    setLoader(true);
    try {
      const res = await Auth.signIn(data);
      const { email, name, id, token } = res?.data?.data;
      setUserDetails({ email, name, id, token });

      navigate(ROUTES.DASHBOARD);
      Toast.fire({ icon: 'success', title: 'Login Success' });
    } catch (e) {
      const authError = e as AuthError;
      Toast.fire({ icon: 'error', title: String(authError.error_code) });
    } finally {
      setLoader(false);
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: validationLoginSchema,
    onSubmit: async values => {
      await handleSubmit({ email: values.email, password: values.password });
    },
  });

  return (
    <div className='md:w-96 mx-auto my-[150px]'>
      <Title title='Sign In'>
        <Plane />
      </Title>
      <div className='mt-10 px-2'>
        <TitleDescription
          title='Login to your account'
          description="Let's access your profile for moving abroad"
        />
        <LoginComponent ButtonText='Login' formik={loginFormik} error={error} loader={loader} />
      </div>
    </div>
  );
};

export default SignIn;
