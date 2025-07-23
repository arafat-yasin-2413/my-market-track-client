import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // const location = useLocation();
    // const product = location.state?.product;
    // const navigate = useNavigate();
    // console.log(product);

    const {
        data: product = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
    });

    const {
        _id,
        email,
        date,
        itemDescription,
        itemName,
        marketDescription,
        marketName,
        name,
        price,
        status,
        productImage,
    } = product || {};

    // const handlePay = (id) => {
    //     navigate(`/dashboard/payment/${id}`)
    // }

    if (isLoading) return LoadingSpinner;
    if (isError) return toast.error(error.message);

    return (
        <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="flex justify-center items-center">
                    <img
                        src={productImage}
                        alt={itemName}
                        className="w-full max-w-sm rounded-lg shadow-md "
                    />
                </div>

             
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {itemName}
                    </h2>
                    <p className="text-xl flex  mb-4">
                        <span className="flex items-center text-red-600 mr-2 font-bold"><TbCurrencyTaka></TbCurrencyTaka> {price}</span> per KG
                    </p>

                    <div className="space-y-3 text-gray-700 text-base leading-relaxed">
                        <p>
                            <span className="font-semibold text-gray-800">
                                Date:
                            </span>{" "}
                            {date}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Market Name:
                            </span>{" "}
                            {marketName}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Vendor:
                            </span>{" "}
                            {name}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Vendor Email:
                            </span>{" "}
                            {email}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Status:
                            </span>{" "}
                            {status}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Market Description:
                            </span>
                            <br /> {marketDescription}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">
                                Item Description:
                            </span>
                            <br /> {itemDescription}
                        </p>
                    </div>

              
                    <div className="mt-6">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200">
                            Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
