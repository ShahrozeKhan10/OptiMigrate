import React, { useState } from 'react';
import { Auth } from 'src/api';
import Toast from './Toast';
import Typography from './Typography';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  interface AuthError extends Error {
    error_code?: string;
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      try {
        const res = await Auth.subscribeWaitList(email);
        if (res?.data.data === 'Already Subscribed!') {
          Toast.fire({ icon: 'error', title: res?.data.data });
          setEmail('');
          return;
        }
        Toast.fire({ icon: 'success', title: res?.data.data });
        setEmail('');
      } catch (e) {
        const authError = e as AuthError;
        Toast.fire({ icon: 'error', title: String(authError.error_code) });
        console.error('Error:', e);
      }
    }
    return;
  };

  return (
    <>
      <div className='flex md:flex-row flex-col w-full md:items-start items-center justify-center'>
        <div className='flex items-center justify-center'>
          <div className='flex-col'>
            <input
              type='text'
              required
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter email address'
              className='px-2 h-14 w-full md:w-72 xl:w-80 rounded-lg focus:outline-none'
            />
            {!isValidEmail && (
              <div>
                <Typography variant='p' className='text-red-500 font-inter'>
                  Please enter a valid email address.
                </Typography>
              </div>
            )}
          </div>
        </div>
        <button
          // className='bg-purple-black mx-5 sm:mx-8 rounded-lg h-[54px] w-[97px] text-white mt-4 md:mt-1 '
          className='bg-purple-black mx-5 sm:mx-8 rounded-lg h-[54px] w-[97px] text-white mt-4 md:mt-0 '
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Subscribe;
