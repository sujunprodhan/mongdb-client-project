import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carddesign from '../Componets/Carddesign';

const AllPropertise = () => {
  const realProperty = useLoaderData() || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredData = useMemo(() => {
    let data = realProperty.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') data = [...data].sort((a, b) => a.price - b.price);
    if (sortOrder === 'desc') data = [...data].sort((a, b) => b.price - a.price);

    return data;
  }, [realProperty, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Hero Banner */}
      <section className="relative h-96 md:h-[32rem] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600566753376-2a72f6bce7c7?w=1920&q=80')`,
          }}
        />

        {/* Dark Pink Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-pink-900/50 to-black/70" />

        {/* Subtle Blur Accents */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            All Properties
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 font-light drop-shadow-lg">
            Explore premium listings from trusted agents
          </p>
        </motion.div>
      </section>

      {/* Filters & Search - Glassmorphism Card */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/30 dark:border-gray-700/50 rounded-3xl shadow-2xl p-6 md:p-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Showing Count Badge */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Showing</span>
                <span className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full shadow-lg">
                  {filteredData.length} Properties
                </span>
              </div>

              {/* Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80 px-5 py-4 pl-12 bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-6 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400/50 transition"
                >
                  <option value="none">Sort by Price</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {filteredData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-600 mb-8">No properties found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSortOrder('none');
                }}
                className="px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Carddesign property={property} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllPropertise;