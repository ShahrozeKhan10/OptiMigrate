// @ts-nocheck
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const BenefitForImmigrant = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData['Benefits and Relaxations for Immigrants'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color flex items-center font-libreBaskerville !text-start !text-xl lg:!text-3xl'
                    variant='heading'
                  >
                    {parsedCountryData['Benefits and Relaxations for Immigrants'].heading}
                    <BiChevronDown
                      size={24}
                      className={`ml-2 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </Typography>
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {parsedCountryData['Benefits and Relaxations for Immigrants'].paragraphs ? (
                    <div>
                      {parsedCountryData['Benefits and Relaxations for Immigrants'].paragraphs.map(
                        (paragraph, index) => (
                          <Typography
                            variant='p'
                            key={index}
                            className='text-text-color font-inter pl-5'
                          >
                            <ul className='list-disc'>
                              {paragraph.startsWith('- ') ? (
                                <li className='mx-8'>{paragraph.slice(2)}</li>
                              ) : (
                                paragraph
                              )}
                            </ul>
                          </Typography>
                        ),
                      )}
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

export default BenefitForImmigrant;
