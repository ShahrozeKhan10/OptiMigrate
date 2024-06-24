import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Country } from 'src/api';
import Typography from 'src/components/Typography';
import CountryContent from 'src/sections/CountryDetails/CountryContent';

const CountryDetails = () => {
  const { countryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Country.getCountryById(countryId);
        setCountryData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    if (countryId) {
      fetchData();
    }
  }, [countryId]);

  const parsedCountryData = useMemo(() => {
    if (countryData?.details) {
      return JSON.parse(countryData.details);
    }
  }, [countryData?.details]);

  if (loading || !countryData) {
    return (
      <>
        <div className='flex justify-center mt-28'>
          {/* <Skeleton animation='pulse' height={80} width={56} /> */}
          {/* <div className='mx-2'></div>
          <Skeleton animation='pulse' height={80} width={240} />
        </div>
        <div className='flex justify-center'>
          <Skeleton animation='pulse' height={500} width={1000} /> */}
        </div>
      </>
    );
  }

  if (!countryData?.details) {
    return (
      <div className='container mx-auto flex flex-col gap-10'>
        <Typography
          className='text-center mx-5 font-libreBaskerville text-5xl text-heading-color font-bold'
          variant='title'
        >
          {countryData?.name}
        </Typography>
        <p className='text-center'>No data found for this Country</p>
      </div>
    );
  }

  return (
    <div>
      <div className='py-8 mb-10 flex justify-center items-center'>
        <>
          {countryData?.flag ? (
            <div
              style={{ width: 120, borderRadius: 6, overflow: 'hidden' }}
              dangerouslySetInnerHTML={{ __html: countryData?.flag }}
            />
          ) : null}
          {parsedCountryData?.[0]?.isHeading ? (
            <Typography
              className='text-center mx-5 font-libreBaskerville text-5xl text-heading-color font-bold'
              variant='title'
            >
              {parsedCountryData?.[0].text}
            </Typography>
          ) : (
            <Typography
              className='text-center text-[30px] mx-5 font-libreBaskerville lg:text-5xl text-heading-color font-bold'
              variant='p'
            >
              {parsedCountryData?.[0].text}
            </Typography>
          )}
        </>
      </div>

      <div className='w-full bg-secondary-bg mt-7'>
        <div className='flex-col mx-2'>
          <CountryContent countryData={countryData} parsedCountryData={parsedCountryData} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
