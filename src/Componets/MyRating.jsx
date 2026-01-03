import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const MyRating = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const propRes = await axios.get(
          `https://mongodb-server-site.vercel.app/realagent?email=${user.email}`
        );
        const properties = Array.isArray(propRes.data)
          ? propRes.data
          : propRes.data.properties ?? [];

        const reviewPromises = properties.map((p) =>
          fetch(`https://mongodb-server-site.vercel.app/reviews/${p._id}`)
            .then((r) => r.json())
            .then((data) => {
              const arr = Array.isArray(data) ? data : data.reviews ?? [];
              return arr.map((rev) => ({
                ...rev,
                rating: Number(rev.rating) || 0,
                property: { _id: p._id, title: p.title, image: p.image, location: p.location },
              }));
            })
            .catch(() => [])
        );

        const reviewsArrays = await Promise.all(reviewPromises);
        const flat = reviewsArrays.flat();

        flat.sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });

        if (!cancelled) setItems(flat);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user]);

  // Premium Star Rating
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`w-6 h-6 drop-shadow-md ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
        <span className="ml-3 text-lg font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-xl text-gray-600">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Premium Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600">See what buyers are saying about your properties</p>
        </motion.div>

        {/* Reviews List */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-8 opacity-20">⭐</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Reviews Yet</h3>
              <p className="text-lg text-gray-600 mb-8">
                When buyers leave reviews on your listed properties, they will appear here.
              </p>
              <Link
                to="/mypropertise"
                className="inline-block px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-500"
              >
                View My Properties
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-10">
            {items.map((review, index) => {
              const key = review._id || `${review.reviewerEmail}-${review.createdAt}`;
              const shortText =
                review.text?.length > 200
                  ? review.text.slice(0, 200) + '...'
                  : review.text || 'No comment provided';

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group backdrop-blur-sm bg-white/90 border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-8 p-8">
                    {/* Property Image */}
                    <Link
                      to={`/properties/${review.property?._id || ''}`}
                      className="flex-shrink-0"
                    >
                      <div className="relative w-full lg:w-80 h-64 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={review.property?.image || '/placeholder.jpg'}
                          alt={review.property?.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>

                    {/* Review Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/properties/${review.property?._id || ''}`}
                          className="block mb-3"
                        >
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                            {review.property?.title || 'Untitled Property'}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <HiOutlineLocationMarker className="w-5 h-5 text-pink-500" />
                          <span className="text-lg">
                            {review.property?.location || 'Location not available'}
                          </span>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed mb-6">"{shortText}"</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <StarRating rating={review.rating} />

                        <div className="text-sm text-gray-500">
                          <p className="font-medium text-pink-600">
                            Reviewed by:{' '}
                            {review.reviewerName || review.reviewerEmail || 'Anonymous'}
                          </p>
                          <p>
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                              : 'Date not available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Animated Star Rating Sub-component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          className={`w-7 h-7 drop-shadow-lg ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
      <span className="ml-4 text-2xl font-bold text-gray-800">{rating.toFixed(1)}</span>
    </div>
  );
};

export default MyRating;
