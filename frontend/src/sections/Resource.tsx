import { MdOutlineNavigateNext } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import CardSection from 'src/components/CardSections';
import Typography from 'src/components/Typography';
import { LatestVideos, VisaResources } from 'src/constants/cardData';

const Resources: React.FC = () => {
  return (
    <div className='pb-32 bg-white'>
      <div className='text-center w-full md:w-6/12 mx-auto my-auto pt-16'>
        <Typography
          variant='title'
          className='font-bold text-xl md:text-4xl font-libreBaskerville '
        >
          Resources
        </Typography>
        <Typography variant='subTitle' className='pt-10 py-3'>
          A global journey from the comfort of your screen as you explore countries through a
          collection of mesmerizing videos. Immerse yourself in the vibrant cultures, breathtaking
          landscapes, and diverse traditions that make each destination unique.
        </Typography>
        <div className='py-4 flex justify-center'>
          <Link to={ROUTES.COUNTRIES}>
            <button className='gradient-button3 rounded-lg py-3 px-6 text-white flex items-center'>
              Explore all countries
              <MdOutlineNavigateNext color='white' className='ml-2' size={20} />
            </button>
          </Link>
        </div>
      </div>

      <CardSection cards={LatestVideos} cardType='Latest Videos' />
      <CardSection cards={VisaResources} cardType={''} />
    </div>
  );
};

export default Resources;
