import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RatingStars from "../RatingStars/RatingStars";
import { set } from "react-hook-form";


const ReviewAndComment = ({ product }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const userEmail = user?.email;
    const productId = product._id;

    // getting current user infos
    const { data: loggedInUser = {}, isLoading } = useQuery({
        queryKey: ["user", userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/:${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail,
    });

    // console.log(loggedInUser);

    const handleReviewSubmit = async () => {};

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Write a Review
            </h2>

            <div className="space-y-4">
                <RatingStars rating={rating} setRating={setRating}></RatingStars>

                <textarea
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
                    rows="4"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <button
                    onClick={handleReviewSubmit}
                    disabled={submitting}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-md transition disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        </div>
    );
};

export default ReviewAndComment;
