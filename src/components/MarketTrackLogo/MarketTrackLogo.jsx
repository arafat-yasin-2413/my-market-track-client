import React from "react";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const MarketTrackLogo = () => {
    return (
        <Link to='/'>
            <div>
                <p className="flex justify-center items-center gap-0.5 text-2xl font-extrabold">
                    <FaChartLine className="text-blue-600"></FaChartLine>
                    Market<span className="text-blue-600">Track</span>
                </p>
            </div>
        </Link>
    );
};

export default MarketTrackLogo;
