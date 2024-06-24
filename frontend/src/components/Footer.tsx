import React from 'react';

import { FacebookIcon, Instagram, LinkedInIcon, Logo, Twitter } from 'src/constants/images';

import globe from 'src/assets/images/globeFooter.webp';
import bgImage from 'src/assets/images/footertopSVG.png';

import Typography from './Typography';

interface SocialLinksProps {
  icon: JSX.Element;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ icon }) => {
  return <div className='mx-1'>{icon}</div>;
};

const Footer = () => {
  return (
    <footer className='container mx-auto text-footer-text-color font-medium sm:mt-5 md:mt-20 bg-footerbg bg-no-repeat bg-bottom'>
      <div className='hidden md:flex md:flex-row justify-between mx-10'>
        <div className='md:flex flex-1 items-center '>
          <p className='mr-10'>Terms & Conditions</p>
          <p className='mr-10 font-semibold md:font-normal'>Privacy Policy</p>
        </div>
        <Logo className=' mt-4 md:mt-0' />
        <div className='md:flex flex-1 justify-end items-center'>
          <p className='ml-10 font-semibold md:font-normal'>Cookies</p>
          <p className='ml-10 font-semibold md:font-normal'>License</p>
        </div>
      </div>
      <div className='hidden md:flex md:justify-between mx-10'>
        <div className='flex justify-between mt-5'>
          <div className='flex flex-1 items-center'>
            <SocialLinks className='mix-blend-darken' icon={<FacebookIcon />} />
            <SocialLinks className='mix-blend-darken' icon={<Twitter />} />
            <SocialLinks className='mix-blend-darken' icon={<LinkedInIcon />} />
            <SocialLinks className='mix-blend-darken' icon={<Instagram />} />
          </div>
        </div>
        <div className='text-light-gray font-thin mt-7'>
          <Typography>Copyright © {new Date().getFullYear()} ZindaBhag</Typography>
        </div>
      </div>

      <div className='flex justify-center items-center md:hidden flex-col bg-footerbg bg-cover bg--repeat'>
        <Logo className='mt-12' />
        <div className='flex flex-1 justify-between font-normal flex-wrap items-center mb-16 mt-4'>
          <div className='ml-2 '>
            <p className='font-semibold'>Terms & Conditions</p>
            <p className='ml-20 mt-3 font-semibold'>Cookies</p>
          </div>
          <div>
            <p className='ml-10 font-semibold'>Privacy Policy</p>
            <p className='ml-6 mt-3 font-semibold'>License</p>
          </div>
        </div>
        <div className='flex items-center'>
          <SocialLinks icon={<FacebookIcon />} />
          <SocialLinks icon={<Twitter />} />
          <SocialLinks icon={<LinkedInIcon />} />
          <SocialLinks icon={<Instagram />} />
        </div>
        <div className='flex flex-1 justify-center text-center -mb-24 opacity-70'>
          <Typography className='mt-9'>
            Copyright © {new Date().getFullYear()} ZindaBhag
          </Typography>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-80 h-64 overflow-hidden'>
            <div className='w-full h-full transform translate-y-1/2'>
              <img src={globe} alt='globe' className='object-cover animate-spin-slow' />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='hidden md:flex justify-center -my-44'>
          <img src={bgImage} className='' alt='Footer' />
        </div>

        <div className='hidden md:flex justify-center'>
          <div className='w-96 h-64 ml-7 overflow-hidden'>
            <div className='w-full h-full transform translate-y-1/2'>
              <img src={globe} alt='globe' className='object-cover animate-spin-slow' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
