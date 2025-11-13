import React, { useMemo, useState, useEffect, use } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import Swal from 'sweetalert2';

const PropertyDetails = () => {
  const propertyData = useLoaderData() || {};
  const { user } = use(AuthContext);
  const { image, title, price, description, location, category, author, postedAt, _id } =
    propertyData;

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    if (!_id) return;
    fetch(`http://localhost:3000/reviews/${_id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, [_id]);

  const postedDate = useMemo(() => {
    if (postedAt) return new Date(postedAt).toLocaleDateString();
    return new Date().toLocaleDateString();
  }, [postedAt]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;

    const payload = {
      propertyId: _id,
      email: user.email,
      name: form.name.trim(),
      rating: form.rating,
      text: form.text.trim(),
    };

    try {
      await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setForm({ name: '', text: '', rating: 5 });
      const res = await fetch(`http://localhost:3000/reviews/${_id}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/realagent/${_id}`, {
          method: 'Deleted',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

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
              {reviews.map((r) => {
                const key = r._id ?? r.id ?? Math.random();
                const rating = Number(r.rating) || 0;
                return (
                  <div key={key} className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <div className="text-yellow-500 mt-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <span key={i} className="text-gray-300">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{r.text}</p>
                    <small className="text-gray-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
                    </small>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 bg-white p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-3">Leave a review</h4>

              <input
                className="w-full border border-gray-200 rounded-md p-2 focus:outline-none"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />

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
          <div className="mt-6 flex flex-col text-center gap-3">
            <Link
              to={`/updateproperties/${_id}`}
              className='className="w-full py-3 rounded-xl font-semibold text-white cursor-pointer bg-pink-600 hover:bg-pink-700 duration-500 transition-colors"'
            >
              Update Property
            </Link>
            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-xl font-semibold text-white cursor-pointer bg-red-600 hover:bg-red-700 duration-500 transition-colors"
            >
              Delete Property
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetails;
