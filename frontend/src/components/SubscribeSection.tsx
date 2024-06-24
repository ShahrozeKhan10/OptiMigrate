import mapImage from 'src/assets/images/mapFooter.png';

import Subscribe from 'src/components/Subscribe';
import Typography from 'src/components/Typography';

const SubscribeSection: React.FC = () => {
  return (
    <div className='bg-primary-bg w-full'>
      <div className='flex justify-center items-center flex-col pt-16'>
        <Typography className='text-center font-libreBaskerville' variant='heading'>
          Subscribe to be in touch
        </Typography>
        <Typography className='text-center mt-4' variant='subTitle'>
          Join our group of 15000 people who want a better future in a legal way
        </Typography>
        <div className='flex justify-center items-center flex-col sm:flex-row my-6 z-10'>
          <Subscribe />
        </div>
      </div>
      <div className='flex justify-center items-center z-10'>
        <img src={mapImage} alt='map' className='-mt-16' width={900} height={700} />
      </div>
    </div>
  );
};
export default SubscribeSection;
