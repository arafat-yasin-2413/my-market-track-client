import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

const AddProductForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [previewImage, setPreviewImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_upload_key
        }`;

        try {
            const res = await axios.post(imageUploadUrl, formData);
            console.log(res.data);
            // console.log(res.data.data);

            const imageUrl = res.data.data.url;
            setValue("productImage", imageUrl);
            setPreviewImage(imageUrl);
        } catch (error) {
            console.log("Upload error: ", error);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const formattedPrice = parseInt(data.price);

        const newProduct = {
            email: user?.email,
            name: data.vendorName || "",
            marketName: data.marketName,
            marketDescription: data.marketDescription,
            date: formattedDate,
            itemName: data.itemName,
            status: data.status || "pending",
            productImage: data.productImage,
            price: formattedPrice,
            prices: [
                {
                    date: formattedDate,
                    price: formattedPrice,
                },
            ],
            itemDescription: data.itemDescription || "simple description",
        };

        console.log("Form data:", data);

        try {
            const res = await axiosSecure.post("/addProduct", newProduct);
            console.log(res.data);
            if (res.data.insertedId) {
                toast.success("Product Added Successfully!");
                reset();
                setSelectedDate(new Date());
                setPreviewImage("");
            } else {
                toast.error("Failed to add product. Try again.");
            }
        } catch (error) {
            console.error("error occured when adding product : ", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl flex justify-center items-center font-bold mb-6 text-center gap-2">
                {/* 🛒 Add Product */}
                <FaCartPlus></FaCartPlus>
                Add Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Vendor Info */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Vendor Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* email */}
                        <div>
                            <label>Email (read-only)</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                        </div>

                        {/* name */}
                        <div>
                            <label>Vendor Name (optional)</label>
                            <input
                                type="text"
                                placeholder="Vendor Name"
                                {...register("vendorName")}
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </div>
                </section>

                {/* Market Info */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Market Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* market name */}
                        <div>
                            <label>Market Name</label>
                            <input
                                type="text"
                                {...register("marketName", { required: true })}
                                placeholder="e.g., Karwan Bazar"
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                            {errors.marketName && (
                                <p className="text-red-500 text-sm">
                                    Market name is required
                                </p>
                            )}
                        </div>

                        {/* date */}
                        <div>
                            <label>Date</label> <br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="mt-1 w-full border border-gray-300 p-2 rounded"
                            />
                        </div>

                        {/* market description */}
                        <div className="md:col-span-2">
                            <label>Market Description</label>
                            <textarea
                                {...register("marketDescription", {
                                    required: true,
                                })}
                                placeholder="Location, history, etc."
                                className="w-full mt-1 border border-gray-300 p-2 rounded h-24"
                            ></textarea>
                            {errors.marketDescription && (
                                <p className="text-red-500 text-sm">
                                    Description is required
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Product Info */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Product Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* product name */}
                        <div>
                            <label>Item Name</label>
                            <input
                                type="text"
                                {...register("itemName", { required: true })}
                                placeholder="e.g., Onion"
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                            {errors.itemName && (
                                <p className="text-red-500 text-sm">
                                    Item name is required
                                </p>
                            )}
                        </div>

                        {/* status */}
                        <div>
                            <label>Status</label>
                            <select
                                {...register("status")}
                                defaultValue="pending"
                                className="w-full mt-1 border border-gray-300 p-2 rounded bg-white text-gray-800"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="approved">Rejected</option>
                            </select>
                        </div>

                        {/* product image */}
                        <div>
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="productImage"
                                onChange={handleImageUpload}
                                className="mt-1 w-full border border-gray-300 p-2 rounded"
                            />
                            {uploading && (
                                <p className="text-blue-600 text-sm mt-1">
                                    Uploading...
                                </p>
                            )}

                            {/* Preview Image */}
                            {previewImage && (
                                <div className="mt-2">
                                    
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-40 h-28 object-cover mt-1 border rounded"
                                    />
                                </div>
                            )}
                        </div>

                        {/* product image hidden input field. registerd by react hook form */}
                        <div className="hidden">
                            <input
                                type="text"
                                {...register("productImage", {
                                    required: true,
                                })}
                            />

                            {errors.productImage && (
                                <p className="text-red-500 text-sm">
                                    Image URL is required
                                </p>
                            )}
                        </div>

                        {/* price */}
                        <div>
                            <label>Price per Unit (৳)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: true })}
                                placeholder="e.g., 30"
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">
                                    Price is required
                                </p>
                            )}
                        </div>

                        {/* product description */}
                        <div className="md:col-span-2">
                            <label>Item Description (optional)</label>
                            <textarea
                                {...register("itemDescription")}
                                placeholder="Fresh, good quality, etc."
                                className="w-full mt-1 border border-gray-300 p-2 rounded h-20"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                    >
                        Submit Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
