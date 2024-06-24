import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IContinent, ICountry } from 'src/@types';

import useAuth from 'src/hooks/useAuth';
import { parseFreemiumCountries } from 'src/utils';
import Typography from './Typography';

// const FreemiumCountries = [2, 178, 71, 230];
// UAE, Saudia, UK, USA
// Latest deployment

const CountriesList = ({ countries }: { countries: ICountry[] }) => {
  const { token, userPayment } = useAuth();

  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>();

  const FreemiumCountries = parseFreemiumCountries(process.env.NEXT_PUBLIC_FREEMIUM_COUNTRIES);

  const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

  const searchTerm = localStorage.getItem('searchTerm');

  useEffect(() => {
    if (searchTerm && searchTerm.replace(/^\s+|\s+$/g, '').length) {
      const filteredCountries = countries.filter(country => {
        return country.name
          .toLowerCase()
          .includes(searchTerm?.replace(/^\s+|\s+$/g, '').toLowerCase());
      });

      setFilteredCountries(filteredCountries);
    } else if (searchTerm === '') {
      setFilteredCountries(countries);
    }
  }, [countries, searchTerm]);

  const countriesToRender = !searchTerm?.replace(/^\s+|\s+$/g, '')?.length
    ? sortedCountries
    : filteredCountries;

  const columns = 4;
  const itemsPerColumn = Math.ceil(sortedCountries.length / columns);

  const CountryList = (country: ICountry) => {
    if (country.hasDetails && userPayment?.payment_status === 'paid') {
      return (
        <Link
          className='underline text-blue'
          to={`/countries?country=${encodeURIComponent(country.id)}`}
        >
          {country.name}
        </Link>
      );
    } else if (
      country.hasDetails &&
      (!token || userPayment.payment_status === 'not paid') &&
      FreemiumCountries.includes(country.id)
    ) {
      return (
        <Link className='underline text-blue' to={`/countries/${encodeURIComponent(country.id)}`}>
          {country.name}
        </Link>
      );
    } else if ((!token || userPayment.payment_status === 'not paid') && country.hasDetails) {
      return (
        <abbr className='text-blue cursor-not-allowed' title='Upgrade your plan!!'>
          {country.name}
        </abbr>
      );
    }
    return <span>{country.name}</span>;
  };

  return (
    <div className='h-full flex flex-wrap'>
      {Array.from({ length: columns }, (_, columnIndex) => (
        <ul key={columnIndex} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
          {countriesToRender
            ?.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn)
            .map(country => (
              <li className='leading-7 relative z-40' key={country.name}>
                {CountryList(country)}
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

const ContinentsAndCountries = ({
  continentsAndCountries,
}: {
  continentsAndCountries: IContinent[];
}) => {
  const continents = continentsAndCountries?.map((continent, idx) => {
    const searchTerm = localStorage.getItem('searchTerm');

    if (searchTerm && searchTerm.replace(/^\s+|\s+$/g, '').length) {
      const filteredCountries = continent.countries.filter(country => {
        return country.name
          .toLowerCase()
          .includes(searchTerm?.replace(/^\s+|\s+$/g, '').toLowerCase());
      });

      if (!filteredCountries.length) return null;
    }
    return (
      <div key={continent.name} className='overflow-auto py-5 px-4'>
        <Typography
          variant='heading'
          className={classNames('uppercase font-libreBaskerville relative', {
            'absolute z-20': idx === 0,
          })}
        >
          {continent.name}
        </Typography>
        <Typography
          className={classNames('py-3 font-inter', {
            'absolute z-20': idx === 0,
          })}
        >
          {`${continent.name} is a continent which consists of ${continent.countries?.length} sovereign countries:`}
        </Typography>
        <div className={classNames({ 'mt-16': idx === 0 })}>
          <CountriesList countries={continent.countries} />
        </div>
      </div>
    );
  });

  return <div className='container mx-auto'>{continents}</div>;
};

export default ContinentsAndCountries;
