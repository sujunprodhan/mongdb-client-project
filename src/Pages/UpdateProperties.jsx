import { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../AuthProvider/Authprovider";

const UpdateProperties = ({ property }) => {
  const propertyData = useLoaderData() || {};
 const {user} = use(AuthContext)
  const { image, title, price, description, location, category, author, postedAt, _id } =
    propertyData;
    const categories = [category];

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">Update Property</h2>
      <form className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            defaultValue={title}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            defaultValue={description}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            defaultValue={category}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          >
            {categories?.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          <input
            type="number"
            defaultValue={price}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Location</label>
          <input
            type="text"
            defaultValue={location}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Image Link</label>
          <input
            type="text"
            defaultValue={image}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>

        {/* User Name (Read-only) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">User Name</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">User Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Update Button */}
        <button
          type="button"
          className="w-full py-3 mt-4 text-white bg-[#F0256E] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperties;
