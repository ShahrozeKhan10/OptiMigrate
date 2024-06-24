import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
// import Table from '../../components/Table';
import Typography from '../../components/Typography';

const OpportunityForImmigrant = ({ parsedCountryData }: any) => {
  // const immigrantOpportunityCol = [
  //   { key: 'Profession', label: 'Profession' },
  //   { key: 'Description', label: 'Description' },
  //   { key: 'Detail', label: 'Detail' },
  // ];

  // const immigrantOpportunityTableData = parsedCountryData[
  //   'Opportunities for Immigrants'
  // ].table.map(
  //   (item: { Profession: string; Description: string; Detail: string }) => ({
  //     Profession: item.Profession,
  //     Description: item.Description,
  //     Detail: item.Detail,
  //   }),
  // );

  return (
    <div className='flex justify-center'>
      {parsedCountryData['Opportunities for Immigrants'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color flex items-center font-libreBaskerville !text-xl lg:!text-3xl'
                    variant='title'
                  >
                    {parsedCountryData['Opportunities for Immigrants'].heading}
                    <BiChevronDown
                      size={24}
                      className={`transform md:mx-2 ${open ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </Typography>
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`overflow-hidden h-[100vh] transition-all duration-300 ${
                    open ? 'h-auto opacity-100' : 'max-h-auto opacity-0'
                  }`}
                >
                  <Typography className='text-text-color font-inter' variant='subTitle'>
                    {parsedCountryData['Opportunities for Immigrants']?.paragraphs}
                  </Typography>
                  <div className='my-4 '>
                    {/* <Table
                      columns={immigrantOpportunityCol}
                      data={immigrantOpportunityTableData}
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

export default OpportunityForImmigrant;
