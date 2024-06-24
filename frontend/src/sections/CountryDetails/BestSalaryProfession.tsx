import { Disclosure } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
// import Table from '../../components/Table';
import Typography from '../../components/Typography';

const BestSalaryProfession = ({ parsedCountryData }: any) => {
  // const salaryProfessionTableCol = [
  //   { key: 'Profession', label: 'Profession' },
  //   {
  //     key: 'Average Monthly Salary (RON)',
  //     label: 'Average Monthly Salary (RON)',
  //   },
  // ];

  // const salaryProfessionTableData = parsedCountryData[
  //   'Best Paying Salary Professions'
  // ].table.map(
  //   (item: {
  //     'Profession': string;
  //     'Average Monthly Salary (RON)': number;
  //   }) => ({
  //     'Profession': item.Profession,
  //     'Average Monthly Salary (RON)': item['Average Monthly Salary (RON)'],
  //   }),
  // );

  return (
    <div className='flex justify-center'>
      {parsedCountryData['Best Paying Salary Professions'] ? (
        <div className='w-full lg:w-7/12 my-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='cursor-pointer flex items-center'>
                  <Typography
                    className='text-heading-color !text-xl lg:!text-3xl font-libreBaskerville'
                    variant='title'
                  >
                    {parsedCountryData['Best Paying Salary Professions'].heading}
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
                  <Typography
                    className='sm:w-full lg:w-7/12 text-heading-color font-inter'
                    variant='p'
                  >
                    {parsedCountryData['Best Paying Salary Professions']?.paragraphs}
                  </Typography>
                  {/* <div className='my-8'>
                    <Table
                      columns={salaryProfessionTableCol}
                      data={salaryProfessionTableData}
                    />
                  </div> */}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ) : null}
    </div>
  );
};

export default BestSalaryProfession;
