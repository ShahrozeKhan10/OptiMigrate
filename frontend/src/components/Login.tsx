import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React from 'react';

import GradientButton from 'src/components/GradientButton';
import Input, { PasswordInput } from 'src/components/Input';

import { ROUTES } from 'src/constants/routes';
import { TextWithLink } from './Button';

interface LoginProps {
  ButtonText: string;
  formik: {
    values: FormikValues;
    errors: FormikErrors<{
      email?: string;
      password?: string;
    }>;
    touched: FormikTouched<{
      email?: boolean;
      password?: boolean;
    }>;
    submitForm: () => void;
    handleChange: (values: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (FormikValues: React.FocusEvent<HTMLInputElement>) => void;
  };
  error: {
    show: boolean;
    msg: string;
  };
  loader: boolean;
}

const Login = ({ ButtonText, formik, error, loader }: LoginProps) => {
  React.useEffect(() => {
    const handleEnter = document.getElementById('container');
    handleEnter?.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        formik.submitForm();
      }
    });
  }, []);

  return (
    <>
      <div id='container' className='flex flex-col gap-5'>
        <Input
          type='email'
          text='email'
          placeholder='Enter your email'
          formik={formik}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />

        <PasswordInput
          text='password'
          placeholder='Enter your password'
          formik={formik}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <GradientButton label={ButtonText} onClick={formik.submitForm} disabled={loader} />

        <TextWithLink
          className='mt-2 text-right'
          linkClassName='!text-heading-color'
          text=''
          label='Forgot Password?'
          to={ROUTES.FORGOT_PASSWORD}
        />
        {error.show && <div className='text-red-800 text-sm my-8'>{error.msg}</div>}
      </div>
      <TextWithLink
        className='flex text-center my-2 justify-center space-x-1 mt-10'
        text="Don't have an account?"
        label='Signup'
        to={ROUTES.SIGNUP}
      />
    </>
  );
};

export default Login;
