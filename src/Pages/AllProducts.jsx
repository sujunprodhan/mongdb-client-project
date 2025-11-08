import React from 'react';
import { useLoaderData } from 'react-router';
import Carddesign from '../Componets/Carddesign';

const AllProducts = () => {
  const houseData = useLoaderData();

  return (
    <div className="text-2xl text-center font-bold w-11/12 mx-auto">
      <h1>All Products</h1>
      <p>Explore More</p>
      <div className="grid md:grid-cols-3 space-y-5 gap-5lg:grid-cols-4 grid-cols-1">
        {
          houseData?.map( property =><Carddesign key={property._id} property={property}></Carddesign>)
        }
        </div>
    </div>
  );
};

export default AllProducts;
