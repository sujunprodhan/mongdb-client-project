

const Carddesign = ({ property }) => {
  const { image, title, price, author, category, location } = property;

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
          <button className="bg-pink-700 px-2 py-1 rounded-md text-white">
            Category: <span>{category}</span>{' '}
          </button>
          <p>
            <span className="text-pink-500 font-semibold">$</span>
            {price}
          </p>
        </div>
        <button className="bg-pink-600  w-full mt-10 text-center py-1 rounded-md text-white">
          View Details
        </button>
        
      </div>
    </div>
  );
};

export default Carddesign;
