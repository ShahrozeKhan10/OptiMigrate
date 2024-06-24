import { Link } from 'react-router-dom';
import rescue1 from 'src/assets/images/rescue1.webp';
import rescue2 from 'src/assets/images/rescue2.webp';
import Typography from 'src/components/Typography';

const TheStory = () => {
  return (
    <>
      <div className='py-8 flex justify-center items-center'>
        <Typography
          className='text-center text-[30px] mx-5 font-libreBaskerville lg:text-5xl text-heading-color font-bold'
          variant='title'
        >
          Our Story
        </Typography>
      </div>
      <div className='bg-secondary-bg mt-7 w-full'>
        <div className='flex flex-wrap pt-10 lg:flex-nowrap justify-center items-center mx-auto w-full md:w-7/12'>
          <div className='px-1 xl:mx-10'>
            <img src={rescue1} alt='the need first' className='w-full h-full' />
            <Typography
              className='font-libreBaskerville text-heading-color font-bold my-2'
              variant='p'
            >
              source:{' '}
              <Link
                target='_blank'
                className='!font-normal text-blue italic text-sm'
                to='https://gcaptain.com/'
              >
                gcaptain.com
              </Link>
            </Typography>
          </div>
          <div className='px-1 xl:mx-10'>
            <img src={rescue2} alt='the need second' className='w-full h-full' />
            <Typography
              className='font-libreBaskerville text-heading-color font-bold my-2'
              variant='p'
            >
              source:{' '}
              <Link
                target='_blank'
                className='!font-normal text-blue italic text-sm'
                to='https://middle-east-online.com/'
              >
                middle-east-online.com
              </Link>
            </Typography>
          </div>
        </div>
        <div className='mx-auto w-full md:w-[55%] pb-10'>
          <Typography variant='p' className='mx-2 my-4 text-text-color font-inter'>
            Every year, countless dreams are shattered, and lives are forever changed by the
            sinister web of human traffickers and deceitful travel agents promising a better life
            abroad. The heart-wrenching stories of those who fell prey to these predators serve as a
            grim reminder of the risks involved in pursuing one’s aspirations through illegal means.
            Our mission is to illuminate a path of hope amidst this darkness, offering a lifeline to
            those who yearn for a new beginning in a foreign land. We stand as a beacon of legality
            and compassion, guiding individuals towards legal immigration avenues that uphold their
            dignity and preserve their lives. Let us come together to rewrite these narratives of
            despair into tales of courage and resilience, where dreams are achieved without
            sacrificing safety and humanity.
          </Typography>
          <Typography variant='p' className='mx-2 my-4 text-text-color font-inter'>
            Introducing “Zinda Bhag,” a revolutionary platform driven by cutting-edge AI technology
            that not only stands as a symbol of hope but also serves as a strategic ally in your
            quest for a better life abroad. “Zinda Bhag,” meaning “Run for your life” in Urdu,
            encapsulates the urgency and vitality of legal migration. With the power of AI, we delve
            deep into your skills, qualifications, and background to meticulously analyze your
            potential destinations across the globe. Our AI capabilities go beyond just data
            analysis; they embrace empathy and understanding, ensuring that your aspirations find
            resonance with the opportunities available in your chosen land. Say goodbye to the
            perilous unknown and embrace the promise of a brighter future with “Zinda Bhag.”
          </Typography>
          <Typography variant='p' className='mx-2 my-4 text-text-color font-inter'>
            While dreams drive countless individuals to seek a fresh start in foreign lands, the
            dark underbelly of illegal migration paints a stark contrast. Every year, thousands pay
            the ultimate price, losing their lives or being arrested in their desperate attempts to
            escape the clutches of human traffickers and fraudulent agents. The staggering
            statistics reflect the magnitude of this crisis, underscoring the urgency of a safer,
            lawful approach. “Zinda Bhag” stands as a testament to the thousands who lost their
            lives in search of a better tomorrow, offering a lifeline that is both compassionate and
            legal. Let us unite to put an end to these tragic narratives and pave the way for
            stories of triumph and success, secured through the guidance of advanced AI technology
            and a commitment to legality and humanity.
          </Typography>
        </div>
      </div>
    </>
  );
};

export default TheStory;
