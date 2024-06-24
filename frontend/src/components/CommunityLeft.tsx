import React from 'react';
import circleImage1 from 'src/assets/images/circleImage1.webp';
import circleImage2 from 'src/assets/images/circleImage2.webp';
import circleImage3 from 'src/assets/images/circleImage3.webp';

import Typography from './Typography';
import UserCard from './UserCard';

const CommunityLeft = () => {
  return (
    <div className='flex flex-col justify-center text-center sm:w-full lg:w-1/2 lg:text-left'>
      <div className='w-full text-slate-300 sm:mt-0 mt-8'>
        <Typography variant='subTitle' className='text-[#728095] font-inter lg:w-9/12'>
          This reviews section serves as a testament to our dedication to delivering quality and
          forging lasting connections with our valued clientele.
        </Typography>
        {/* <button className='w-[162px] h-[52px] gradient-button3 text-white rounded my-6'>
          Join Community
        </button> */}
      </div>
      <div className='flow-root'>
        <UserCard
          imageSrc={circleImage1}
          userName='Kriston Watson'
          userHandle='@KritsonWatson'
          userDescription='Had an amazing time exploring the beautiful landscapes of Country Norway.'
        />
        <UserCard
          imageSrc={circleImage2}
          userName='Leslie Alexander'
          userHandle='@LeslieAlexander'
          userDescription='Enjoyed the delicious food and rich history of Italy.'
        />
        <UserCard
          className='opacity-50'
          imageSrc={circleImage3}
          userName='Darlene Robertson'
          userHandle='@DarleneRobertson'
          userDescription='Had an fantastic trip exploring national parks in the US!'
        />
        <UserCard
          className='opacity-20'
          imageSrc={circleImage3}
          userName='Leslie Alexander'
          userHandle='@LeslieAlexander'
          userDescription='Incredible experience in Tokyo and Kyoto!'
        />
      </div>
    </div>
  );
};

export default CommunityLeft;
