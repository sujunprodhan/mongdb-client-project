import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import Carddesign from '../Componets/Carddesign';

const AllPropertise = () => {
  const realProperty = useLoaderData() || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredData = useMemo(() => {
    let data = realProperty.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') data.sort((a, b) => a.price - b.price);
    if (sortOrder === 'desc') data.sort((a, b) => b.price - a.price);

    return data;
  }, [realProperty, searchTerm, sortOrder]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-64 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#EA0D83] opacity-70" />
        <h1 className="relative text-4xl font-bold">All Property</h1>
      </section>

      <div className="w-11/12 mx-auto my-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <button className="px-3 py-2 border-1 border-pink-600  rounded-md font-semibold text-xl">
            Showing <span className="text-pink-600 font-semibold">{filteredData.length}</span>
          </button>
          <div className="flex gap-5 w-full md:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 text-black border-1 border-pink-600  rounded-md focus:outline-none"
          >
            <option className='text-pink-700' value="none">Sort by Price</option>
            <option className='text-pink-700' value="asc">Low to High</option>
            <option className='text-pink-700' value="desc">High to Low</option>
          </select>
          <input
            type="text"
            placeholder="Search property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-60 px-4 py-2 rounded-md border-1 border-pink-600 focus:outline-none"
            
          />
        </div>
        </div>

        
      </div>

      {/* Property Cards */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((property) => <Carddesign key={property._id} property={property} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">No properties found</p>
        )}
      </div>
    </div>
  );
};

export default AllPropertise;
