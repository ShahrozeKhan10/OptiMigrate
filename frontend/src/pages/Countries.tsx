import * as React from 'react';

import { IContinent } from 'src/@types';
import { Country } from 'src/api';
import OnlyWorld from 'src/assets/svgs/OnlyWorld';
import ContinentsAndCountries from 'src/components/ContinentName';
import Title from 'src/components/Title';
import { PlaneGroupIcon } from 'src/constants/images';

const Countries: React.FC = () => {
  const [countries, setCountries] = React.useState<IContinent[]>([]);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const searchTerm = localStorage.getItem('searchTerm');

  const handleFocus = () => {
    if (elementRef?.current) {
      const smallScreen = 1023;
      if (window.innerWidth > smallScreen) {
        elementRef?.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    if (searchTerm && searchTerm.replace(/^\s+|\s+$/g, '').length) {
      handleFocus();
    }
  }, [searchTerm]);

  const getCountries = async () => {
    try {
      const response = await Country.listAll('groupBy=continents');
      setCountries(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className='my-32'>
      <main>
        <section className='container mx-auto'>
          <div className='py-1'>
            <Title title='Countries' className='relative z-20'>
              <OnlyWorld className='z-10 -mt-36' />
              <PlaneGroupIcon className='flex justify-center lg:mr-28 items-center absolute z-20 w-[305px] md:w-[341px]' />
            </Title>
          </div>
        </section>

        <section className='bg-secondary-bg -mt-52 z-50' ref={elementRef}>
          <ContinentsAndCountries continentsAndCountries={countries} />
        </section>
      </main>
    </div>
  );
};

export default Countries;
