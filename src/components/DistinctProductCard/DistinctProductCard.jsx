import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const DistinctProductCard = ({ product }) => {
    // console.log(product);

    return (
        <motion.div
            initial={{ borderColor: "#d1d5db" }}
            animate={{ borderColor: ["#d1d5db", "#6b7280", "#d1d5db"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="card bg-base-100 shadow-xl rounded-xl overflow-hidden flex flex-col border-2"
        >
            <figure className="w-full h-56 overflow-hidden">
                <img
                    src={product.productImage}
                    alt={`Image of ${product.productName}`}
                    className="w-64 object-cover transition-transform duration-300 hover:scale-105"
                />
            </figure>
            <div className="card-body flex flex-col flex-grow p-6">
                <h3 className="text-2xl font-extrabold mb-1 leading-tight text-gray-900">
                    {product.itemName}
                </h3>
                <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                    {product.marketName}
                </h2>
                <p className="text-md text-gray-600 flex gap-2">
                    <span>Date:</span>
                    <span className="font-medium">
                        {new Date(product.date).toLocaleDateString()}
                    </span>
                </p>
                <p className="text-md text-gray-700 font-semibold">
                    Current Price: ${product.price}
                </p>

                <div className="flex flex-col  mb-4 max-h-28 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                    {product.prices.map((priceObj, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between text-sm text-gray-700 font-medium"
                        >
                            <span>
                                {new Date(priceObj.date).toLocaleDateString()}
                            </span>
                            <span>${priceObj.price}</span>
                        </div>
                    ))}
                </div>

                <Link to={`/products/details/${product._id}`}>
                    <button className="btn mt-auto self-start px-6 py-2 text-lg font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-blue-600 text-white">
                        View Details
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default DistinctProductCard;
