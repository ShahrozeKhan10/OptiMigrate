import * as React from 'react';

import PaymentTabs from 'src/components/PaymentTabs';
import StripeMethod from 'src/components/Stripe';
import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import { Plane } from 'src/constants/images';

const Payment = () => {
  const [amount, setAmount] = React.useState(29);
  const [label, setLabel] = React.useState('');
  return (
    <div className='w-96 mx-auto !my-[150px] sm:my-10 px-4 sm:px-0'>
      <Title title='Payment'>
        <Plane className='w-full max-w-[270px] h-auto' />
      </Title>
      <div className='mt-4 sm:mt-10'>
        <TitleDescription
          titleStyle='font-semibold text-3xl !text-heading-color'
          title='Let’s help you find your destination'
          descriptionStyle='!text-base !font-normal !text-text-color'
          description='We will send you an email report after assessment'
        />
        <div className='w-full sm:w-[390px] mx-auto'>
          <PaymentTabs setLabel={setLabel} setAmount={setAmount} />
        </div>

        <div className='flex justify-center items-center'>
          <StripeMethod label={label} amount={amount} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
