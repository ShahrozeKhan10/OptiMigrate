import { TextWithLink } from 'src/components/Button';

import EmailLogo from 'src/assets/images/emailLogo.webp';
import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';

const Email: React.FC = () => {
  return (
    <div className='bg-primary-div-bg mt-[150px] w-full md:w-[4yarn 00px] lg:w-[600px] py-10 rounded-xl mx-auto'>
      <div className='w-96 mx-auto '>
        <Title title='Verify Email'>
          <img src={EmailLogo} alt={'email'} className='.shadow-custom-color' />
        </Title>
        <div className='px-2'>
          <TitleDescription
            title='Thank You'
            description='Thank you for registering, We have sent you a verification email'
          />
          <TextWithLink
            className='flex text-center my-2 justify-center space-x-1 mt-10'
            emailLabel='Login'
            text='to continue'
            to='/login'
          />
        </div>
      </div>
    </div>
  );
};

export default Email;
