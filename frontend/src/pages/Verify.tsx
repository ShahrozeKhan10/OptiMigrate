import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Auth } from 'src/api';
import Toast from 'src/components/Toast';
import { ROUTES } from 'src/constants/routes';

interface AuthError extends Error {
  error_code?: string;
}

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      Toast.fire({ icon: 'error', title: 'Invalid Token' });
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 5000);
      return;
    }

    Auth.validateEmail(token)
      .then(() => {
        setLoading(false);
        Toast.fire({ icon: 'success', title: 'Email Verified!' });
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 1500);
      })
      .catch((error: AuthError) => {
        setLoading(false);
        Toast.fire({
          icon: 'error',
          title: error.error_code ?? 'Already Verified or Invalid Request',
        });
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 5000);
      });
  }, [token, navigate]);

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <p className='text-3xl mt-36'>Please Wait...</p>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
