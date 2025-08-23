import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import TitleAllProduct from "../TitleAllProduct/TitleAllProduct";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Container from "../Container/Container";
import MainTitle from "../MainTitle/MainTitle";

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
        // console.log('sort type: ', type);
        setActiveSort(type.toLowerCase().trim());
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
            return toast.error(
                "Failed to filter products by date.",
                errorMessage
            );
        }
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (isError) return toast.error(error.message);

    return (
        <>
            <Container>
                <MainTitle text={"All Products"}></MainTitle>
                <TitleAllProduct />

                <div className="md:flex items-center justify-between mt-10">
                    {/* sort by price */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-base md:text-xl font-bold">
                            Sort by:
                        </p>
                        <button
                            onClick={() => handleSort("low")}
                            className={`btn font-bold  rounded-md border-gray-300 ${
                                activeSort === "low"
                                    ? "bg-accent text-white"
                                    : "bg-white hover:bg-accent/80"
                            }`}
                        >
                            Price Low to High
                        </button>
                        <button
                            onClick={() => handleSort("high")}
                            className={`btn font-bold rounded-md border-gray-300 ${
                                activeSort === "high"
                                    ? "bg-accent text-white"
                                    : "bg-white hover:bg-accent/80"
                            }`}
                        >
                            Price High to Low
                        </button>
                    </div>

                    {/* sort by date range */}
                    <div className="flex items-center gap-2 flex-wrap mt-4 md:mt-0">
                        <div>
                            <label className="text-base md:text-xl font-bold">
                                Start:
                            </label>{" "}
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Start Date"
                                className="border border-gray-300 p-1 rounded"
                            />
                        </div>

                        <div>
                            <label className="text-base md:text-xl font-bold">
                                End:
                            </label>{" "}
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="End Date"
                                className="border border-gray-300 p-1 rounded"
                            />
                        </div>

                        <button
                            onClick={handleDateFilter}
                            className="btn bg-accent hover:bg-accent/90 font-bold text-base tracking-widest text-white  rounded-md px-2 md:px-4 md:py-2"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                {/* showing all products */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
                    {Array.isArray(displayProducts) &&
                    displayProducts.length > 0 ? (
                        displayProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            ></ProductCard>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No products found for selected date.
                        </p>
                    )}
                </div>
            </Container>
        </>
    );
};

export default AllProduct;
