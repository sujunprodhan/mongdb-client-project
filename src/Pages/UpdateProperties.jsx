import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';

const UpdateProperties = () => {
  const propertyData = useLoaderData() || {};
  const { user } = useContext(AuthContext) || {};
  const { image, title, price, description, location, category, _id } = propertyData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: Number(e.target.price.value) || 0,
      location: e.target.location.value,
      image: e.target.image.value,
      category: e.target.category.value,
    };

    try {
      const res = await fetch(`https://mongodb-server-site.vercel.app/realagent/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update property');

      toast.success('Property updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 text-center">
        Update Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            defaultValue={title}
            name="title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            defaultValue={description}
            name="description"
            rows={4}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={category || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          >
            <option value="">Select category</option>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Price</label>
            <input
              type="number"
              defaultValue={price}
              name="price"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={location}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Image Link</label>
          <input
            type="url"
            defaultValue={image}
            name="image"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0256E] transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">User Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              name="name"
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">User Email</label>
            <input
              type="email"
              value={user?.email || ''}
              name="email"
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 text-white bg-[#F0256E] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperties;
