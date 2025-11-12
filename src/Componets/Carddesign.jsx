import { Link } from 'react-router';
import { HiOutlineLocationMarker } from 'react-icons/hi'; 

const Carddesign = ({ property }) => {
  const { image, title, price, author, category, location, _id, description } = property;


  const shortDesc = description
    ? description.split(' ').slice(0, 20).join(' ') + '...'
    : 'Beautiful property with all essential features and modern design, perfect for comfortable living.';

  return (
    <div>
      <div className="bg-white border border-pink-300 hover:shadow-lg p-3 rounded-md transition-all duration-300">
        <div className="relative overflow-hidden rounded-md">
      
          <img
            src={image}
            alt={title}
            className="rounded-md bg-gray-200 w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
          />

   
          <div className="absolute bottom-2 left-2 flex items-center bg-white bg-opacity-80 px-2 py-1 rounded-md text-gray-800 text-sm">
            <HiOutlineLocationMarker className="text-pink-600 mr-1" />
            <span>{location}</span>
          </div>
        </div>


        <h1 className="text-center text-2xl font-bold text-black mt-3">{title}</h1>

        <p className="text-gray-600">
          <span className="text-pink-500 font-semibold">Author:</span> {author}
        </p>
        <p className="text-gray-500 text-sm mt-2">{shortDesc}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="rounded-md text-sm">
            <span className="font-semibold text-pink-600">Category:</span> {category}
          </button>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-pink-500">$</span> {price}
          </p>
        </div>
        <div className="bg-pink-600 mt-6 px-5 py-2 text-center rounded-md text-white hover:bg-pink-700 transition">
          <Link className="cursor-pointer" to={`/propertydetails/${_id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carddesign;
