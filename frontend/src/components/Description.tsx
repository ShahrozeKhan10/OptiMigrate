import React, { ReactNode } from 'react';

import Typography from './Typography';

interface InfoCardProps {
  heading: string;
  paragraph: string;
  children?: ReactNode;
}

const Description: React.FC<InfoCardProps> = ({ heading, paragraph, children }) => {
  return (
    <div className='p-4'>
      <Typography variant='heading' className='text-white'>
        {heading}
      </Typography>
      <Typography>{paragraph}</Typography>
      {children}
    </div>
  );
};

export default Description;
