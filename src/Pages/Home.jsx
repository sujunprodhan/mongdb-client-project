import React from 'react';
import WhyChooseUs from '../Componets/WhyChooseUs';
import HowItWorks from '../Componets/HowItWorks';
import LatestProperty from './LatestProperty/LatestProperty';
import { useLoaderData } from 'react-router';

const Home = () => {
  const latestProperty = useLoaderData();


  return (
    <div className='mt-20'>
      <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl font-semibold mb-3'>Latest product</h1>
      </div>
      <div className="grid grid-cols-3 space-y-5 gap-5">
        {latestProperty?.map((latest) => (
          <LatestProperty latest={latest}></LatestProperty>
        ))}
      </div>
      <WhyChooseUs />
      <HowItWorks />
    </div>
  );
};

export default Home;
