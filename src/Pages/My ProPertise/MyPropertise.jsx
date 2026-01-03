import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { Link } from 'react-router';
import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion';
import FaqSection from './FAQSection';
import Newsletter from './Newsletter';
import HeroImg from '../../assets/brand_img.png';

const MyPropertise = () => {
  const { user, loading } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://mongodb-server-site.vercel.app/realagent?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading your properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="relative h-96 md:h-128 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImg})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
            All{' '}
            <span className="bg-linear-to-r from-pink-600 to-purple-500 bg-clip-text text-transparent">
              Properties
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 font-light drop-shadow-lg max-w-3xl mx-auto">
            Discover premium listings from verified agents across prime locations
          </p>
        </motion.div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {properties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-600 mb-8">You haven't added any properties yet.</p>
              <Link
                to="/addpropertise"
                className="inline-block px-10 py-5 bg-linear-to-r from-pink-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-500"
              >
                Add Your First Property
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-center mb-12"
              >
                Your Listed Properties <span className='text-pink-600'>({properties.length})</span>
              </motion.h2>

              <div className="grid grid-cols md:grid-cols-3  gap-8">
                {properties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <section>
        <Newsletter></Newsletter>
      </section>
      <section>
        <FaqSection></FaqSection>
      </section>
    </div>
  );
};

export default MyPropertise;
