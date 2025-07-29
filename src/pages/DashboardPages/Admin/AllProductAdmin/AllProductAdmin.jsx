import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";


const AllProductAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: products = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allProduct");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="p-6">
            {/* Title */}
            <h2 className="text-2xl font-bold flex justify-center items-center gap-2 mb-6">
                <FaBoxOpen className="text-blue-600" />
                <span>All Products</span>
            </h2>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table-auto w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">
                                #
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                                Product Name
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                                Image
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                                Vendor Name
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product._id}
                                className="border-t hover:bg-gray-50 transition duration-200"
                            >
                                <td className="py-3 px-4 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-4">{product.itemName}</td>
                                <td className="py-3 px-4">
                                    <img
                                        src={product.productImage}
                                        alt="product"
                                        className="w-16 h-16 p-2 border border-gray-200 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-4">
                                    {product.name}
                                </td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            product.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : product.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            title="Edit"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button
                                            title="Delete"
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProductAdmin;
