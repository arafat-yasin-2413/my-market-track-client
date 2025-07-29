import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import { FaShoppingCart } from "react-icons/fa";

const AllOrder = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allOrders = [], isLoading } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allOrders");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    return (
        <div className="p-5 md:p-10">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2 mb-6 text-center text-gray-800">
                <FaShoppingCart className="text-blue-600" />
                All Orders
            </h2>
            {allOrders.length > 0 ? (
                <div className="overflow-x-auto shadow-xl rounded-lg">
                    <table className="table w-full text-center table-zebra">
                        <thead className="bg-blue-100 text-gray-800 text-sm md:text-base">
                            <tr>
                                <th>SL</th>
                                <th>Customer Email</th>
                                <th>Product Name</th>
                                <th>Product Image</th>
                                <th>Price</th>
                                <th>Order Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.map((order, index) => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-blue-50 transition-all duration-200"
                                >
                                    <td className="align-middle">
                                        {index + 1}
                                    </td>
                                    <td className="align-middle">
                                        {order.userEmail}
                                    </td>
                                    <td className="align-middle">
                                        {order.product?.itemName}
                                    </td>
                                    <td className="align-middle">
                                        <img
                                            src={order.product?.productImage}
                                            alt="product"
                                            className="w-14 h-14 object-cover mx-auto rounded"
                                        />
                                    </td>
                                    <td className="align-middle font-semibold text-gray-700">
                                        ${order.product?.price}
                                    </td>
                                    <td className="align-middle text-sm">
                                        {format(
                                            new Date(order.orderTime),
                                            "d MMMM yyyy"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-2xl text-center my-6">No Orders to Show</p>
            )}
        </div>
    );
};

export default AllOrder;
