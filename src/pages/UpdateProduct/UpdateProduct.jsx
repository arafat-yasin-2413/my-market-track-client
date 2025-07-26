import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import axios from "axios";

const UpdateProduct = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [existingPrices, setExistingPrices] = useState([]);
    const [fetchedProduct, setFetchedProduct] = useState({});

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosSecure.get(`/products/${id}`);
                const product = res.data;
                setFetchedProduct(product);

                setValue("vendorName", product.name);
                setValue("marketName", product.marketName);
                setValue("marketDescription", product.marketDescription);
                setValue("itemName", product.itemName);
                setValue("status", product.status);
                setValue("productImage", product.productImage);
                setValue("price", product.price);
                setValue("itemDescription", product.itemDescription);
                setSelectedDate(new Date(product.date));
                setPreviewImage(product.productImage);
                setExistingPrices(product.prices || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch product", err);
                toast.error("Failed to load product.");
            }
        };

        fetchProduct();
    }, [axiosSecure, id, setValue]);

    // console.log(fetchedProduct);
    const creationDate = fetchedProduct.productCreationDate;



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
        if (!data.price || isNaN(data.price)) {
            toast.error("Price is invalid or missing");
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];
        const newPrice = parseFloat(data.price);

        const updatedPrices = existingPrices.filter(
            (p) => p.date !== formattedDate
        );

        updatedPrices.push({ date: formattedDate, price: newPrice });

        updatedPrices.sort((a, b) => new Date(a.date) - new Date(b.date));
        const latestPrice = updatedPrices[updatedPrices.length - 1].price;

        const updatedProduct = {
            name: data.vendorName || "",
            marketName: data.marketName,
            marketDescription: data.marketDescription,
            date: formattedDate,
            itemName: data.itemName,
            status: data.status || "pending",
            productImage: data.productImage,
            price: latestPrice,
            prices: updatedPrices,
            itemDescription: data.itemDescription || "simple description",
        };

        try {
            const res = await axiosSecure.put(
                `/updateProduct/${id}`,
                updatedProduct
            );
            if (res.data.modifiedCount > 0) {
                toast.success("Product updated successfully!");
                
                setExistingPrices(updatedPrices);
                setValue("price", latestPrice.toString());
                setPreviewImage("");
                navigate("/dashboard/myProducts");
            } else {
                toast.info("No changes made.");
            }
        } catch (err) {
            console.error("Error updating product", err);
            toast.error("Failed to update product.");
        }
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl flex justify-center items-center font-bold mb-6 gap-2">
                <FaEdit />
                Update Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Vendor Info */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Vendor Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label>Email (read-only)</label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="w-full mt-1 border border-gray-300 p-2 rounded"
                            />
                        </div>
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

                {/* market info */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Market Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div>
                            <label>Date</label> <br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                                minDate={creationDate}
                                maxDate={new Date()}
                                className="mt-1 w-full border border-gray-300 p-2 rounded"
                                excludeDates={existingPrices.map(
                                    (p) => new Date(p.date)
                                )}
                            />
                        </div>

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

                        <div>
                            <label>Status</label>
                            <select
                                {...register("status")}
                                defaultValue="pending"
                                className="w-full mt-1 border border-gray-300 p-2 rounded bg-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label>Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-1 w-full border border-gray-300 p-2 rounded"
                            />
                            {uploading && (
                                <p className="text-blue-600 text-sm mt-1">
                                    Uploading...
                                </p>
                            )}
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

                        <div>
                            <label>Price per Unit (৳)</label>
                            <input
                                type="number"
                                step="0.1"
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

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
