// @ts-nocheck
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const JobPortal = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData['Job Portals'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Job Portals'].heading}
                  </Typography>
                  <BiChevronDown
                    size={24}
                    className={`ml-2 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <Typography className='text-heading-color font-inter mt-2' variant='subTitle'>
                    {parsedCountryData['Job Portals']?.paragraphs}
                  </Typography>
                  {parsedCountryData['Job Portals'].websites.map((website, index) => {
                    const [name, url] = website.split(' - ');
                    return (
                      <div key={index} className='flex flex-wrap mx-0 lg:mx-5 font-inter'>
                        <Typography className='text-heading-color' variant='subTitle'>
                          {name}:
                        </Typography>

                        <Link
                          to={url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='mx-2 cursor-pointer text-blue underline'
                        >
                          {url}
                        </Link>
                      </div>
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ) : null}
    </div>
  );
};

export default JobPortal;
