// @ts-nocheck
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const JobOpportunity = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData['Job Opportunities'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Job Opportunities'].heading}
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
                  {parsedCountryData['Job Opportunities'].paragraphs ? (
                    <div>
                      {parsedCountryData['Job Opportunities'].paragraphs.map((paragraph, index) => (
                        <Typography variant='p' key={index} className='text-text-color font-inter'>
                          {paragraph.startsWith('- ') ? (
                            <li className='mx-4'>{paragraph.slice(2)}</li>
                          ) : (
                            paragraph
                          )}
                        </Typography>
                      ))}
                    </div>
                  ) : null}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ) : null}
    </div>
  );
};

export default JobOpportunity;
