import React from 'react';
import { NavLink } from 'react-router';

const Carddesign = ({ property }) => {
  const { title, image, price, author,_id } = property;

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Property Image */}
      <div className="h-60 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Property Details */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-pink-600 font-bold text-lg mb-2">Price: {price}</p>
        <p className="text-gray-600 mb-4">Agent: {author}</p>
        <NavLink
          to={`/productdetails/${_id}`}
          className="w-full bg-pink-600 cursor-pointer text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default Carddesign;
