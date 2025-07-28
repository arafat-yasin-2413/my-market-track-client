import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";

const MyAdvertisements = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axios = useAxios();
    const [selectedAd, setSelectedAd] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const {
        data: myAds = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["myAds", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myAds?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/myAds/delete/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Ad deleted successfully!");
                    refetch();
                } else {
                    toast.error("Failed to delete.");
                }
            } catch (error) {
                toast.error("Delete failed!");
            }
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file); // "image" is the required key for imgbb

        const apiKey = import.meta.env.VITE_image_upload_key;
        
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        try {
            const res = await axios.post(imageUploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageUrl = res.data?.data?.url;
            return imageUrl || null;
        } catch (error) {
            toast.error("Image upload failed!");
            return null;
        }
    };

    const handleUpdate = (ad) => {
        setSelectedAd(ad);
        setPreviewImage(null);
        setImageFile(null);
        setShowModal(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setPreviewImage(null);
            setImageFile(null);
            return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "text-green-600 font-semibold";
            case "rejected":
                return "text-red-500 font-semibold";
            default:
                return "text-yellow-500 font-semibold";
        }
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-600">📢</span> My Advertisements
            </h2>

            <div className="overflow-x-auto rounded shadow-md border">
                <table className="min-w-full bg-white text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="py-3 px-4">SL</th>
                            <th className="py-3 px-4">Ad Title</th>
                            <th className="py-3 px-4">Short Description</th>
                            <th className="py-3 px-4">Ad Image</th>
                            <th className="py-3 px-4">Created At</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAds.map((ad, index) => (
                            <tr
                                key={ad._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="py-3 px-4 align-middle text-base">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-4 align-middle text-base">
                                    {ad.title}
                                </td>
                                <td className="py-3 px-4 align-middle text-base">
                                    {ad.description}
                                </td>
                                <td className="py-3 px-4 align-middle text-base">
                                    <img
                                        src={ad.image}
                                        alt="ad"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-4 align-middle text-base">
                                    {format(
                                        new Date(ad.createdAt),
                                        "dd MMMM yyyy"
                                    )}
                                </td>
                                <td className="py-3 px-4 align-middle text-base">
                                    <span className={getStatusColor(ad.status)}>
                                        {ad.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 align-middle text-base flex gap-2">
                                    <button
                                        onClick={() => handleUpdate(ad)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Update"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ad._id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {showModal && selectedAd && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold mb-4">
                            Update Advertisement
                        </h3>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;
                                const adTitle = form.adTitle.value;
                                const shortDescription =
                                    form.shortDescription.value;
                                const email = form.email.value;

                                let imageUrl = selectedAd.image;
                                if (imageFile) {
                                    imageUrl = await handleImageUpload(
                                        imageFile
                                    );
                                    if (!imageUrl) return;
                                }

                                const updatedAd = {
                                    title: adTitle,
                                    description: shortDescription,
                                    email: email,
                                    image: imageUrl,
                                };

                                try {
                                    const res = await axiosSecure.put(
                                        `/myAds/update/${selectedAd._id}`,
                                        updatedAd
                                    );
                                    if (res.data.modifiedCount > 0) {
                                        toast.success(
                                            "Ad updated successfully!"
                                        );
                                        refetch();
                                        setShowModal(false);
                                    } else {
                                        toast.info("No changes were made.");
                                    }
                                } catch (err) {
                                    toast.error("Update failed!");
                                }
                            }}
                        >
                            <div className="mb-3">
                                <label className="block text-sm font-medium">
                                    Ad Title
                                </label>
                                <input
                                    type="text"
                                    name="adTitle"
                                    defaultValue={selectedAd.title}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">
                                    Short Description
                                </label>
                                <textarea
                                    name="shortDescription"
                                    defaultValue={selectedAd.description}
                                    className="textarea textarea-bordered w-full"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={user?.email}
                                    className="input input-bordered w-full bg-gray-100"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm font-medium">
                                    Ad Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={handleImageChange}
                                />
                                <img
                                    src={previewImage || selectedAd.image}
                                    alt="ad preview"
                                    className="mt-2 w-24 h-24 object-cover rounded border"
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAdvertisements;
