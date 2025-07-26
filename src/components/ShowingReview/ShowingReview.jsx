import { Rating } from "@smastrom/react-rating";
import React from "react";

const ShowingReview = ({ reviewsForThisProduct }) => {
    return (
        <div>
            {reviewsForThisProduct.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        All Reviews ({reviewsForThisProduct.length})
                    </h3>
                    <div className="space-y-6">
                        {reviewsForThisProduct.map((review, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 border border-gray-200 rounded-md p-4"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <img
                                        src={review.photo}
                                        alt={review.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {review.name}
                                        </h4>
                                        <h4 className="text-gray-600">
                                            {review.email}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {new Date(
                                                review.date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <Rating
                                    value={review.rating}
                                    readOnly
                                    style={{ maxWidth: 120 }}
                                />
                                <p className="mt-2 text-gray-700">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowingReview;
