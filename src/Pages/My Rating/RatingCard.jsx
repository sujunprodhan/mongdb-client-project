import React from 'react';
import PropTypes from 'prop-types';

/**
 * Expected rating object shape (backend):
 * {
 *   _id: string,
 *   reviewerName: string,      // who reviewed (optional - fallback to reviewerEmail)
 *   reviewerEmail: string,
 *   propertyId: string,
 *   propertyName: string,
 *   propertyThumbnail: string, // url
 *   rating: number,            // 1..5
 *   reviewText: string,
 *   createdAt: string,         // ISO date
 * }
 */

const RatingCard = ({ rating, onDelete }) => {
  const {
    reviewerName,
    reviewerEmail,
    propertyName,
    propertyThumbnail,
    rating: stars = 0,
    reviewText,
    createdAt,
  } = rating;

  const displayName = reviewerName || reviewerEmail || 'Anonymous';
  const date = createdAt ? new Date(createdAt) : null;
  const formattedDate = date ? date.toLocaleDateString('en-GB') : 'Unknown date';

  // Build star display (simple)
  const StarRow = ({ value }) => {
    const filled = Math.max(0, Math.min(5, Math.round(value)));
    return (
      <div className="flex items-center space-x-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < filled ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill={i < filled ? 'currentColor' : 'none'}
            stroke="currentColor"
          >
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 15.9 4.8 18.7l1-5.8L1.5 8.7l5.9-.9L10 1.5z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex items-start space-x-4">
        <img
          src={propertyThumbnail || 'https://via.placeholder.com/120x80?text=No+Image'}
          alt={propertyName || 'Property thumbnail'}
          className="w-28 h-20 object-cover rounded-md flex-none"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{propertyName || 'Unknown Property'}</h3>
              <p className="text-sm text-gray-500">
                By: <span className="font-medium text-gray-700">{displayName}</span>
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-400">{formattedDate}</div>
              <button
                onClick={onDelete}
                aria-label="Delete review"
                className="mt-2 inline-block text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-3">
            <StarRow value={stars} />
            <p className="mt-2 text-sm text-gray-700 line-clamp-4">{reviewText || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

RatingCard.propTypes = {
  rating: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default RatingCard;
