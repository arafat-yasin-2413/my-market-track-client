import React from "react";
import Marquee from "react-fast-marquee";
import { FaBullhorn, FaBullseye, FaChartLine, FaHeart, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";

const MarqueeText = () => {
  return (
    <div className="bg-primary text-white tracking-wider py-2">
      <Marquee gradient={false} speed={50}>
        <span className="mx-6 flex items-center gap-2">
          <FaChartLine /> Track real-time prices
        </span>
        <span className="mx-6 flex items-center gap-2">
          <FaShoppingCart /> Compare vendors easily
        </span>
        <span className="mx-6 flex items-center gap-2">
          <FaHeart /> Manage your watchlist
        </span>
        <span className="mx-6 flex items-center gap-2">
          <FaBullhorn /> Discover top-selling products
        </span>
        <span className="mx-6 flex items-center gap-2">
            <FaBullseye />
          Monitor advertisements & stay updated with trends
        </span>
        <span className="mx-6 flex items-center gap-2">
            <FaMoneyBillWave />
          Shop smart, save money, and never miss best deals!
        </span>
      </Marquee>
    </div>
  );
};

export default MarqueeText;
