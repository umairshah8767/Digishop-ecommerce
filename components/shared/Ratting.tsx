import React from 'react';
import Image from 'next/image';

type RatingProps = {
  rating: {
    rate: number;  // Actual star rating
    count: number; // Number of reviews
  };
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Limit the rating to a maximum of 5 stars
  const starCount = Math.min(Math.round(rating?.rate || 0), 5);

  return (
    <div className="flex items-center">
      {/* Render star icons based on the rating rate */}
      {Array(starCount)
        .fill(0)
        .map((_, index) => (
          <Image
            key={index}
            src="/star-icon.png" // Ensure star-icon.png is in the public folder
            width={20}
            height={20}
            alt="star"
          />
        ))}
      {/* Display the number of reviews */}
      <p className="ml-2 text-[#007185]">{`(${rating.count} reviews)`}</p>
    </div>
  );
};

export default Rating;
