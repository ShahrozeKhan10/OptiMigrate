import img from 'src/assets/images/cosumer.png';

import Typography from './Typography';

const CommunityRight = () => {
  return (
    <div className='flex items-center justify-center p-6 mt-8 lg:mt-0 sm:w-full lg:w-1/2'>
      <div className='-mt-36'>
        <div className='mt-24 mb-7 md:mb-0 md:mt-18 md:my-16 sm:text-center'>
          <Typography
            variant='heading'
            className='w-full text-center font-bold font-libreBaskerville lg:-mt-24 lg:mb-5 text-[23px] md:text-[30px]'
          >
            Let&apos;s help each other Get your visa legally
          </Typography>
        </div>
        <img
          src={img}
          alt='consumer'
          className='object-contain w-full h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128'
        />
      </div>
    </div>
  );
};

export default CommunityRight;
