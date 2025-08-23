import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import RatingStars from "../RatingStars/RatingStars";
import { toast } from "react-toastify";
import { Rating } from "@smastrom/react-rating";
import ShowingReview from "../ShowingReview/ShowingReview";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { MdOutlineRateReview } from "react-icons/md";

const ReviewAndComment = ({ product }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    const userEmail = user?.email;
    const productId = product._id;

    // getting current user infos
    const { data: loggedInUser = {}, isLoading: userLoading } = useQuery({
        queryKey: ["user", userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/:${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail,
    });

    // console.log(loggedInUser);

    // getting reviews for this product
    const { data: reviewsForThisProduct = [], isLoading: reviewsLoading } =
        useQuery({
            queryKey: ["reviews", productId],
            queryFn: async () => {
                const res = await axiosSecure.get(`/reviews/${productId}`);
                return res.data;
            },
            enabled: !!productId,
        });

    useEffect(() => {
        if (loggedInUser?._id && reviewsForThisProduct?.length > 0) {
            const found = reviewsForThisProduct.find(
                (singleReview) => singleReview.email === loggedInUser.email
            );

            if (found) {
                setHasReviewed(true);
            } else {
                setHasReviewed(false);
                setRating(0);
                setComment("");
            }
        }
    }, [loggedInUser, reviewsForThisProduct]);

    const handleReviewSubmit = async () => {
        if (rating === 0 || comment.trim() === "") {
            return toast.error("Rating and comment are both required!");
        }

        const reviewData = {
            userId: loggedInUser?._id,
            email: loggedInUser?.email,
            name: loggedInUser?.name,
            photo: loggedInUser?.photo,
            productId: productId,
            rating,
            comment,
            date: new Date().toISOString(),
        };

        try {
            setSubmitting(true);

            await axiosSecure.post("/reviews", reviewData);

            toast.success("Review Submitted Successfully.");
            setHasReviewed(true);
            setRating(0);
            setComment("");

            queryClient.invalidateQueries(["reviews", productId]);
        } catch (error) {
            // console.log(error);
            toast.error("Failed to submit review!");
        } finally {
            setSubmitting(false);
        }
    };

    if (userLoading || reviewsLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="w-full xl:w-1/2 mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
            <h1 className="text-center text-3xl md:text-5xl font-bold mb-10 flex justify-center items-center gap-2">
                <span className="text-primary">
                    <MdOutlineRateReview></MdOutlineRateReview>
                </span>{" "}
                Review and Comment
            </h1>

            <h2 className="text-xl font-medium text-gray-800 mb-6">
                Write a Review
            </h2>

            <div className="space-y-4">
                <RatingStars
                    rating={rating}
                    setRating={setRating}
                    disabled={hasReviewed}
                />

                <textarea
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-500 font-medium tracking-wider"
                    rows="4"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={hasReviewed}
                />

                <button
                    onClick={handleReviewSubmit}
                    disabled={submitting || hasReviewed}
                    className={`py-2 px-6 rounded-md font-semibold cursor-pointer transition ${
                        hasReviewed
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-accent hover:bg-accent/90 text-white"
                    }`}
                >
                    {hasReviewed
                        ? "Already Reviewed"
                        : submitting
                        ? "Submitting..."
                        : "Submit Review"}
                </button>
            </div>

            <ShowingReview
                reviewsForThisProduct={reviewsForThisProduct}
            ></ShowingReview>
        </div>
    );
};

export default ReviewAndComment;
