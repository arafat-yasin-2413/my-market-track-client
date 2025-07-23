import React from "react";
import { FaPlus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductCard = ({ product }) => {
    console.log(product);

    const { date, itemName, marketName, price, productImage } = product || {};

    return (
        <div className="card flex flex-col justify-center items-center border border-gray-200 shadow-md">
            <img
                className="w-48"
                src={productImage}
                alt={`image of ${itemName}`}
            />

            <h4 className="mt-2 mb-6 font-semibold text-[1.2rem]">
                {itemName}
            </h4>

            <h5 className="flex justify-center items-center my-2">
                <span className="flex justify-center items-center mr-1 text-red-500 font-bold text-[1.4rem]">
                    {" "}
                    <TbCurrencyTaka></TbCurrencyTaka> {price}
                </span>
                per KG
            </h5>
            <p className="flex flex-col justify-center items-center">
                <h5 className="bg-gray-300 rounded p-0.5 mb-1">{date}</h5>
                <h5 className="bg-gray-400 text-white rounded p-1 mb-2">{marketName}</h5>
            </p>
            <button className="btn bg-red-600 text-white rounded-full mb-8">
                <FaPlus></FaPlus> Add to Bag
            </button>
        </div>
    );
};

export default ProductCard;
