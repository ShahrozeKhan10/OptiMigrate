import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';

import Header from 'src/components/Header';

const Layout = () => {
  return (
    <div className={`flex flex-col justify-between min-h-screen bg-primary-bg font-inter`}>
      <div className='h-full'>
        <header className='w-full fixed top-0 z-50'>
          <Header />
        </header>

        <div className='mt-28'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
