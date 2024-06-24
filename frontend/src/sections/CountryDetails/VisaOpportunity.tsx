import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
// import Table from '../../components/Table';
import Typography from '../../components/Typography';

const VisaOpportunity = ({ parsedCountryData }: any) => {
  // const immigrantVisaTableColumns = [
  //   { key: 'Visa Type', label: 'Visa Type' },
  //   { key: 'Description', label: 'Description' },
  //   { key: 'Requirements', label: 'Requirements' },
  //   { key: 'Website Link', label: 'Website Link' },
  // ];

  // const immigrantVisaTableData = parsedCountryData[
  //   'Visa Opportunities'
  // ].ImmigrantVisa.visaTypes.map(
  //   (item: {
  //     'Visa Type': string;
  //     'Description': string;
  //     'Requirements': string;
  //     'Website Link': string;
  //   }) => ({
  //     'Visa Type': item['Visa Type'],
  //     'Description': item.Description,
  //     'Requirements': item.Requirements,
  //     'Website Link': item['Website Link'],
  //   }),
  // );
  // const nonImmigrantVisaTableData = parsedCountryData[
  //   'Visa Opportunities'
  // ].NonImmigrantVisa.visaTypes.map(
  //   (item: {
  //     'Visa Type': string;
  //     'Description': string;
  //     'Requirements': string;
  //     'Website Link': string;
  //   }) => ({
  //     'Visa Type': item['Visa Type'],
  //     'Description': item.Description,
  //     'Requirements': item.Requirements,
  //     'Website Link': item['Website Link'],
  //   }),
  // );

  return (
    <div className='flex justify-center'>
      {parsedCountryData['Visa Opportunities'] ? (
        <div className=' w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='w-full text-heading-color font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Visa Opportunities']?.heading}
                  </Typography>
                  <BiChevronDown
                    size={24}
                    className={`ml-2 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className=' w-full'>
                    <Typography
                      className='2 text-heading-color text-lg font-inter my-2'
                      variant='p'
                    >
                      {parsedCountryData['Visa Opportunities']?.paragraphs}
                    </Typography>

                    <Typography
                      className='mx-2 space-x-2  text-heading-color font-libreBaskerville text-[30px] md:text-2xl  my-8'
                      variant='subTitle'
                    >
                      {parsedCountryData['Visa Opportunities']?.ImmigrantVisa.heading}
                    </Typography>

                    {/* <Table
                      columns={immigrantVisaTableColumns}
                      data={immigrantVisaTableData}
                    /> */}

                    <Typography
                      className='mx-2 space-x-2 w-full lg:w-7/12 text-heading-color font-libreBaskerville text-[30px] md:text-2xl  my-8'
                      variant='subTitle'
                    >
                      {parsedCountryData['Visa Opportunities']?.NonImmigrantVisa.heading}
                    </Typography>
                    {/* <Table
                      columns={immigrantVisaTableColumns}
                      data={nonImmigrantVisaTableData}
                    /> */}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ) : null}
    </div>
  );
};

export default VisaOpportunity;
