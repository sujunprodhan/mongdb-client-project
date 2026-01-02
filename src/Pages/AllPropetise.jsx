import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import Carddesign from '../Componets/Carddesign';
import HeroImg from '../assets/header_img.png'

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
    <div className="min-h-screen">
      <section className="w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImg})` }}
        ></div>

        <h1 className="relative text-3xl sm:text-3xl md:text-4xl font-bold text-pink-600 z-10">
          All Property
        </h1>
      </section>

      <div className="w-11/12 mx-auto my-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-pink-600 rounded-md font-semibold text-sm sm:text-base">
              Showing <span className="text-pink-600 font-semibold">{filteredData.length}</span>
            </button>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 text-black border border-pink-600 rounded-md focus:outline-none w-full sm:w-auto"
            >
              <option value="none">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>

            <input
              type="text"
              placeholder="Search property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 px-4 py-2 rounded-md border border-pink-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
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
