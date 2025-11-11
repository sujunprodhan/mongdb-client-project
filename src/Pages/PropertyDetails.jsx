import React, { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router';

export default function PropertyDetails() {
  const propertyData = useLoaderData() || {};
  const { image, title, price, description, location, category, author, postedAt } = propertyData;

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  const postedDate = useMemo(() => {
    if (postedAt) return new Date(postedAt).toLocaleDateString();
    return new Date().toLocaleDateString();
  }, [postedAt]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      rating: form.rating,
      text: form.text.trim(),
    };
    setReviews((r) => [newReview, ...r]);
    setForm({ name: '', text: '', rating: 5 });
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          <span className="text-xl">{location}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={title}
              className="text-black w-full h-80 md:h-[28rem] object-cover"
            />
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-3">Property Description</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm text-pink-600">Price</h3>
                <p className="font-semibold text-lg">
                  {price ? `\$${price.toLocaleString()}` : 'more details'}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-pink-600">Posted</h3>
                <p className="font-medium">{postedDate}</p>
              </div>

              <div>
                <h3 className="text-sm text-pink-600">Posted by</h3>
                <p className="font-medium">{author ? author : 'Anonymous'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Ratings & Reviews</h3>
                <p className="text-sm text-gray-500">
                  Average rating: <span className="font-bold">{avgRating}</span> • {reviews.length}{' '}
                  reviews
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <div className="text-yellow-500 mt-1">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - r.rating }).map((_, i) => (
                          <span key={i} className="text-gray-300">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{r.text}</p>
                </div>
              ))}
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="mt-6 bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-3">Leave a review</h4>

              {/* Name Input */}
              <input
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />

              {/* Star Rating */}
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`text-2xl ${
                        starValue <= form.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      onClick={() => setForm((f) => ({ ...f, rating: starValue }))}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              {/* Review Text */}
              <textarea
                className="w-full mt-3 border border-gray-200 rounded-md p-3 focus:outline-none"
                rows={4}
                placeholder="Write a short review"
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              />

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-white"
                  style={{ backgroundColor: '#F0256E' }}
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-600">Price</p>
                <p className="text-2xl font-extrabold">
                  {price ? `\$${price.toLocaleString()}` : 'Contact'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-pink-600">Category</p>
                <p className="font-medium">{category}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full py-3 rounded-xl font-semibold"
                style={{ backgroundColor: '#F0256E', color: 'white' }}
              >
                Contact Agent
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>Posted: {postedDate}</p>
              <p className="mt-2 text-pink-600">Agent: {author ? author : 'Anonymous'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h4 className="font-semibold mb-2 text-pink-600">Quick facts</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Location: {location}</li>
              <li>• Category: {category}</li>
              <li>• Reviews: {reviews.length}</li>
              <li>• Avg rating: {avgRating}</li>
            </ul>
          </div>
          <button>Delete Now</button>
          <button>Update Property</button>
        </aside>
      </div>
    </div>
  );
}
