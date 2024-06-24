import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Typography from './Typography';
import Waiting from 'src/assets/images/waiting2.png';
import { Auth } from 'src/api';
import Toast from './Toast';

interface JoinWaitlistModalProps {
  onClose: () => void;
  isModalOpen: boolean;
}

interface AuthError extends Error {
  error_code?: string;
}

const JoinWaitlist: React.FC<JoinWaitlistModalProps> = ({ onClose, isModalOpen }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

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
          return Toast.fire({ icon: 'error', title: res?.data.data });
        }
        Toast.fire({ icon: 'success', title: res?.data.data });
      } catch (e) {
        const authError = e as AuthError;
        Toast.fire({ icon: 'error', title: String(authError.error_code) });
        console.error('Error:', e);
      }
    }
    return;
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <div
      className={classNames(
        'fixed flex justify-center w-full items-center inset-0 z-50 md:mt-12',
        isModalOpen ? '' : 'hidden',
      )}
    >
      <div className='bg-[#FFE4A9] rounded-2xl relative shadow-lg w-full mx-5 md:mx-0 md:w-[500px]'>
        <div className='absolute top-1 right-1 m-2'>
          <button onClick={onClose} className='text-black'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='w-full mx-auto'>
          <div className='flex items-center justify-center text-center px-6 py-8'>
            <Typography
              className='!text-center text-[30px] font-libreBaskerville lg:text-4xl text-heading-color font-bold'
              variant='title'
            >
              Join Waiting List
            </Typography>
          </div>
          <div className='px-6 py-2 flex justify-center flex-col items-center'>
            <img src={Waiting} alt='modalImg' className='w-[180px]' />
            <Typography variant='subTitle' className='my-3 font-inter text-text-color text-center'>
              Please provide your email and be a part of waiting list!
            </Typography>

            <input
              type='text'
              required
              onChange={handleEmailChange}
              placeholder='Enter email address'
              className='w-10/12 mt-2 px-3 py-2 rounded-md focus:outline-none'
            />
            {!isValidEmail && (
              <div className='my-1'>
                <Typography variant='p' className='text-red-500 font-inter'>
                  Please enter a valid email address.
                </Typography>
              </div>
            )}
            <div className='flex items-center justify-center px-6 py-4'>
              <button
                onClick={handleSubmit}
                id='cancel-modal'
                className='gradient-button3 text-white rounded-lg px-12 py-2'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWaitlist;
