import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageWatchlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: watchlistItems = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["watchlistItems", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/myWatchlist?email=${user?.email}`
            );
            return res.data;
        },
    });

    const handleRemove = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/watchlist/${id}`);
                if (res.data.success) {
                    // Swal.fire('Deleted!', 'The item has been removed.', 'success');
                    toast.success("Item removed from Watchlist Successfully.")
                    refetch(); 
                } else {
                    // Swal.fire('Error!', res.data.message || 'Something went wrong.', 'error');
                    toast.warning("Something went wrong!");
                }
            } catch (error) {
                console.log(error);
                Swal.fire('Error!', 'Failed to remove the item.', 'error');
            }
        }
    });
};

    console.log(watchlistItems);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (isError) {
        toast.error(error.message);
    }

    return (
        <div className="p-6">
            {/* Title */}
            <div className="flex justify-center items-center gap-3 mb-6">
                <FaRegHeart className="text-2xl text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                    My Watchlist
                </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                SL
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Image
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Product Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Market Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Added Date
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {watchlistItems.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <td className="px-4 py-3 text-sm text-gray-800">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3">
                                    <img
                                        src={item.product?.productImage}
                                        alt={item.product?.name}
                                        className="w-14 h-14 rounded object-cover border"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {item.product?.itemName}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {item.product?.marketName}
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {new Date(item.addedTime).toLocaleString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        }
                                    )}
                                </td>

                                <td className="px-4 py-3 space-x-2">
                                    <Link to="/allProduct">
                                        <button className="px-3 py-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded shadow-sm transition duration-150">
                                            Add More
                                        </button>
                                    </Link>
                                    <button onClick={()=> handleRemove(item._id)} className="px-3 py-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow-sm transition duration-150">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {watchlistItems.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No items in your watchlist.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageWatchlist;
