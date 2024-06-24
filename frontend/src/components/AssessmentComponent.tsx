import { Plane } from 'src/constants/images';

import Footer from './Footer';
import Header from './Header';
import Title from './Title';

const AssessmentsComponent = () => {
  return (
    <div>
      <div className='w-full fixed top-0'>
        <Header />
      </div>
      <Title title='Assessment'>
        
      </Title>
      <div className='w-full fixed bottom-0'>
        <Footer />
      </div>
    </div>
  );
};

export default AssessmentsComponent;
