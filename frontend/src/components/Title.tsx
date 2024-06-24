import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';
import Typography from './Typography';

interface Props {
  title: string;
  className?: string;
  children?: ReactNode;
}

const Title = ({ title, children, className = '' }: Props) => {
  return (
    <>
      <Typography
        variant='title'
        className={twMerge(
          'text-center font-libreBaskerville text-heading-color font-semibold mt-10',
          className,
        )}
      >
        {title}
      </Typography>
      {children ? <Typography className='flex justify-center my-5'>{children}</Typography> : null}
    </>
  );
};

export default Title;
