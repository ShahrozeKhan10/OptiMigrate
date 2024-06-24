import classNames from 'classnames';
import Table from '../../components/Table';
import { getEmbedCode } from 'src/utils/common';
import DynamicParagraph from 'src/sections/CountryDetails/DynamicParagraph';
import { Link } from 'react-router-dom';

const CountryContent: React.FC<{
  countryData: any;
  parsedCountryData: any;
}> = ({ countryData, parsedCountryData }) => {
  return (
    <>
      {countryData?.video_links ? (
        <div className='flex justify-center items-center'>
          <iframe
            title='Country Video'
            className='rounded lg:w-[1000px] min-h-[400px] lg:h-[500px] w-full h-full -mt-12'
            allowFullScreen
            src={getEmbedCode(countryData?.video_links)}
          />
        </div>
      ) : null}

      <div className='w-full lg:w-[60%] mx-auto py-8 font-inter'>
        {parsedCountryData?.slice(1, parsedCountryData?.length)?.map((item: any, idx: number) => (
          <ElementRender key={idx} item={item} countryData={countryData} />
        ))}
      </div>
    </>
  );
};

const ElementRender = ({ item, countryData }: { item: any; countryData: any }) => {
  switch (item?.type) {
    case 'intro':
      return (
        <div className='h-full my-4 flex flex-col md:flex-row gap-5'>
          <div className='md:w-3/5 w-full'>
            {item?.data?.map((val: any) => {
              if (val?.type === 'p') {
                return (
                  <>
                    <DynamicParagraph item={val} />
                  </>
                );
              }
              return null;
            })}
          </div>
          <div className='md:w-2/5 w-full'>
            {countryData?.map ? (
              <div className='flex justify-center'>
                <img
                  src={countryData?.map}
                  alt='Country Map'
                  width={500}
                  height={500}
                  className='overflow-hidden'
                  draggable={false}
                />
              </div>
            ) : null}
            {item?.data?.map((val: any) => {
              if (val?.type === 'table') {
                return (
                  <>
                    <Table
                      data={val?.data}
                      className={classNames({
                        'mt-0 rounded-t-none border-t-0': countryData?.map,
                      })}
                    />
                  </>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    case 'ul-a': {
      return (
        <ul className='list-disc'>
          <li>
            <Link to={item?.data?.[1]} target='_blank' className='text-blue hover:underline'>
              {item?.data?.[0]?.trim()}
            </Link>
          </li>
        </ul>
      );
    }
    case 'table':
      return (
        <div className='h-full my-4'>
          <Table header={item?.data[0]} data={item?.data?.slice(1, item?.data?.length)} />
        </div>
      );
    case 'ul':
      return (
        <ul className='list-disc'>
          {item.data?.map((data: any, idx: number) => (
            <li
              key={`${data.trim()}_${idx}`}
              className={classNames('my-4', {
                '!text-xl lg:!text-3xl font-libreBaskerville': item.isHeading,
              })}
            >
              {data?.trim()}
            </li>
          ))}
        </ul>
      );
    case 'video':
      return (
        <div className='flex justify-center items-center my-4'>
          <iframe
            className='rounded lg:w-[1000px] lg:h-[500px] w-full h-full mt-12'
            allowFullScreen
            src={item.Introduction.videos?.[0]}
          />
        </div>
      );
    case 'image':
      return <></>;
    case 'map':
      return (
        <div className='my-8'>
          <iframe
            title='Google Map'
            height='450'
            width='100%'
            loading='lazy'
            src={item.Introduction.maps?.[0]}
            allowFullScreen
          />
        </div>
      );
    case 'p':
      return <DynamicParagraph item={item} />;
    default:
      return <p>{item?.data}</p>;
  }
};

export default CountryContent;
