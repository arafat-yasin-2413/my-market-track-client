import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
    const { _id, date, itemName, marketName, price, productImage, name } =
        product || {};

    return (
        <motion.div
            initial={{ borderColor: "#d1d5db" }}
            animate={{ borderColor: ["#d1d5db", "#6b7280", "#d1d5db"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 flex flex-col"
        >
            <Link to={`/products/details/${_id}`}>
                <img
                    src={productImage}
                    alt={`image of ${itemName}`}
                    className="w-60 h-50 object-cover p-2 hover:scale-[1.05] transition-transform duration-300 ease-in-out"
                />
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {itemName}
                </h2>

                <div className="flex items-center text-blue-600 text-[1rem] font-bold mb-2">
                    <span className="flex justify-center items-center text-[1.4rem]">
                        <TbCurrencyTaka className="text-xl"></TbCurrencyTaka>
                        {price}
                    </span>
                    <span className="ml-1 text-gray-600 text-base font-semibold">
                        /KG
                    </span>

                    
                </div>

                <div className="text-sm text-gray-500 mb-1 font-medium">
                    <span className="inline-block bg-white font-semibold px-2 py-0.5 rounded-full mr-2 outline outline-blue-500">
                        {date}
                    </span>
                    <span className="inline-block bg-blue-200 text-black font-semibold px-2 py-0.5 rounded-full outline outline-blue-500">
                        {marketName}
                    </span>
                </div>

                <p className="text-base font-semibold text-gray-700 mt-1">
                    Vendor: <span className="font-bold text-blue-500">{name}</span>
                </p>

                <Link to={`/products/details/${_id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 mt-4">
                    <FaEye /> View Details
                </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
