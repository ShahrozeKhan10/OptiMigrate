// @ts-nocheck
import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import Typography from '../../components/Typography';

const MuslimCommunity = ({ parsedCountryData }: any) => {
  return (
    <div className='flex justify-center'>
      {parsedCountryData['Muslim Community'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Muslim Community'].heading}
                  </Typography>
                  <BiChevronDown
                    size={24}
                    className={`ml-2 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'h-auto opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {parsedCountryData['Muslim Community'].paragraphs ? (
                    <div>
                      {parsedCountryData['Muslim Community'].paragraphs.map((paragraph, index) => (
                        <Typography variant='p' key={index} className='text-text-color font-inter'>
                          {paragraph.startsWith('- ') ? (
                            <li className='mx-4 my-2'>{paragraph.slice(2)}</li>
                          ) : (
                            paragraph
                          )}
                        </Typography>
                      ))}
                    </div>
                  ) : null}

                  <Typography
                    className='text-heading-color text-[32px] md:text-2xl mt-6 my-4'
                    variant='title'
                  >
                    {parsedCountryData['Muslim Community']['Community Centers']?.heading}
                  </Typography>
                  <Typography
                    className='text-heading-color text-[30px] md:text-2xl my-2 font-inter'
                    variant='subTitle'
                  >
                    {parsedCountryData['Muslim Community']['Community Centers']?.paragraphs}
                  </Typography>
                  {parsedCountryData['Muslim Community']['Community Centers']?.centers.map(
                    (item, idx) => {
                      return (
                        <ul className='list-disc' key={idx}>
                          <li className='mx-5 text-text-color'>{item}</li>
                        </ul>
                      );
                    },
                  )}

                  <Typography
                    className='text-heading-color text-[30px] md:text-2xl mt-6 my-4'
                    variant='title'
                  >
                    {parsedCountryData['Muslim Community']['Halal Foods']?.heading}
                  </Typography>
                  {parsedCountryData['Muslim Community']['Halal Foods']?.restaurants.map(
                    (item, idx) => {
                      return (
                        <ul className='list-disc' key={idx}>
                          <li className='mx-5 text-text-color font-inter'>{item}</li>
                        </ul>
                      );
                    },
                  )}

                  <Typography
                    className='text-heading-color text-[30px] md:text-2xl font-libreBaskerville mt-6 my-4'
                    variant='title'
                  >
                    {parsedCountryData['Muslim Community']['Pakistani and Indian Recipes']?.heading}
                  </Typography>
                  {parsedCountryData['Muslim Community'][
                    'Pakistani and Indian Recipes'
                  ]?.recipes.map((item, idx) => {
                    return (
                      <ul className='list-disc' key={idx}>
                        <li className='mx-5 text-text-color font-inter'>{item}</li>
                      </ul>
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

export default MuslimCommunity;
