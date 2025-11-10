
import { useParams } from 'react-router';

const ProductDetails = () => {
  
   
  // const {image, title, author, price, category, location  } = id


  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
          {/* <img src={image} className="w-full h-full object-cover" /> */}
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* <h1 className="text-3xl font-bold text-gray-800 mb-3">{title}</h1> */}
            {/* <p className="text-pink-600 font-bold text-2xl mb-3">Price: {price}</p> */}
            <p className="text-gray-600 mb-2">Agent: {author}</p>
            {/* <p className="text-gray-600 mb-2">Location: {location}</p> */}
            <p className="text-gray-600 mb-4">Category: {category}</p>

            <div>
              <h2 className="text-xl font-semibold mb-2">Property Details</h2>
             
            </div>
          </div>

          <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors mt-5 md:mt-0">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
