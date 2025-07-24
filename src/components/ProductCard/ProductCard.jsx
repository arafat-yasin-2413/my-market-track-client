import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const { _id, date, itemName, marketName, price, productImage, name } = product || {};

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col">
            
            <Link to={`/products/details/${_id}`}>
                <img
                    src={productImage}
                    alt={`image of ${itemName}`}
                    className="w-60 object-cover p-2 hover:scale-[1.05] transition-transform duration-300 ease-in-out"
                />
            </Link>

           
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{itemName}</h2>

                <div className="flex items-center text-red-600 text-[1rem] font-bold mb-2">
                    <span className="flex justify-center items-center text-[1.4rem]"><TbCurrencyTaka className="text-xl"></TbCurrencyTaka>{price}</span>
                    <span className="ml-1 text-gray-600 text-sm font-medium">/KG</span>
                
                    <Link to={`/products/details/${_id}`} className="ml-6 text-black flex items-center gap-2 bg-sky-100 px-2 py-0.5 rounded cursor-pointer hover:bg-black hover:text-white">
                        <FaEye></FaEye> View Details
                    </Link>

                </div>

                <div className="text-sm text-gray-500 mb-1 font-medium">
                    <span className="inline-block bg-gray-200 px-2 py-0.5 rounded-full mr-2">
                        {date}
                    </span>
                    <span className="inline-block bg-gray-400 text-white px-2 py-0.5 rounded-full">
                        {marketName}
                    </span>
                </div>

                <p className="text-sm text-gray-700 mt-1">Vendor: <span className="font-medium">{name}</span></p>

               
                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 mt-4"
                >
                    <FaPlus /> Add to Bag
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
