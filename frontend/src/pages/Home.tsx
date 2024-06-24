import React from 'react';
import SubscribeSection from 'src/components/SubscribeSection';
import Community from 'src/sections/Community';
import FAQs from 'src/sections/Faqs';
import Head from 'src/sections/Head';
import Resources from 'src/sections/Resource';

const Home: React.FC = () => (
  <React.Fragment>
    <Head />
    <Community />
    <Resources />
    <FAQs />
    <SubscribeSection />
  </React.Fragment>
);

export default Home;
