import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router';

export default function AddPropertise() {
  const { user } = useContext(AuthContext);
  const hadleSubmit = (e) => {
    e.preventDefault();
    const fromData = {
      title: e.target.title.value,
      email: e.target.email.vlaue,
      description: e.target.description.value,
      price: e.target.price.value,
      location: e.target.location.value,
      image: e.target.image.value,
      category: e.target.category.value,
    };

    fetch('https://mongodb-server-site.vercel.app/realagent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success('Added Property Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h2 className="text-center text-2xl font-semibold text-pink-600 mb-6">Add Property</h2>

      <form onSubmit={hadleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Property Name"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            type="text"
            rows="4"
            placeholder="Write a short description..."
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="">Slect Category</option>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Link</label>
          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
          <input
            type="text"
            name="name"
            value={user?.displayName || ''}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ''}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md font-medium hover:bg-pink-700 transition"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
