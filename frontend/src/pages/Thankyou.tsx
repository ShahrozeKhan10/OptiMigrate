import * as React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { UserPayment } from 'src/api';
import Typography from 'src/components/Typography';
import { ROUTES } from 'src/constants/routes';

import Group from 'src/assets/images/Group 19.png';
import useAuth from 'src/hooks/useAuth';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const { token } = useAuth();

  const navigate = useNavigate();

  const paymentHandler = React.useCallback(async () => {
    const userData = await localStorage.getItem('loginData');
    const parsedData = await JSON.parse(userData!);

    if (sessionId) {
      try {
        await UserPayment.paymentHistory(token, {
          sessionId,
          email: parsedData.user.email,
          userId: parsedData.user.id,
        });
        navigate(ROUTES.THANK_YOU, { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  }, [navigate, sessionId, token]);

  React.useEffect(() => {
    paymentHandler();
  }, [paymentHandler]);

  return (
    <div className='bg-primary-div-bg mt-[150px] w-full md:w-[400px] lg:w-[600px] py-10 rounded-xl mx-auto'>
      <div className='flex flex-col text-heading-color justify-center items-center text-center'>
        <Typography variant='heading' className='font-semibold font-libreBaskerville'>
          Your Assessment Received
          <img src={Group} alt={'payment'} className='-mt-14' />
        </Typography>

        <Typography variant='subTitle' className='font-semibold pt-4 font-inter text-3xl -mt-14'>
          Check your email
        </Typography>
        <Typography variant='subTitle' className='font-inter text-base my-2 p-1'>
          We’re calculating your assessment score, you’ll be notified via email once the score it
          calculated!
        </Typography>

        <div className='flex items-center my-5 '>
          <Typography variant='subTitle' className='font-semibold font-inter text-2xl'>
            Assessment Received
          </Typography>

          <AiOutlineCheckCircle className='mx-3' color='#4F8C97' size={22} />
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
