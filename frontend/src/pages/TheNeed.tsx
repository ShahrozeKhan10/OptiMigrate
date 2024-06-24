import Typography from 'src/components/Typography';
import ListImage from 'src/assets/images/ListItem.png';
import need1 from 'src/assets/images/theNeed1.webp';
import need2 from 'src/assets/images/theNeed2.webp';
import { Link } from 'react-router-dom';

const TheNeed = () => {
  return (
    <>
      <div className='py-8 flex justify-center items-center'>
        <Typography
          className='text-center text-[30px] mx-5 font-libreBaskerville lg:text-5xl text-heading-color font-bold'
          variant='title'
        >
          Need Of Time
        </Typography>
      </div>
      <div className='bg-secondary-bg mt-7 w-full p-2'>
        <div className='flex flex-wrap pt-10 md:flex-nowrap justify-center items-center mx-auto w-full md:w-7/12'>
          <div className='px-1 xl:mx-10'>
            <img src={need1} alt='the need first' className='w-full h-full mx-0 md:mx-2' />
            <Typography
              className='font-libreBaskerville text-heading-color font-bold px-3 my-2'
              variant='p'
            >
              source:{' '}
              <Link className='!font-normal text-blue italic' to='https://www.aljazeera.com/'>
                aljazeera.com
              </Link>
            </Typography>
          </div>
          <div className='px-1 xl:mx-10 '>
            <img src={need2} alt='the need second' className='w-full h-full mx-0 md:mx-2' />
            <Typography
              className='font-libreBaskerville text-heading-color font-bold px-3 my-2'
              variant='p'
            >
              source:{' '}
              <Link className='!font-normal text-blue italic' to='https://www.aljazeera.com/'>
                aljazeera.com
              </Link>
            </Typography>
          </div>
        </div>
        <div className='mx-auto w-full md:w-[55%] pb-10'>
          <Typography variant='p' className='mx-2 my-4 text-text-color font-inter'>
            Amidst the vast expanse of statistics and data, there lies a heart-wrenching truth that
            demands our collective attention: 75,000 lives lost in the pursuit of a dream. Behind
            each number is a story of hope, of individuals who dared to dream of a better life
            beyond their horizons. These lives, tragically cut short on perilous migratory routes,
            represent the depths of human aspiration and the desperate longing for change. The
            stories of these souls yearning for a brighter future echo through the corridors of
            time, a haunting reminder of the urgent need for compassion, humanity, and a safer path
            towards prosperity. Let us honor their memory by reshaping the narrative, by advocating
            for legal immigration avenues that prioritize life over danger, opportunity over
            despair. Together, we can transform these heartbreaking statistics into a legacy of
            resilience, ensuring that every journey towards a new beginning is one of hope, dignity,
            and survival.
          </Typography>
          <ul className='py-3 mx-4 '>
            <li className='flex items-center text-purple-color hover:text-blue cursor-pointer'>
              <img src={ListImage} className='mr-2' alt='list item' />
              <Link
                target='_blank'
                to='https://www.aljazeera.com/news/2023/8/12/six-dead-after-migrant-boat-capsizes-crossing-from-france-to-uk'
              >
                Six dead after refugee boat capsizes in English Channel
              </Link>{' '}
            </li>
            <li className='flex items-center text-purple-color hover:text-blue cursor-pointer'>
              <img src={ListImage} className='mr-2' alt='list item' />
              <Link
                to='https://www.aljazeera.com/news/2023/8/9/dozens-dead-after-boat-capsizes-off-tunisia-four-survivors-arrive-in-italy'
                target='_blank'
              >
                Dozens dead after boat capsizes off Tunisia, four survivors arrive in Italy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TheNeed;
