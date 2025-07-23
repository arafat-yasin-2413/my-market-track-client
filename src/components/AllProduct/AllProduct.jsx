import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import TitleAllProduct from "../TitleAllProduct/TitleAllProduct";

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [activeSort, setActiveSort] = useState("");
    const [displayProducts, setDisplayProducts] = useState([]);

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

    useEffect(()=>{
        if(allProduct.length > 0) {
            setDisplayProducts(allProduct);
        }
    },[allProduct]);

    const handleSort = async (type)=>{
        setActiveSort(type);

        try{
            const res = await axiosSecure.get(`/products/sort/${type}`);
            setDisplayProducts(res.data);
        }
        catch(error){
            toast.error(error.message);
        }
    }

    if (isLoading) return LoadingSpinner;
    if (isError) return toast.error(error.message);

    return (
        <>
            <TitleAllProduct></TitleAllProduct>

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

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.isArray(displayProducts) && displayProducts.length > 0 ? (
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
