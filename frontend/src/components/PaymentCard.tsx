// @ts-nocheck
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';

interface PlanInfoItem {
  description: string;
}

interface PaymentCardProps {
  planInfo: PlanInfoItem[];
  title: string;
  amount?: string;
  buttonText?: string;
  disable?: boolean;
  onClick?: () => Promise<void>;
  duration: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  planInfo,
  title,
  amount,
  buttonText,
  disable,
  onClick,
  duration,
}) => {
  const [loading, setLoading] = useState(false);
  const isSubscribed = useMemo(
    () => buttonText?.toLowerCase() === 'already subscribed',
    [buttonText],
  );

  const handleOnClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <>
      <div
        className={classNames(
          'relative w-full mt-8 max-w-sm border border-gray-200 bg-white rounded-lg shadow-sm p-8 dark:bg-gray-800 dark:border-gray-700 mx-4 h-[500px] flex flex-col justify-between transform transition-transform hover:-translate-y-1 hover:shadow-xl',
          { 'border-4 border-heading-color': isSubscribed },
        )}
      >
        <div>
          <h5 className='mb-4 text-xl font-bold text-primaryBg dark:text-gray-400'>{title}</h5>
          <div className='flex items-baseline text-primaryBg text-center  w-full dark:text-white '>
            <span className='text-3xl font-semibold'>$</span>
            <span className='text-5xl font-extrabold tracking-tight'>
              {amount} <span className='text-lg font-semibold'>/ {duration}</span>
            </span>
          </div>
          <ul role='list' className='space-y-5 my-7'>
            {planInfo.map(({ description }, index) => {
              return (
                <li className='flex space-x-3 items-center' key={index}>
                  <svg
                    className='flex-shrink-0 w-4 h-4 text-primaryBg dark:text-primaryBg'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                  </svg>
                  <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                    {description}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type='button'
          disabled={disable || isSubscribed}
          onClick={handleOnClick}
          className={classNames(
            'gradient-button3 text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2 inline-flex justify-center w-full text-center disabled:cursor-not-allowed ',
            {
              'bg-gray-400': `disabled:${disable}`,
            },
          )}
        >
          {buttonText}
        </button>
        {buttonText?.toLowerCase() === 'already subscribed' ? (
          <div className='text-heading-color absolute -top-4 -right-4'>
            <BsPatchCheckFill size={50} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PaymentCard;
