import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import { motion } from "motion/react";

import bg1 from "/assets/backgrounds/veg-bg1.jpg";

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: allProduct = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allProduct");
            // console.log(res.data);
            return res.data;
        },
    });

    // console.log(allProduct);

    if (isLoading) return LoadingSpinner;
    if (isError) return toast.error(error.message);

    return (
        <>
            <div className="relative w-full h-64 rounded-3xl overflow-hidden p-4">
                <img
                    src={bg1}
                    alt="Fresh Vegetables"
                    className="w-full h-full object-cover rounded-3xl opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h2
                        className="text-white text-8xl font-bold drop-shadow-lg"
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
                        <span className="text-green-500">Fresh</span> From{" "}
                        <span className="text-green-500">Farm</span>
                    </motion.h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {allProduct.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
};

export default AllProduct;
