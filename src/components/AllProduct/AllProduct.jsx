import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import TitleAllProduct from "../TitleAllProduct/TitleAllProduct";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
    } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/approvedProducts");
            return res.data;
        },
    });

    useEffect(() => {
        if (allProduct.length > 0) {
            setDisplayProducts(allProduct);
        }
    }, [allProduct]);

    const handleSort = async (type) => {
        setActiveSort(type);
        try {
            const res = await axiosSecure.get(`/products/sort/${type}`);
            setDisplayProducts(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDateFilter = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }

        const formatDate = (dateObj) => {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const start = formatDate(startDate);
        const end = formatDate(endDate);

        try {
            const res = await axiosSecure.get("/products/sort/dateBy", {
                params: {
                    startDate: start,
                    endDate: end,
                },
            });

            if (res.data.length === 0) {
                toast.info("No products found within selected date range.");
            }

            setDisplayProducts(res.data);
            setActiveSort("");
        } catch (error) {
            const errorMessage = error.message;
            return toast.error("Failed to filter products by date.",errorMessage);
        }
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (isError) return toast.error(error.message);

    return (
        <>
            <TitleAllProduct />

            <div className="md:flex items-center justify-between p-4">
                {/* sort by price */}
                <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-xl font-bold">Sort by:</p>
                    <button
                        onClick={() => handleSort("low")}
                        className={`btn rounded-md border-gray-300 ${
                            activeSort === "low"
                                ? "bg-yellow-400"
                                : "bg-white hover:bg-yellow-400"
                        }`}
                    >
                        Price Low to High
                    </button>
                    <button
                        onClick={() => handleSort("high")}
                        className={`btn rounded-md border-gray-300 ${
                            activeSort === "high"
                                ? "bg-yellow-400"
                                : "bg-white hover:bg-yellow-400"
                        }`}
                    >
                        Price High to Low
                    </button>
                </div>

                {/* sort by date range */}
                <div className="flex items-center gap-2 flex-wrap mt-4 md:mt-0">
                    <label className="text-xl font-bold">Start:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                        className="border border-gray-300 p-1 rounded"
                    />
                    <label className="text-xl font-bold">End:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                        className="border border-gray-300 p-1 rounded"
                    />
                    <button
                        onClick={handleDateFilter}
                        className="btn bg-green-400 rounded-md px-4 py-2"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* showing all products */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.isArray(displayProducts) && displayProducts.length > 0 ? (
                    displayProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found for selected date.
                    </p>
                )}
            </div>
        </>
    );
};

export default AllProduct;
