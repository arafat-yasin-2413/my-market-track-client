import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import DistinctProductCard from "../DistinctProductCard/DistinctProductCard";
import { motion } from "motion/react";
import Container from "../Container/Container";

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

    // console.log(allProduct);

    return (
        <Container>
            <div className="">
                <motion.h2
                    className="text-white text-center my-6 text-4xl md:text-5xl lg:text-8xl  font-bold drop-shadow-lg"
                    animate={{
                        textShadow: [
                            "0px 0px 0px #22c55e",
                            "0px 0px 10px #22c55e",
                            "0px 0px 0px #22c55e",
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span>Top</span> <span>Products</span>
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProduct.map((product) => (
                        <DistinctProductCard
                            key={product._id}
                            product={product}
                        ></DistinctProductCard>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductSection;
