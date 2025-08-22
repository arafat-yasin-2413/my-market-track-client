import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const MarketTrackLogo = () => {
    return (
        <Link to='/'>
            <div>
                <p className="flex justify-center items-center gap-0.5 text-xl ml-2 font-extrabold">
                    {/* <FaChartLine className="text-blue-600"></FaChartLine> */}
                <Icon icon="fa-solid:chart-line" width="24" height="24" className="text-accent" /><span className="text-white">Market Track</span>
                </p>
            </div>
        </Link>
    );
};

export default MarketTrackLogo;
