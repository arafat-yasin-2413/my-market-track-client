import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import TitleAllProduct from "../TitleAllProduct/TitleAllProduct";
import DatePicker from "react-datepicker";

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [activeSort, setActiveSort] = useState("");
    const [displayProducts, setDisplayProducts] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        data: allProduct = [],
        isLoading,
        isError,
        error,
        // refetch,
    } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allProduct");
            // console.log(res.data);
            return res.data;
        },
    });

    // console.log(allProduct);

    const handleSort = async (type) => {
        setActiveSort(type);

        try {
            const res = await axiosSecure.get(`/products/sort/${type}`);
            setDisplayProducts(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };


    useEffect(() => {
        if (allProduct.length > 0) {
            setDisplayProducts(allProduct);
        }
    }, [allProduct]);

    if (isLoading) return LoadingSpinner;
    if (isError) return toast.error(error.message);

    return (
        <>
            <TitleAllProduct></TitleAllProduct>

            <div className="md:flex items-center">
                {/* sort by price */}
                <div className="p-4 flex items-center gap-4">
                    <p>
                        <span className="text-xl font-bold">Sort by:</span>
                    </p>

                    <p className="flex gap-2">
                        <button
                            onClick={() => handleSort("low")}
                            className={`btn rounded-md bg-white border-gray-300 hover:bg-yellow-400 ${
                                activeSort === "low"
                                    ? "bg-yellow-400"
                                    : "bg-white hover:bg-yellow-400"
                            }`}
                        >
                            Price Low to High
                        </button>
                        <button
                            onClick={() => handleSort("high")}
                            className={`btn rounded-md bg-white border-gray-300 hover:bg-yellow-400 ${
                                activeSort === "high"
                                    ? "bg-yellow-400"
                                    : "bg-white hover:bg-yellow-400"
                            }`}
                        >
                            Price High to Low
                        </button>
                    </p>
                </div>

                {/* sort by date range */}
                <div className="flex items-center gap-2">
                    <label className="text-xl font-bold">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                        className="border border-gray-300 p-1 rounded"
                    />
                    <label className="text-xl font-bold">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                        className="border border-gray-300 p-1 rounded"
                    />
                    <button
                        className="btn bg-green-400 rounded-md px-4 py-2"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* showing all products */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.isArray(displayProducts) &&
                displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found.
                    </p>
                )}
            </div>

        </>
    );
};

export default AllProduct;
