import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router";
import { FiBox } from "react-icons/fi";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: products = [], refetch } = useQuery({
        queryKey: ["my-product", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data;
        
        },
    });


    

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    const handleViewProduct = async (id) => {
        // console.log('id received : ',id);
        const result = await axiosSecure.get(`/products/${id}`);
        console.log(result.data);
        const product = result.data;

        navigate(`/products/details/${id}`, { state: { product } });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            // console.log(result);
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/products/${id}`);
                    console.log(res.data);

                    if (res.data?.deletedCount) {
                        Swal.fire(
                            "Deleted!",
                            "Your product has been deleted.",
                            "success"
                        );
                        refetch();
                    } else {
                        Swal.fire(
                            "Failed!",
                            res.data?.message || "Something went wrong",
                            "error"
                        );
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err?.message || "Something went wrong!",
                    });
                }
            }
        });
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            {products.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-50 text-gray-700 text-left">
                            <tr>
                                <th className="px-4 py-3">SL</th>
                                <th className="px-4 py-3">Item Name</th>
                                <th className="px-4 py-3">Item Image</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Market Name</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2 font-medium">
                                        {product.itemName}
                                        {/* {product._id} */}
                                    </td>
                                    <td className="px-4 py-2">
                                        {
                                            <img className="w-16" src={product.productImage} alt="" />
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.price} ৳
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.marketName}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.date}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                statusColors[product.status] ||
                                                "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleViewProduct(product._id)
                                            }
                                            className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                                        >
                                            <h4>
                                                {" "}
                                                <FaEye></FaEye>{" "}
                                            </h4>
                                        </button>

                                        <Link to={`/dashboard/updateProduct/${product._id}`}>
                                        
                                            <button 
                                            
                                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded cursor-pointer">
                                                <h4>
                                                    {" "}
                                                    <FaEdit></FaEdit>{" "}
                                                </h4>
                                            </button>
                                        </Link>
                                        
                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                                        >
                                            <h4>
                                                {" "}
                                                <FaTrashAlt></FaTrashAlt>{" "}
                                            </h4>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-center justify-center">
                            <FiBox className="text-blue-600" />
                            My Products
                        </h2>

                        <p className="text-center text-gray-500">
                            No Products found
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProducts;
