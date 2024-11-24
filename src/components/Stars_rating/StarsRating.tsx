'use client';

import React, { FC } from 'react';
import './StarsRating.css';

interface IStarsRatingProps {
    rating: number;
    maxStars?: number;
}

const StarsRating: FC<IStarsRatingProps> = ({ rating, maxStars = 5 }) => {
    const filledStars = Math.round((rating / 10) * maxStars);
    const emptyStars = maxStars - filledStars;

    return (
        <div className="stars-rating">
            {Array(filledStars)
                .fill(0)
                .map((_, index) => (
                    <span key={`filled-${index}`} className="star filled">★</span>
                ))}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <span key={`empty-${index}`} className="star empty">☆</span>
                ))}
        </div>
    );
};

export default StarsRating;