import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';

import { Plane } from 'src/constants/images';

const About = () => {
  return (
    <div className='md:w-96 mx-auto my-[150px]'>
      <Title title='Sign In'>
        <Plane />
      </Title>
      <div className='mt-10 px-2'>
        <TitleDescription title='About' description='About ZindaBhag' />
      </div>
    </div>
  );
};

export default About;
