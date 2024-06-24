import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import React from 'react';

import GradientButton from 'src/components/GradientButton';
import Input, { PasswordInput } from 'src/components/Input';
import { ROUTES } from 'src/constants/routes';
import { TextWithLink } from './Button';
import useAuth from 'src/hooks/useAuth';

interface SignupProps {
  ButtonText: string;
  formik: {
    values: FormikValues;
    errors: FormikErrors<{
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
      confirm_password?: string;
    }>;
    touched: FormikTouched<{
      first_name?: boolean;
      last_name?: boolean;
      email?: boolean;
      password?: boolean;
      confirm_password?: boolean;
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

const Signup = ({ ButtonText, formik, error, loader }: SignupProps) => {
  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    const handleEnter = document.getElementById('section');
    handleEnter?.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        formik.submitForm();
      }
    });
  }, []);

  if (isLoggedIn) {
    return null;
  }

  return (
    <>
      <div id='section' className='flex flex-col gap-5'>
        <Input
          type='text'
          text='first_name'
          placeholder='Enter your first name'
          formik={formik}
          value={formik.values.first_name}
          error={formik.touched.first_name && formik.errors.first_name}
        />
        <Input
          type='text'
          text='last_name'
          placeholder='Enter your last name'
          formik={formik}
          value={formik.values.last_name}
          error={formik.touched.last_name && formik.errors.last_name}
        />
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
          error={formik.touched.password && formik.errors.password!}
        />
        <PasswordInput
          text='confirm_password'
          placeholder='Confirm your password'
          formik={formik}
          value={formik.values.confirm_password}
          error={formik.touched.confirm_password && formik.errors.confirm_password!}
        />
        <GradientButton label={ButtonText} onClick={formik.submitForm} disabled={loader} />
        {/* <div className='flex items-center my-5'>
        <div className='w-full border-t border-secondary-bg'></div>
        <Typography
          variant='subTitle'
          className='font-inter font-medium text-heading-color mx-3'
        >
          OR
        </Typography>
        <div className='w-full border-t border-secondary-bg'></div>
      </div>
      <button className='bg-white px-4 py-2 h-11 w-full rounded-lg shadow-md flex items-center justify-center space-x-2'>
        <GoogleIcon />
        <span className='font-inter text-base font-semibold text-gray-700 mx-2'>
          Sign up with Google
        </span>
      </button> */}
        {error.show && <div className='text-red-800'>{error.msg}</div>}
      </div>
      <TextWithLink
        className='flex text-center my-2 justify-center space-x-1 mt-10'
        text='Already have an account?'
        label='Login'
        to={ROUTES.LOGIN}
      />
    </>
  );
};

export default Signup;
