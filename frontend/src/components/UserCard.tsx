import React from 'react';

import Typography from './Typography';
import { twMerge } from 'tailwind-merge';

interface UserCardProps {
  imageSrc: string;
  userName: string;
  userHandle: string;
  userDescription: string;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  imageSrc,
  userName,
  className = '',
  userHandle,
  userDescription,
}) => {
  return (
    <div
      className={twMerge(
        'my-4 pl-8 py-5 sm:py-4 border border-gray-600 rounded-xl p-2 w-full',
        className,
      )}
    >
      <div className='flex items-center space-x-4 '>
        <div className='flex-shrink-0'>
          <img className='w-12 h-12 rounded-full' src={imageSrc} alt={`${userName}'s`} />
        </div>
        <div className='flex-1 min-w-0'>
          <Typography variant='subTitle' className='text-sm font-medium truncate'>
            {userName}
          </Typography>
          <Typography variant='subTitle' className='text-sm truncate opacity-20'>
            {userHandle}
          </Typography>
        </div>
      </div>
      <Typography variant='subTitle' className='mt-3'>
        {userDescription}
      </Typography>
    </div>
  );
};

export default UserCard;
