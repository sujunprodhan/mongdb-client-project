import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Replace with your JSON path or API endpoint
    fetch('/reviews.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-11/12 mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 mx-auto rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg mb-1">{review.name}</h3>
              <p className="text-yellow-400 mb-2">{'⭐'.repeat(review.rating)}</p>
              <p className="text-gray-700">{review.text}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
