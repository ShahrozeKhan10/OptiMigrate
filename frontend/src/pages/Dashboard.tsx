import { useEffect, useState } from 'react';
import { IDashboard } from 'src/@types/Dashboard';
import { Dashboard } from 'src/api';
import { ROUTES } from 'src/constants/routes';

import { Link, useNavigate } from 'react-router-dom';
import NotFound from 'src/assets/images/not-found.png';
import Skeleton from 'src/components/Country/Skeleton';
import CurrentCountry from 'src/components/Dashboard/CurrentCountry';
import Typography from 'src/components/Typography';
import useAuth from 'src/hooks/useAuth';

const DashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<IDashboard | null>(null);

  const getDashboardData = async (token: string) => {
    try {
      setLoading(true);
      const response = await Dashboard.getData(token);
      if (response?.error) {
        throw new Error('Something went wrong!');
      }
      const { data } = response;
      setCountryData(data);
    } catch {
      console.error('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setName(name);
      getDashboardData(token);
    } else {
      // redirect(ROUTES.HOME);
      // navigate(ROUTES.HOME)
    }
  }, [navigate]);

  if (!loading && (!countryData || !countryData?.result?.skillScore)) {
    return (
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='ml-10 lg:ml-0 mb-10'>
          <Typography
            variant='title'
            className='font-libreBaskerville text-heading-color text-2xl font-bold'
          >
            Dashboard
          </Typography>
          {name ? (
            <div className='font-inter text-text-color mt-4'>
              <span>Welcome</span>
              <strong> {name}</strong>
            </div>
          ) : null}
        </div>
        <div className='container mx-auto py-10 bg-[#FFE09D] text-heading-color rounded-3xl flex-center gap-5 flex-col'>
          <img src={NotFound} alt='Not Found' width={300} draggable={false} placeholder='blur' />
          <p className='text-7xl font-bold font-libreBaskerville'>Uh Oh!</p>
          <p className='text-lg'>{"Looks like you don't have any Assessments yet!"}</p>
          <Link to={ROUTES.ASSESSMENT}>
            <button className='gradient-button3 text-white px-5 rounded-lg py-3'>
              Create Assessment
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !countryData) {
    return <Skeleton name={name} />;
  }

  return <CurrentCountry countries={countryData} />;
};
export default DashboardPage;
