import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthProvider/Authprovider';

const MyRating = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    let cancelled = false;
    const fetchAll = async () => {
      try {
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
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">My Reviews</h2>

      <div className="grid gap-4">
        {items.map((review) => {
          const key = review._id || `${review.reviewerEmail}-${review.createdAt}`;
          const shortText =
            review.text?.length > 120
              ? review.text.slice(0, 120) + '...'
              : review.text || 'No text';
          return (
            <div
              key={key}
              className="flex gap-4 p-3 border border-pink-600 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Link to={`/properties/${review.property?._id || ''}`} className="flex-shrink-0">
                <img
                  src={review.property?.image}
                  alt={review.property?.title}
                  className="w-30 h-30 object-cover rounded-md"
                />
              </Link>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{review.property?.title}</h3>
                <p className="text-gray-700 mt-1">{shortText}</p>

                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 mr-2">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const idx = i + 1;
                      return (
                        <span key={i} className={idx <= review.rating ? '' : 'text-gray-300'}>
                          ★
                        </span>
                      );
                    })}
                  </span>
                  <small className="text-gray-400 text-pink-600">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'No date'}
                  </small>
                </div>

                <p className="text-sm text-pink-600 mt-1">
                  Reviewed by:{' '}
                  <span className="font-medium text-gray-400">
                    {review.reviewerName || review.reviewerEmail || 'Anonymous'}
                  </span>{' '}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRating;
