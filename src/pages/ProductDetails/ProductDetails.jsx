import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { TbCurrencyTaka, TbListDetails } from "react-icons/tb";
import AddToWatchlist from "../../components/AddToWatchlist/AddToWatchlist";
import useUserRole from "../../hooks/useUserRole";
import ReviewAndComment from "../../components/ReviewAndComment/ReviewAndComment";
import ProductPriceChart from "../../components/ProductPriceChart/ProductPriceChart";

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
        <div className="w-full mx-auto my-10 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">

                    <h2 className="text-center mb-6 text-3xl md:text-4xl xl:text-5xl font-semibold flex justify-center items-center gap-2">
                        <span><TbListDetails></TbListDetails></span>
                        Product Details
                    </h2>

                    <div className="border border-b border-gray-300 mb-6">

                    </div>

                    <div className="">
                        <img
                            src={productImage}
                            alt={itemName}
                            className="w-full max-w-sm rounded-md shadow-md border border-gray-100"
                        />
                    </div>

                    <div className="flex-1 text-gray-800">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                            {itemName}
                        </h2>

                        <div className="flex items-center">
                            <h3 className="text-base font-medium text-gray-800">
                                Current Price:
                            </h3>
                            <p className="text-2xl text-blue-600 font-bold flex items-center">
                                <TbCurrencyTaka className="" />
                                {selectedPrice}{" "}
                                <span className="ml-2 text-base text-black">
                                    per KG
                                </span>
                            </p>
                        </div>

                        {/* date of updated price */}
                        <div className="bg-base-300 w-fit px-1 rounded border border-blue-200">
                            <p className="text-base font-medium">
                                Date: <span>{date}</span>
                            </p>
                        </div>

                        {prices.length > 1 && (
                            <div className="mt-6">
                                <h3 className="text-base font-semibold text-gray-700 mb-2">
                                    Previous Prices
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-gray-700">
                                    {prices
                                        .filter((p) => p.date !== date)
                                        .map((p, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <h4>
                                                    <span className="font-semibold">
                                                        {p.date}:
                                                    </span>{" "}
                                                </h4>
                                                <h4 className="text-blue-500 font-semibold">
                                                    <TbCurrencyTaka className="inline-block" />
                                                    {p.price}
                                                </h4>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}

                        <div className="space-y-4 mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Market:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-blue-700">
                                    {marketName}
                                </span>
                            </p>
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Market Details:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-gray-700">
                                    {marketDescription}
                                </span>
                            </p>
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Item Description:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-gray-700">
                                    {itemDescription}
                                </span>
                            </p>
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Vendor:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-blue-700">
                                    {name}
                                </span>
                            </p>
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Vendor Email:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-gray-600">
                                    {email}
                                </span>
                            </p>
                            <p>
                                <span className="text-base md:text-xl font-semibold text-gray-800">
                                    Status:
                                </span>{" "}
                                <span className="text-base md:text-xl tracking-wide font-medium text-black capitalize bg-blue-200 px-2 py-0.5 rounded">
                                    {status}
                                </span>
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                            {/* Add to Watchlist */}
                            <AddToWatchlist
                                product={product}
                                className="btn bg-blue-100 text-blue-800 hover:bg-blue-200 border-none rounded-full font-semibold px-5 py-2 transition"
                            />

                            {/* Buy Product */}
                            <Link to={`/dashboard/payment/${product._id}`}>
                                <button
                                    className={`px-5 py-2 btn rounded-full font-semibold text-xl transition duration-200 ${
                                        isDisabled
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-white hover:bg-gray-900 hover:text-white text-black"
                                    }`}
                                >
                                    Buy Product
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full flex-1 lg:w-[400px]">
                    <ProductPriceChart
                        prices={product?.prices}
                    ></ProductPriceChart>
                </div>
            </div>

            <div className="border border-b border-gray-300 my-10"></div>

            <ReviewAndComment product={product}></ReviewAndComment>
        </div>
    );
};

export default ProductDetails;
