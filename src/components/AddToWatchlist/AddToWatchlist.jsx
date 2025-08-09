import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddToWatchlist = ({ product }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useUserRole();
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const navigate = useNavigate();

    // console.log(product._id);

    // console.log('product in add to watchlist page: ', product);
    const email = user?.email;
    const { data: singleUser = {} } = useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${email}`);
            // console.log('user from userdb: ', res.data);
            return res.data;
        },
    });


    useEffect(() => {
        const checkWatchlist = async () => {
            if (singleUser._id && product._id) {
                try {
                    const res = await axiosSecure.get(
                        `/watchlist/check?email=${singleUser?.email}&productId=${product._id}`
                    );
                    setAlreadyAdded(res.data?.exist || false);
                } catch (error) {
                    // console.log(error);
                }
            }
        };
        checkWatchlist();
    }, [singleUser._id, singleUser?.email, product._id, axiosSecure]);

    const handleAddToWatchlist = async () => {
        const watchlistData = {
            userId: singleUser._id,
            name: singleUser.name,
            email: singleUser.email,
            userPhoto: singleUser.photo,
            product: product,
            addedTime: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post("/watchlist", watchlistData);
            if (res.data?.insertedId) {
                toast.success("Product added to your watchlist successfully.");
                setAlreadyAdded(true);
                navigate("/dashboard/myWatchlist");
            } else {
                toast.error("Error occured when adding to watchlist!");
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong!");
        }
    };

    const isDisabled = alreadyAdded || role === "admin" || role === "vendor";

    return (
        <button
            onClick={handleAddToWatchlist}
            disabled={isDisabled}
            className={`px-5 py-2 btn rounded-full font-semibold transition duration-200 ${
                isDisabled
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
            {alreadyAdded ? "Already in Watchlist" : "Add To Watchlist"}
        </button>
    );
};

export default AddToWatchlist;
