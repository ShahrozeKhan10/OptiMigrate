import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ICountry } from 'src/@types';
import { IDashboard } from 'src/@types/Dashboard';
import VideoNotFound from 'src/assets/images/video-not-found.png';
import { Chart } from 'src/components/Chart';
import Typography from 'src/components/Typography';
import { ROUTES } from 'src/constants/routes';
import useAuth from 'src/hooks/useAuth';
import { formatCommas, formatValue } from 'src/utils';
import { getEmbedCode } from 'src/utils/common';

const CurrentCountry: React.FC<{ countries: IDashboard }> = ({ countries }) => {
  const { name } = useAuth();

  const [activeCountry, setActiveCountry] = useState<ICountry | null>(null);

  const [scores, labels, totalScores] = useMemo(() => {
    const totalScores = countries?.result?.skillScore?.scores?.filter(
      score => score?.type === 'total',
    );

    const scores: (string | number)[] = totalScores?.map(score => formatValue(score.score));

    const labels = totalScores?.map(score => {
      const matchingCountry = countries?.assessment_country?.find(
        country => country?.id === score?.country_id,
      );
      return matchingCountry ? matchingCountry?.name ?? '' : '';
    });

    return [scores, labels, totalScores];
  }, [countries]);

  useEffect(() => {
    if (totalScores) {
      // Find the country with the highest score
      let highestScore = -Infinity;
      let highestScoreCountry = null;

      totalScores.forEach(score => {
        const scoreValue = parseFloat(score?.score?.toString());
        if (scoreValue > highestScore) {
          highestScore = scoreValue;
          highestScoreCountry = countries?.assessment_country?.find(
            country => country?.id === score?.country_id,
          );
        }
      });
      setActiveCountry(highestScoreCountry);
    }
  }, [totalScores]);

  const updateActiveCountry = (_e: any, _chart?: any, config?: any) => {
    const idx = config?.dataPointIndex;
    const country = countries?.assessment_country?.find(country => country?.name === labels?.[idx]);
    if (country) {
      setActiveCountry(country);
    }
  };

  return (
    <div className='container mx-auto md:px-10'>
      <div className='flex flex-col md:flex-row justify-between gap-10 text-center md:text-left items-end'>
        <div className='w-full'>
          <Typography
            variant='title'
            className='font-libreBaskerville text-heading-color text-2xl font-bold'
          >
            Dashboard
          </Typography>
          <div className='font-inter text-text-color mt-4'>
            <span>Welcome</span>
            <strong> {name}</strong>
            <span>{", here's your latest Assessment"}</span>
          </div>
        </div>
        <div className='flex justify-center md:justify-end w-full'>
          <Link to={ROUTES.ASSESSMENT}>
            <button className='gradient-button3 text-white p-2 md:px-5 rounded-lg md:py-3'>
              Create Assessment
            </button>
          </Link>
        </div>
      </div>
      <div className='w-full bg-[#FFE09D] items-center sm:rounded-3xl gap-5 grid grid-cols-1 lg:grid-cols-7 my-3 p-5 md:p-10'>
        <div id='chart' className='w-full flex justify-center lg:col-span-2'>
          <Chart
            onClick={updateActiveCountry}
            labels={labels ?? []}
            scores={scores ?? []}
            strokeWidth={countries?.assessment_country?.length > 1 ? 5 : 0}
          />
        </div>
        <div className='flex items-center h-full gap-5 lg:items-start flex-col lg:col-span-3'>
          <div className='flex items-center justify-center lg:justify-start gap-2 w-full'>
            <Typography
              variant='title'
              className='font-libreBaskerville text-heading-color text-2xl font-bold leading-none'
            >
              {activeCountry?.name}
            </Typography>
            {activeCountry?.flag ? (
              <div
                style={{
                  width: '100px',
                  borderRadius: 6,
                  overflow: 'hidden',
                  maxWidth: '6rem',
                }}
                dangerouslySetInnerHTML={{ __html: activeCountry?.flag }}
              />
            ) : null}
          </div>
          <Typography
            variant='p'
            className='font-inter text-text-color text-base text-center lg:text-left'
          >
            {activeCountry?.short_description}
          </Typography>
        </div>

        <div className='bg-[#FFEABB] p-3 py-10 h-fit rounded-3xl lg:col-span-2 shadow-xl flex items-center gap-7 justify-center lg:justify-start text-xs'>
          <div className='h-full flex gap-5 border-r-[1px] border-black px-5'>
            <div className='flex flex-col gap-3 justify-between h-full font-semibold'>
              <p>Population</p>
              <p>Language</p>
              <p>Currency</p>
              <p>GDP</p>
            </div>
          </div>
          <div className='flex flex-col gap-3 justify-between h-full font-semibold'>
            <p>
              {activeCountry?.stats?.find(item => item?.[0]?.toLowerCase() === 'population')?.[1] ||
                formatValue(activeCountry?.total_population)}
            </p>
            <p>
              {activeCountry?.stats?.find(
                item => item?.[0]?.toLowerCase() === 'official language',
              )?.[1] || 'N/A'}
            </p>
            <p>
              {activeCountry?.stats?.find(item => item?.[0]?.toLowerCase() === 'currency')?.[1] ||
                'N/A'}
            </p>
            <p>{activeCountry?.gdp ? `$ ${formatValue(activeCountry?.gdp)}` : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className='w-full bg-[#FFE09D] items-start rounded-3xl my-10 p-10'>
        <Typography
          variant='title'
          className='font-libreBaskerville text-heading-color text-2xl font-bold'
        >
          Overview
        </Typography>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10'>
          <div>
            <div className='grid sm:grid-cols-2 gap-3 text-heading-color'>
              <div className='bg-[#F6C457] h-[200px] rounded-lg flex items-center justify-center'>
                <div className='flex flex-col gap-3 text-center'>
                  <p>{activeCountry?.personalWorth ? 'Personal Worth' : 'GDP'}</p>
                  <p className='text-4xl font-bold' style={{ wordBreak: 'break-all' }}>
                    {activeCountry?.personalWorth || activeCountry?.gdp
                      ? `$ ${formatCommas(activeCountry?.personalWorth || activeCountry?.gdp)}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='bg-[#F6C457] h-[200px] rounded-lg flex items-center justify-center'>
                <div className='flex flex-col gap-3 text-center'>
                  <p>VISA Chances</p>
                  <p className='text-4xl font-bold'>
                    {countries?.result?.skillScore?.scores?.find(
                      score => score?.country_id === activeCountry?.id && score?.type === 'total',
                    )?.score
                      ? `${formatValue(
                          countries?.result?.skillScore?.scores?.find(
                            score =>
                              score?.country_id === activeCountry?.id && score?.type === 'total',
                          )?.score ?? 0,
                        )}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className='bg-[#F6C457] sm:col-span-2 h-[200px] rounded-lg flex items-center justify-center'>
                <div className='flex flex-col gap-3 text-center'>
                  <p>Muslims / Pakistani</p>
                  <p className='text-4xl font-bold'>
                    {formatCommas(activeCountry?.muslim_population)} /{' '}
                    {formatCommas(activeCountry?.pakistanis)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {activeCountry?.video_links ? (
              <iframe
                className='rounded-lg max-h-[300px] h-full w-full'
                src={getEmbedCode(activeCountry?.video_links)}
                allowFullScreen
              />
            ) : (
              <img
                src={VideoNotFound}
                width={300}
                // objectFit='contain'
                alt='Video not found'
                className='mx-auto'
                draggable={false}
              />
            )}
            {activeCountry?.id ? (
              <div className='mt-3 flex-center'>
                <Link
                  to={`${ROUTES.COUNTRIES}?country=${activeCountry?.id}`}
                  className='my-10'
                  target='_blank'
                >
                  <button className='gradient-button3 text-white p-2 md:px-5 rounded-lg md:py-3'>
                    View Country Details
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentCountry;
