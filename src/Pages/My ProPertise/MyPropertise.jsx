import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router';
import HeroImg from '../../assets/header_img.png';
import PropertyCard from './PropertyCard';

const MyPropertise = () => {
  const { user, loading } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://mongodb-server-site.vercel.app/realagent?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  return (
    <div>
      <section className="w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImg})` }}
        ></div>

        <h1 className="relative text-3xl sm:text-3xl md:text-4xl font-bold text-pink-600 z-10">
          My Property
        </h1>
      </section>
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {properties.map((property) => <PropertyCard key={property._id} property={property}></PropertyCard>
          // const {
          //   image,
          //   title,
          //   price,
          //   name: author,
          //   category,
          //   location,
          //   _id,
          //   description,
          // } = property;

          // Shorten description to 10 words
          // const shortDesc = description
          //   ? description.split(' ').slice(0, 20).join(' ') + '...'
          //   : 'Beautiful new property with modern design, perfect for comfortable living.';

          // return (
          //   <div
          //     key={_id}
          //     className="bg-white border border-pink-300 hover:shadow-lg p-3 rounded-md transition-all duration-300"
          //   >
          //     {/* Image section */}
          //     <div className="relative overflow-hidden rounded-md">
          //       <img
          //         src={image}
          //         alt={title}
          //         className="rounded-md bg-gray-200 w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
          //       />
          //       {/* Location overlay */}
          //       <div className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-md text-gray-800 text-sm">
          //         <HiOutlineLocationMarker className="text-pink-600 mr-1" />
          //         <span>{location}</span>
          //       </div>
          //     </div>

          //     {/* Title */}
          //     <h1 className="text-center text-2xl font-bold text-black mt-3">{title}</h1>

          //     {/* Author */}
          //     <p className="text-gray-600">
          //       <span className="text-pink-500 font-semibold">Author:</span> {author}
          //     </p>

          //     {/* Short description */}
          //     <p className="text-gray-500 text-sm mt-2">{shortDesc}</p>

          //     {/* Category and Price */}
          //     <div className="flex justify-between items-center mt-4">
          //       <button className="rounded-md text-sm">
          //         <span className="font-semibold text-pink-600">Category:</span> {category}
          //       </button>
          //       <p className="text-lg font-semibold text-gray-800">
          //         <span className="text-pink-500">$</span> {price}
          //       </p>
          //     </div>

          //     {/* View Details Button */}
          //     <div className="bg-pink-600 mt-6 px-5 py-2 text-center rounded-md text-white hover:bg-pink-700 transition">
          //       <Link className="cursor-pointer" to={`/propertydetails/${_id}`}>
          //         View Details
          //       </Link>
          //     </div>
          //   </div>
          // );
        )}
      </div>
    </div>
  );
};

export default MyPropertise;
