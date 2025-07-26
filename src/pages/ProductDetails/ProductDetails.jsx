import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";
import AddToWatchlist from "../../components/AddToWatchlist/AddToWatchlist";
import useUserRole from "../../hooks/useUserRole";
import ReviewAndComment from "../../components/ReviewAndComment/ReviewAndComment";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { role } = useUserRole();

    // console.log('role: ', role);
 


    const {
        data: product = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            // console.log('product details page: ', res.data);

            return res.data;
        },
    });

    // console.log('product after query : ', product);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return toast.error(error.message);

    const {
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
        prices = [],
    } = product || {};

    const selectedPriceObj = prices.find((p) => p.date === date);
    const selectedPrice = selectedPriceObj?.price ?? price;


    const isDisabled = role === "admin" || role === "vendor";
  

    return (
        <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex justify-center">
                    <img
                        src={productImage}
                        alt={itemName}
                        className="w-full max-w-sm rounded-md shadow-md"
                    />
                </div>

                <div className="flex-1 space-y-4 text-gray-800">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {itemName}
                    </h2>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Current Price
                        </h3>
                        <p className="text-2xl text-red-600 font-bold flex items-center">
                            <TbCurrencyTaka className="mr-1" />
                            {selectedPrice}{" "}
                            <span className="ml-2 text-base text-gray-500">
                                per KG
                            </span>
                        </p>
                    </div>

                    {prices.length > 1 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Previous Prices
                            </h3>
                            <ul className="space-y-2 list-disc list-inside text-gray-700">
                                {prices
                                    .filter((p) => p.date !== date)
                                    .map((p, index) => (
                                        <li key={index}>
                                            <span className="font-medium">
                                                {p.date}:
                                            </span>{" "}
                                            <TbCurrencyTaka className="inline-block mr-1" />
                                            {p.price}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    <div className="space-y-1 text-sm">
                        <p>
                            <span className="font-medium text-gray-700">
                                Date:
                            </span>{" "}
                            {date}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Market:
                            </span>{" "}
                            {marketName}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Market Details:
                            </span>{" "}
                            {marketDescription}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Item Description:
                            </span>{" "}
                            {itemDescription}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Vendor:
                            </span>{" "}
                            {name}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Vendor Email:
                            </span>{" "}
                            {email}
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">
                                Status:
                            </span>{" "}
                            {status}
                        </p>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <AddToWatchlist product={product}></AddToWatchlist>

                        <Link to={`/dashboard/payment/${product._id}`}>
                            <button
                                className={`px-5 py-2 btn rounded-full font-semibold transition duration-200 ${isDisabled ? "bg-green-200 cursor-not-allowed text-gray-700" : "bg-green-600 hover:bg-green-500 text-white"}`}
                            >
                                Buy Product
                            </button>
                        </Link>
                    </div>
                </div>
            </div>







            <ReviewAndComment product={product}></ReviewAndComment>

        </div>
    );
};

export default ProductDetails;
