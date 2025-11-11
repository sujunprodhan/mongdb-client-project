import { Link } from "react-router";


const Carddesign = ({ property }) => {
  const { image, title, price, author, category, location, _id } = property;

  return (
    <div>
      <div className="bg-white border-1 border-gray-300 p-3 rounded-md">
        <div className="p-3 border-gray-300">
          <img src={image} alt="" className="rounded-md bg-gray-200 " />
          <p>{location}</p>
        </div>
        <h1 className="text-center text-2xl font-bold text-black">{title}</h1>
        <div>
          <p>
            <span className="text-pink-500 font-semibold">Author:</span>
            {author}
          </p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button className="rounded-md">
            <span className="font-semibold text-pink-600">Category:</span> <span>{category}</span>{' '}
          </button>
          <p>
            <span className="text-pink-500 font-semibold">$</span>
            {price}
          </p>
        </div>
        <div className="bg-pink-600 mt-10 px-5 mt-10 text-center py-1 rounded-md text-white">
          <Link className="cursor-pointer" to={`/propertydetails/${_id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Carddesign;
