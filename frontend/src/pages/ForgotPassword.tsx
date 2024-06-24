import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import Toast from 'src/components/Toast';
import { Plane } from 'src/constants/images';

import { Auth } from 'src/api';

interface AuthError extends Error {
  error_code?: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);

  const handleForgotPassword = async (values: { email: string }) => {
    setLoader(true);
    try {
      await Auth.forgotPassword(values.email);
      Toast.fire({ icon: 'success', title: 'Email Sent Successfully' });
    } catch (e) {
      const authError = e as AuthError;
      Toast.fire({ icon: 'error', title: String(authError.error_code) });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const button = document.getElementById('submitButton');
        if (button) {
          button.focus();
          button.click();
        }
      }
    });
  }, []);
  return (
    <div className='w-96 mx-auto my-[150px]'>
      <Title title='Forgot Password'>
        <Plane />
      </Title>
      <div className='mt-10 px-2'>
        <TitleDescription
          title='Forgot Your Password'
          description=' Enter your registered email id here to get a reset password link.
          The reset password link will be sent to your registered email
          address'
        />
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {() => (
            <Form>
              <div className='flex border rounded-xl bg-white'>
                <Field
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='w-full py-3 px-4 rounded-xl bg-white focus:outline-none border-none peer'
                />
              </div>
              <ErrorMessage name='email' component='div' className='text-red-500' />

              <div>
                <button
                  id='submitButton'
                  type='submit'
                  disabled={loader}
                  className='gradient-button3 text-white rounded-lg mt-4 w-full py-2 md:py-3'
                >
                  {loader ? 'Sending Email...' : 'Reset Password'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
