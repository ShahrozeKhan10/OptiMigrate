import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const Currency = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData?.Currency ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color !text-xl lg:!text-3xl font-libreBaskerville'
                    variant='title'
                  >
                    {parsedCountryData?.Currency.heading}
                  </Typography>
                  <BiChevronDown
                    size={24}
                    className={`ml-2 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <Typography className='text-text-color font-inter' variant='subTitle'>
                    {parsedCountryData?.Currency.paragraphs}
                  </Typography>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ) : null}
    </div>
  );
};

export default Currency;
