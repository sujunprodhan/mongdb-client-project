import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider'; // adjust path
import RatingCard from '../components/RatingCard'; // adjust path

export default function MyRatings() {
  const { user, token } = useContext(AuthContext); // token assumed available in context
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's ratings from backend
  useEffect(() => {
    if (!user?.email) {
      setRatings([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL || ''}/api/ratings?userEmail=${encodeURIComponent(
            user.email
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // include token if your backend requires authentication
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        // Expecting data to be an array of ratings
        setRatings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to load ratings');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();

    return () => controller.abort();
  }, [user?.email, token]);

  // Delete rating handler (optimistic)
  const handleDelete = async (ratingId) => {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (!confirmed) return;

    const prev = [...ratings];
    setRatings((r) => r.filter((item) => item._id !== ratingId));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || ''}/api/ratings/${ratingId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!res.ok) throw new Error('Failed to delete on server');
      // success - nothing else to do because UI already updated
    } catch (err) {
      // rollback
      setRatings(prev);
      alert('Could not delete review. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Ratings</h2>

      {loading && <div className="py-12 text-center text-gray-500">Loading your ratings...</div>}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {!loading && !error && ratings.length === 0 && (
        <div className="text-center text-gray-600 py-16">
          <p className="mb-3">You haven't left any ratings yet.</p>
          <p className="text-sm">Visit a property to leave your first review.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {ratings.map((rating) => (
          <RatingCard
            key={rating._id}
            rating={rating}
            onDelete={() => handleDelete(rating._id)}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
}
