import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Cards from 'src/assets/svgs/Cards';
import CVC from 'src/assets/svgs/CVC';
import GradientButton from 'src/components/GradientButton';

import Toast from './Toast';
import { ROUTES } from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';

const CheckoutForm = ({
  onSuccess,
  amount,
  label,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (data: any) => void;
  amount: number;
  label: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { id, email } = useAuth();

  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({ email: '', name: '' });
  const [showNameMessage, setshowNameMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);

  const handleSubmit = async () => {
    setLoader(true);
    setErrorMessage('');

    if (stripe) {
      let paymentMethodId = '';
      if (!paymentMethodId) {
        if (elements === null) {
          return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
          setErrorMessage(submitError.message);
          return;
        }

        const cardElement = elements.getElement(CardNumberElement);

        cardElement?.on('change', (event: any) => {
          const currentValue = event.complete;
          if (currentValue) {
            setErrorMessage('');
          }
        });

        if (!cardElement) {
          return;
        }

        const { error: validationError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        if (validationError || state.name === '') {
          setLoader(false);
          setErrorMessage(validationError?.message);
          setshowNameMessage(true);
          return;
        }

        paymentMethodId = paymentMethod?.id;
      }
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card: paymentMethodId,
          email,
          userID: id,
          amount,
          label,
        }),
      })
        .then(data => data.json())
        .then(onSuccess)
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const handleChange = (key: string, value: string) => setState({ ...state, [key]: value });

  React.useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const button = document.getElementById('submitButton');
        button?.click();
      }
    });
  }, []);

  return (
    <>
      <div className='md:mx-28 flex flex-row md:ml-[150px]'>
        <div className='mx-auto'>
          <div>
            <div>
              <div className='mb-2 mt-10 text-sm font-normal'>CARD INFORMATION*</div>
            </div>
            <div className='flex w-[320px] md:w-[400px] flex-col rounded-lg bg-white'>
              <div className='flex h-[45px] w-full flex-row border-b'>
                <CardNumberElement className='ml-1 h-full  w-4/5 p-3' />
                <div className='flex h-full w-48 items-center justify-center'>
                  <Cards />
                </div>
              </div>
              <div className='relative flex h-[45px] w-full flex-row'>
                <CardExpiryElement
                  className='ml-2 h-[45px] w-1/2 border-r p-3 text-black'
                  options={{ placeholder: 'Expiration Date' }}
                />
                <CardCvcElement
                  className='ml-2 w-1/2 p-3'
                  options={{ placeholder: 'Security Code' }}
                />
                <div className='absolute right-3 top-2 h-6 w-6'>
                  <CVC />
                </div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className='text-sm font-inter text-red-500 text-bold mt-2'>{errorMessage}</div>
          )}
          <div>
            <div>
              <div className='mb-2 mt-8 text-xs font-normal'>NAME ON CARD*</div>
            </div>
            <div className='my-1 flex flex-col rounded-lg bg-cardBrown'>
              <input
                value={state.name}
                onChange={e => {
                  handleChange('name', e.target.value);
                  setshowNameMessage(false);
                }}
                placeholder='Enter Name'
                className='border-2 w-full h-12 px-3 rounded-lg focus:outline-none'
              />
              {showNameMessage && <p className='text-red-500 mt-2'>Card Name is Required</p>}
            </div>
          </div>
        </div>
      </div>
      <div className='md:ml-[150px] w-[320px] md:w-[400px] mx-auto rounded-xl'>
        <GradientButton
          id='submitButton'
          label={loader ? 'Submitting...' : 'Purchase'}
          disabled={loader}
          classNames='mt-4 text-center mx-auto'
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default function PaymentMethod({ amount, label }: { amount: number; label: string }) {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PK_KEY!); // public key

  const [_success, setSuccess] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_data, setData] = useState<any>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (e: any) => {
    setData(e?.data);
    setSuccess(true);
    Toast.fire({ icon: 'success', title: 'Thank You For Payment' });
    navigate(ROUTES.THANK_YOU);
  };
  return (
    <>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} label={label} onSuccess={onSuccess} />
        </Elements>

        <footer className='w-full'></footer>
      </div>
    </>
  );
}
