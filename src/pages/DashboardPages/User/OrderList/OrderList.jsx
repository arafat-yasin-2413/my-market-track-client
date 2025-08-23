import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaEye } from "react-icons/fa";
import { Link } from "react-router";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
};

const OrderList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["myOrders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="px-4 md:px-10 py-8">
            <div className="flex justify-center items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <FaClipboardList className="text-blue-600" />
                    My Order List
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">SL</th>
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-left">Image</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Market Name</th>
                            <th className="px-6 py-3 text-left">Order Time</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr
                                key={order._id}
                                className="hover:bg-gray-100 transition"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-semibold">
                                    {order.product?.itemName}
                                </td>
                                <td className="px-6 py-4">
                                    <img
                                        src={order.product?.productImage}
                                        alt="product"
                                        className="w-12 h-12 border p-0.5 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    ${order.product?.price}
                                </td>
                                <td className="px-6 py-4">
                                    {order.product?.marketName}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDateTime(order.orderTime)}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/products/details/${order?.product?._id}`}>
                                    <button className="flex items-center gap-1 px-3 py-1 bg-accent hover:bg-accent/90 cursor-pointer text-white rounded shadow-sm transition">
                                        <FaEye />
                                        View Details
                                    </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <p className="text-center py-6 text-gray-500">
                        You have no orders yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default OrderList;
