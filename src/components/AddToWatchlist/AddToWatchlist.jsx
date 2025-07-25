import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddToWatchlist = ({product}) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role } = useUserRole();

    // console.log(product._id);

    // console.log('product in add to watchlist page: ', product);
    const email = user?.email;
    const {
        data: singleUser = {},
    } = useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${email}`);
            // console.log('user from userdb: ', res.data);
            return res.data;
        },
    });
    console.log(singleUser);




    const handleAddToWatchlist = async()=>{
        const watchlistData = {
            userId: singleUser._id,
            name: singleUser.name,
            email: singleUser.email,
            userPhoto: singleUser.photo,
            productId: product._id,
        };

        try{
            const res = await axiosSecure.post("/watchlist", watchlistData);
                if(res.data?.insertedId) {
                    toast.success("Product added to your watchlist successfully.");
                }
                else{
                    toast.error("Error occured when adding to watchlist!");
                }
            
        }
        catch (error){
            // console.log(error);
            toast.error('Something went wrong!');
        }
    }

    return (
        <button
            onClick={handleAddToWatchlist}
            disabled={role === "admin" || role === "vendor"}
            className={`px-5 py-2 btn rounded-full text-white font-semibold transition duration-200 ${
                role === "admin" || role === "vendor"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
            Add to Watchlist
        </button>
    );
};

export default AddToWatchlist;
