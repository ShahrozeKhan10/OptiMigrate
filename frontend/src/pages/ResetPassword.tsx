import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as Yup from 'yup';

import EyeToggleButton from 'src/components/EyeToggleButton';
import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import Toast from 'src/components/Toast';
import { Plane } from 'src/constants/images';

import { confirm_password, password } from 'src/services/form';

import { Auth } from 'src/api';
import { ROUTES } from 'src/constants/routes';

interface AuthError extends Error {
  error_code?: string;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tokenUrl = searchParams.get('token');

  React.useEffect(() => {
    const token = String(tokenUrl);
    Auth.validateRequest(token).then(
      res => {
        setUserId(res?.data.data.id);
      },
      err => {
        Toast.fire('error', 'Token expired, submit forget password request again!');
        console.error('ValidateRequest:', err);
      },
    );
  }, []);

  const validationSchema = Yup.object().shape({
    password: password,
    confirmPassword: confirm_password,
  });

  const handleSubmit = async (values: FormValues) => {
    setLoader(true);
    try {
      const payload = {
        id: userId,
        password: values.password,
      };
      await Auth.resetPassword(payload);
      Toast.fire({ icon: 'success', title: 'Password Changed Successfully!' });
      navigate(ROUTES.LOGIN);
    } catch (e) {
      const authError = e as AuthError;
      Toast.fire({ icon: 'error', title: String(authError.error_code) });
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
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
      <Title title='Reset Password'>
        <Plane />
      </Title>
      <div className='mt-10 px-2'>
        <TitleDescription
          title='Reset Your Password'
          description=' Lost your way? No worries. Reset your password now and rediscover
          the path to your account'
        />

        <Formik<FormValues>
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <div className='flex border rounded-xl relative'>
                  <Field
                    name='password'
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder='New Password'
                    className='w-full py-3 px-4 rounded-xl bg-slate-50 focus:outline-none border-none peer'
                  />
                  <EyeToggleButton
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                  />
                </div>
                <ErrorMessage name='password' component='p' className='text-red-500' />
                <br />

                <div className='flex border rounded-xl relative'>
                  <Field
                    name='confirmPassword'
                    type={`${showConfirmPassword ? 'text' : 'password'}`}
                    placeholder='Confirm New Password'
                    className='w-full py-3 px-4 rounded-xl bg-slate-50 focus:outline-none border-none peer'
                  />
                  <EyeToggleButton
                    show={showConfirmPassword}
                    toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
                <ErrorMessage name='confirmPassword' component='p' className='text-red-500' />
              </div>

              <div>
                <button
                  id='submitButton'
                  type='submit'
                  disabled={loader}
                  className='gradient-button3 text-white rounded-lg mt-4 w-full py-2 md:py-3'
                >
                  {loader ? 'Resetting Password....' : 'Reset Password'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
