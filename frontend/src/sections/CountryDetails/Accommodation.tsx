import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const Accommodation = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-7/12 my-4'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='cursor-pointer flex items-center'>
                <Typography
                  className='mx-2 space-x-2 !text-xl lg:!text-3xl text-heading-color font-libreBaskerville'
                  variant='title'
                >
                  Accomodation
                </Typography>
                <BiChevronDown
                  size={24}
                  className={`mr-0 md:mr-20 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                className={`overflow-hidden transition-all duration-300 ${
                  open ? 'h-auto opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <Typography
                  className='mx-2 space-x-2 w-full lg:w-7/12 text-heading-color font-inter'
                  variant='subTitle'
                >
                  Accommodation in Romania ranges from inexpensive hostels to luxurious hotels.
                  There are also several guesthouses and flats available, which can be a suitable
                  option for longer visits.
                </Typography>
                <Typography
                  className='mx-2 space-x-2 w-full lg:w-7/12 text-heading-color text-[30px] md:text-2xl '
                  variant='subTitle'
                >
                  Buying Apartment
                </Typography>
                <Typography className='w-full lg:w-7/12 text-heading-color' variant='subTitle'>
                  Purchasing an apartment in Romania might be an excellent investment, as the
                  Apartment prices in Romania vary according on location, size, and amenities.
                  Apartments in major cities such as Bucharest and Cluj-Napoca cost more than those
                  in smaller towns and villages.
                </Typography>
                <Typography
                  className='mx-2 space-x-2 w-full lg:w-7/12 text-heading-color'
                  variant='subTitle'
                >
                  Here is a broad overview of Romanian apartment prices
                </Typography>
                <ul className='mx-2 space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>Bucharest: €1,500-2,000 per square meter</li>
                  <li>Cluj-Napoca: €1,200-1,600 per square meter</li>
                  <li>Brasov: €1,000-1,400 per square meter</li>
                  <li>Constanta: €900-1,200 per square meter</li>
                  <li>Timisoara: €800-1,100 per square meter</li>
                </ul>
                <Typography
                  className='mx-2 space-x-2 w-full lg:w-7/12 text-heading-color text-[30px] md:text-2xl  my-2'
                  variant='subTitle'
                >
                  Buying a House
                </Typography>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Romanian house prices vary according on location, size, and amenities. properties
                  in major cities such as Bucharest and Cluj-Napoca cost more than properties in
                  smaller towns and villages.
                </Typography>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Here is a general overview of house prices in Romania:
                </Typography>
                <ul className='mx-2 space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>Bucharest: €2,000-3,000 per square meter</li>
                  <li>Cluj-Napoca: €1,600-2,200 per square meter</li>
                  <li>Brasov: €1,400-2,000 per square meter</li>
                  <li>Constanta: €1,200-1,800 per square meter</li>
                  <li>Timisoara: €1,000-1,600 per square meter</li>
                </ul>
                <Typography
                  className='w-full lg:w-7/12 text-heading-color text-[30px] md:text-2xl  my-2'
                  variant='subTitle'
                >
                  Renting Apartments in Romania:
                </Typography>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Here are the rental prices for apartments and houses in Romania, ranging from low
                  to high by location:
                </Typography>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Bucharest City Center
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>Studio: €300-500/month </li>
                  <li>1-bedroom: €400-700/month</li>
                  <li>2-bedroom: €600-1000/month</li>
                </ul>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Bucharest suburbs:
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>Studio: €200-350/month </li>
                  <li>1-bedroom: €300-500/month</li>
                  <li>2-bedroom: €400-700/month</li>
                </ul>
                <Typography className='w-full lg:w-7/12 text-heading-color my-2' variant='subTitle'>
                  Other major cities (Cluj-Napoca, Timisoara, Iasi):
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>Studio: €150-250/month </li>
                  <li>1-bedroom: €200-350/month</li>
                  <li>2-bedroom: €300-500/month</li>
                </ul>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color text-[30px] md:text-2xl  my-2'
                  variant='subTitle'
                >
                  Renting Houses in Romania:
                </Typography>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color my-2'
                  variant='subTitle'
                >
                  Bucharest suburbs:
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>2-3 bedrooms: €400-600/month </li>
                  <li>4-5 bedrooms: €600-1000/month</li>
                </ul>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color my-2'
                  variant='subTitle'
                >
                  Small towns:
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>2 bedrooms: €200-350/month </li>
                  <li>3 bedrooms: €250-450/month</li>
                </ul>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color my-2'
                  variant='subTitle'
                >
                  Holiday towns (Mamaia, Sinaia):
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>2 bedrooms: €400-600/month </li>
                  <li>3-4 bedrooms: €600-1200/month</li>
                </ul>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color my-2'
                  variant='subTitle'
                >
                  Countryside/villages:
                </Typography>
                <ul className='space-x-2 w-full lg:w-6/12 list-disc'>
                  <li className='mx-2'>2 bedrooms: €150-300/month </li>
                  <li>3+ bedrooms: €250-500/month</li>
                </ul>
                <Typography
                  className='space-x-2 w-full lg:w-7/12 text-heading-color text-[30px] md:text-2xl my-2'
                  variant='subTitle'
                >
                  Accommodation Guide
                </Typography>
                <Typography
                  className='sm:w-full lg:w-7/12 text-heading-color my-2'
                  variant='subTitle'
                >
                  Here are some of the top Romanian accommodation booking websites are:
                </Typography>
                <div className='w-full lg:w-[700px] flex flex-col flex-wrap my-4'>
                  <div className='flex space-x-2 items-center'>
                    <Typography variant='subTitle'>• Travelminit: </Typography>
                    <Link to='https://travel-tourist.com/' className='text-blue underline'>
                      https://travel-tourist.com/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <Typography variant='subTitle'>• Tourist: </Typography>
                    <Link className='text-blue underline' to='https://www.bestjobs.eu/ro/'>
                      https://www.bestjobs.eu/ro/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center '>
                    <Typography variant='subTitle'>• Imobiliare: </Typography>
                    <Link className='text-blue underline' to='https://www.imobiliare.ro'>
                      https://www.imobiliare.ro
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center '>
                    <Typography variant='subTitle'>• Storia.ro: </Typography>
                    <Link className='text-blue underline' to='https://www.storia.ro/'>
                      https://www.storia.ro/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center'>
                    <Typography variant='subTitle'>• Publi24: </Typography>
                    <Link className='text-blue underline' to='https://www.publi24.ro/'>
                      https://www.publi24.ro/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center flex-wrap'>
                    <Typography variant='subTitle'>• Bucharest Apartment: </Typography>
                    <Link className='text-blue underline' to='https://bucharestapartment.net/'>
                      https://bucharestapartment.net/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center flex-wrap'>
                    <Typography variant='subTitle'>• HomeZZ: </Typography>
                    <Link className='text-blue underline' to='https://homezz.ro/'>
                      https://homezz.ro/
                    </Link>
                  </div>

                  <div className='flex space-x-2 items-center flex-wrap'>
                    <Typography variant='subTitle'>• HousingTarget: </Typography>
                    <Link
                      className='text-blue underline'
                      to='https://www.housingtarget.com/romania'
                    >
                      https://www.housingtarget.com/romania
                    </Link>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accommodation;
