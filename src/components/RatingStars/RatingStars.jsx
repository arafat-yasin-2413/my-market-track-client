import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const RatingStars = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            <Rating
                style={{ maxWidth: 120 }}
                value={rating}
                onChange={setRating}
                className="flex flex-row cursor-pointer transition-all duration-200"
            />
        </div>
    );
};

export default RatingStars;
