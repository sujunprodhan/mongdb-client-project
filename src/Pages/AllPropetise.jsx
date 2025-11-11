import React from 'react';
import { useLoaderData } from 'react-router';
import Carddesign from '../Componets/Carddesign';



const AllPropertise = () => {
 const realProperty = useLoaderData()
 

  return (
    <div>
      <div className=" w-11/12 mx-auto mt-10 space-y-5">
        <h1 className="text-2xl font-semibold text-center text-black">All Products</h1>
        <p className='text-center text-xl'>Explore More</p>
        <div className="grid grid-cols-3 space-y-5 gap-5">
          {realProperty?.map((property) => (
            <Carddesign key={property._id} property={property}></Carddesign>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPropertise;
