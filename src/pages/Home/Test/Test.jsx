import React from "react";
import banner4 from "/assets/banner/banner-4.jpg";
import Banner from "../Banner/Banner";

const Test = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 py-4">
            {/* ✅ div1 - Top Left */}
            <div className="bg-green-300 h-[200px] md:h-[246px]">
                <Banner />
            </div>

            {/* ✅ div3 - Big Middle Image (span 2 rows) */}
            <div className="md:row-span-2 bg-red-300 h-[250px] md:h-[500px] overflow-hidden rounded">
                <img
                    src={banner4}
                    alt="Main Banner"
                    className="w-full h-[600px] object-cover"
                />
            </div>

            {/* ✅ div4 - Top Right */}
            <div className="bg-amber-300 h-[200px] md:h-[246px]">
                <Banner />
            </div>

            {/* ✅ div2 - Bottom Left */}
            <div className="bg-blue-300 h-[200px] md:h-[246px]">
                <Banner />
            </div>

            {/* ✅ div5 - Bottom Right */}
            <div className="bg-teal-300 h-[200px] md:h-[246px]">
                <Banner />
            </div>
        </div>
    );
};

export default Test;
