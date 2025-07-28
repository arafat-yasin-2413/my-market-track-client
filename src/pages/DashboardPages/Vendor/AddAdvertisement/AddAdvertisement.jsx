import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddAdvertisement = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const vendorEmail = user?.email;

    useEffect(()=>{
        if(vendorEmail) {
            setValue("email", vendorEmail);
        }
    },[vendorEmail, setValue]);

    // All logic moved inside this function
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_upload_key
        }`;

        try {
            setUploading(true);
            const res = await axios.post(imageUploadUrl, formData);
            const imageUrl = res.data.data.url;

            // Set uploaded URL to form field
            setValue("image", imageUrl);
            // Set preview
            setImagePreview(imageUrl);
            setUploading(false);
        } catch (error) {
            setUploading(false);
            toast.error("Image upload failed!");
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const adData = {
                title: data.title,
                description: data.description,
                image: data.image,
                email: user?.email,
                status: "pending",
                createdAt: new Date().toISOString(),

            };

            const res = await axiosSecure.post("/addAdvertisement", adData);

            if (res.data.insertedId) {
                toast.success("Advertisement added successfully!");
                reset();
                setImagePreview(null);
                navigate("/dashboard/myAdvertisements")
            } else {
                toast.error("Failed to add advertisement");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Advertisement</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Ad Title */}
                <div>
                    <label className="block font-medium mb-1">Ad Title</label>
                    <input
                        type="text"
                        {...register("title", {
                            required: "Ad title is required",
                        })}
                        className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <label className="block font-medium mb-1">
                        Short Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                        })}
                        className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                        rows={3}
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Email (Read Only) */}
                <div>
                    <label className="block font-medium mb-1">Your Email</label>
                    <input
                        type="email"
                        readOnly
                        {...register("email", {required: true })}
                        className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                    />

                    {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}

                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                    />
                    {/* required validation manually for image URL */}
                    {!imagePreview && errors.image && (
                        <p className="text-red-500 text-sm">
                            {errors.image.message}
                        </p>
                    )}
                    {/* manually register image field with required rule */}
                    <input
                        type="hidden"
                        {...register("image", {
                            required: "Image is required",
                        })}
                    />

                    {/* Image Preview */}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-3 h-40 rounded border object-cover"
                        />
                    )}
                </div>


                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {uploading ? "Uploading..." : "Submit Advertisement"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdvertisement;
