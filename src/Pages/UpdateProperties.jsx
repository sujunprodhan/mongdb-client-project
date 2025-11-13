import { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../AuthProvider/Authprovider";

const UpdateProperties = () => {
  const propertyData = useLoaderData() || {};  
  const {user} = use(AuthContext)
  const { image, title, price, description, location, category, _id} =
propertyData;
const hadleSubmit = (e) => {
  e.preventDefault();
  const fromData = {
    title: e.target.title.value,
    description: e.target.description.value,
    price: e.target.price.value,
    location: e.target.location.value,
    image: e.target.image.value,
    category: e.target.category.value,
  };

  fetch(`http://localhost:3000/realagent/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fromData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">Update Property</h2>
      <form onSubmit={hadleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            defaultValue={title}
            name="title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            defaultValue={description}
            name="description"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={category || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Mansion">Mansion</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Cabin">Cabin</option>
            <option value="Studio">Studio</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          <input
            type="number"
            defaultValue={price}
            name="price"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image Link</label>
          <input
            type="text"
            defaultValue={image}
            name="image"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>

        {/* User Name (Read-only) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">User Name</label>
          <input
            type="text"
            defaultValue={user.displayName}
            name="name"
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">User Email</label>
          <input
            type="email"
            value={user.email}
            name="email"
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Update Button */}
        <button
          
          className="w-full cursor-pointer py-3 mt-4 text-white bg-[#F0256E] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperties;
