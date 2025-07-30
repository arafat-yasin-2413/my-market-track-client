import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { FiEdit } from "react-icons/fi";
import { FaBoxOpen, FaSyncAlt } from "react-icons/fa";
import { MdAutorenew, MdCancel } from "react-icons/md";
import { Link } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllProductAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [adminFeedback, setAdminFeedback] = useState("");
    const [selectedId, setSelectedId] = useState(null);

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

    const handleApprove = async (id) => {
        try {
            const res = await axiosSecure.patch(`/products/approve/${id}`);
            if (res.data.modifiedCount > 0) {
                toast.success("Product approved!");
                refetch();
            }
        } catch (error) {
            // console.error(error);
            toast.error("Failed to approve product");
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        try {
            const rejectionData = {
                rejectionReason,
                adminFeedback,
            };
            const res = await axiosSecure.put(
                `/products/reject/${selectedId}`,
                rejectionData
            );
            if (res.data.modifiedCount > 0) {
                toast.success("Product rejected!");
                setShowModal(false);
                refetch();
            }
        } catch (error) {
            // console.error(error);
            toast.error("Rejection failed");
        }
    };


    const handleRemoveProduct= async(id)=>{
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/products/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Product has been deleted.", "success");
                    refetch();
                }
            } catch (error) {
                // console.error("Delete error:", error);
                Swal.fire("Error!", "Failed to delete product.", "error");
            }
        }
    });

    }

    const openRejectModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

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
            {products.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-center">
                                    SL
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
                                    Market Name
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
                                    <td className="py-3 px-4">
                                        {product.itemName}
                                    </td>
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
                                        {product.marketName}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                product.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : product.status ===
                                                      "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 text-center flex justify-center items-center gap-2">
                                        {product.status === "pending" && (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            product._id
                                                        )
                                                    }
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openRejectModal(
                                                            product._id
                                                        )
                                                    }
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {product.status === "approved" && (
                                            <button
                                                onClick={() =>
                                                    openRejectModal(product._id)
                                                }
                                                className="btn btn-error btn-sm"
                                            >
                                                Reject
                                            </button>
                                        )}

                                        {product.status === "rejected" && (
                                            <button
                                                onClick={() =>
                                                    handleApprove(product._id)
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleRemoveProduct(product._id)
                                            }
                                            className="text-red-600 hover:text-red-800 text-base btn btn-sm"
                                            title="Remove Permanently"
                                        >
                                            <MdDeleteForever size={24}></MdDeleteForever>
                                        </button>
                                    </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="my-6 text-center text-2xl">No Products to Show</p>
            )}

            {showModal && (
                <dialog id="reject_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Reject Product
                        </h3>
                        <form onSubmit={handleReject} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Reason for rejection"
                                className="input input-bordered w-full"
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                }
                                required
                            />
                            <textarea
                                placeholder="Admin Feedback"
                                className="textarea textarea-bordered w-full"
                                value={adminFeedback}
                                onChange={(e) =>
                                    setAdminFeedback(e.target.value)
                                }
                                required
                            />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-error">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AllProductAdmin;
