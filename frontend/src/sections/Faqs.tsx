import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { Disclosure } from '@headlessui/react';

import Typography from 'src/components/Typography';
import faqs from 'src/constants/faqData';

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='bg-secondary-bg-black pt-16'>
      <div className='container mx-auto px-4 md:px-32 py-10'>
        <Typography
          variant='heading'
          className='text-center text-white text-4xl font-medium pb-10 font-libreBaskerville'
        >
          Frequently Asked Questions
        </Typography>
        <div className='grid gap-4'>
          {faqs.FAQS_QUESTIONS.map((question, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='flex justify-between items-center p-4 bg-gray-900 rounded-lg text-lg text-white font-medium focus:outline-none'
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{question.question}</span>
                    {openIndex === index ? <BiChevronUp /> : <BiChevronDown />}
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pb-4 text-white text-lg'>
                    {question.answer({ open: openIndex === index })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
