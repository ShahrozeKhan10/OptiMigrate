// @ts-nocheck
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const CostOfLiving = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData['Cost of Living'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Cost of Living'].heading}
                  </Typography>
                  <BiChevronDown
                    size={24}
                    className={`ml-2 mt-3 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'h-auto opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {parsedCountryData['Cost of Living'].paragraphs ? (
                    <div>
                      {parsedCountryData['Cost of Living'].paragraphs.map((paragraph, index) => (
                        <Typography variant='p' key={index} className='text-text-color'>
                          {paragraph.startsWith('- ') ? (
                            <li className='mx-4 font-bold text-xl my-2'>{paragraph.slice(2)}</li>
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

export default CostOfLiving;
