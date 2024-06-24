import { Stripe } from 'src/api';
import PaymentCard from 'src/components/PaymentCard';

import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import useAuth from 'src/hooks/useAuth';

const planInfo = [
  { description: 'Multiple Assessments.' },
  { description: 'Score Calculation.' },
  { description: 'Recommended Countries.' },
  { description: 'Visa Chances of Recommended Countries.' },
];

const Plan: React.FC = () => {
  const { token, userPayment, email, id } = useAuth();

  const premiumPlans = [
    {
      title: 'Premium Plan',
      amount: '100',
      priceId: process.env.REACT_APP_STRIPE_MONTHLY_PRICE_ID,
      duration: '1 Month',
    },
    {
      title: 'Most Popular Plan',
      amount: '250',
      priceId: process.env.REACT_APP_STRIPE_QUARTLY_PRICE_ID,
      duration: '3 Months',
    },
    {
      title: 'Yearly Plan',
      amount: '900',
      priceId: process.env.REACT_APP_STRIPE_YEARLY_PRICE_ID,
      duration: '1 Year',
    },
  ];

  const planName = premiumPlans.find(
    plan => plan.priceId && userPayment?.payment_id && plan.priceId === userPayment?.payment_id,
  );

  const stripeHandler = async (priceId: any, planTitle: any) => {
    try {
      const data = await Stripe.payment(token, {
        email,
        userId: id,
        priceId,
        planTitle,
      });

      const stripeCheckoutUrl = data.data.data.url;

      window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonTxt = ({ plan, index }: { plan: any; index: number }) => {
    const currentPlanIndex = premiumPlans.findIndex(item => item.priceId === planName?.priceId);

    if (currentPlanIndex < 0) {
      return 'Choose Plan';
    }

    if (currentPlanIndex === index) {
      return 'Already Subscribed';
    }
    if (currentPlanIndex > index) {
      return 'Downgrade';
    }
    if (currentPlanIndex < index) {
      return 'Upgrade';
    }
  };

  return (
    <>
      <Title title='Payment Plans' />
      <TitleDescription
        titleStyle='mt-0'
        descriptionStyle='font-normal !text-text-color'
        title='Elevate your Zindabhag experience with our enhanced plan for expanded
        opportunities.'
        // description={`You are using ${
        //   userPayment?.payment_status === 'paid'
        //     ? planName?.title || 'Free Plan'
        //     : 'Free Plan'
        // }`}
      />
      <div className='w-11/12 mx-auto md:w-full'>
        <div className='flex flex-wrap justify-center items-center my-6'>
          {premiumPlans.map((plan, index) => (
            <PaymentCard
              key={plan.title}
              planInfo={planInfo}
              title={plan.title}
              duration={plan.duration}
              amount={plan.amount}
              disable={userPayment?.payment_status === 'paid'}
              buttonText={handleButtonTxt({ plan, index })}
              onClick={() => stripeHandler(plan.priceId, plan.title)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Plan;
