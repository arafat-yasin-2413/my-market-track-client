import React from "react";
import { FaChartLine } from "react-icons/fa";

const MarketTrackLogo = () => {
    return (
        <div>
            <p className="flex justify-center items-center gap-0.5 text-2xl font-extrabold">
                <FaChartLine className="text-blue-600"></FaChartLine>
                Market<span className="text-blue-600">Track</span>
            </p>
        </div>
    );
};

export default MarketTrackLogo;
