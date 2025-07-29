import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import DistinctProductCard from "../DistinctProductCard/DistinctProductCard";

const ProductSection = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: allProduct = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/distinctProducts");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return (
            <div className="text-center text-red-600">
                Error loading products: {error.message}
            </div>
        );
    }



    console.log(allProduct);

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-5xl font-bold mb-6 text-center">Products Section</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProduct.map((product) => (
                    <DistinctProductCard key={product._id} product={product}>
                        
                    </DistinctProductCard>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
