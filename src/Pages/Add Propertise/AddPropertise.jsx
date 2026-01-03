import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // ← Ei line ta add koro

export default function AddPropertise() {
  const { user } = useContext(AuthContext);

  const hadleSubmit = (e) => {
    e.preventDefault();
    const fromData = {
      title: e.target.title.value,
      email: e.target.email.value,
      description: e.target.description.value,
      price: e.target.price.value,
      location: e.target.location.value,
      image: e.target.image.value,
      category: e.target.category.value,
      name: user?.displayName || '',
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
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to add property');
      });
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-700 to-pink-800">
      {/* Background Blur Orbs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title Animation - ekhon kaj korbe */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Add New Property</h2>
          <p className="text-xl text-pink-100">List your property with premium visibility</p>
        </motion.div>

        {/* Two-Column Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={hadleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Property Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Luxury Villa in Gulshan"
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                />
              </div>

              <div>
                <label className=" text-white font-semibold">Category</label>
                <select
                  name="category"
                  required
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                >
                  <option value="" className="text-gray-800">
                    Select Category
                  </option>
                  <option value="House" className="text-gray-800">
                    House
                  </option>
                  <option value="Apartment" className="text-gray-800">
                    Apartment
                  </option>
                  <option value="Townhouse" className="text-gray-800">
                    Townhouse
                  </option>
                  <option value="Mansion" className="text-gray-800">
                    Mansion
                  </option>
                  <option value="Farmhouse" className="text-gray-800">
                    Farmhouse
                  </option>
                  <option value="Penthouse" className="text-gray-800">
                    Penthouse
                  </option>
                  <option value="Cabin" className="text-gray-800">
                    Cabin
                  </option>
                  <option value="Studio" className="text-gray-800">
                    Studio
                  </option>
                  <option value="Villa" className="text-gray-800">
                    Villa
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Price (BDT)</label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="e.g. 25000000"
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Gulshan-2, Dhaka"
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://example.com/property.jpg"
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Agent Name</label>
                <input
                  type="text"
                  value={user?.displayName || ''}
                  readOnly
                  className="w-full px-5 py-4 bg-white/30 border border-white/40 rounded-2xl text-white"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Agent Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-5 py-4 bg-white/30 border border-white/40 rounded-2xl text-white"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  rows="6"
                  required
                  placeholder="Describe your property features, amenities, neighborhood..."
                  className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-8">
              <button
                type="submit"
                className="w-full py-5 bg-linear-to-r from-pink-300 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500"
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
