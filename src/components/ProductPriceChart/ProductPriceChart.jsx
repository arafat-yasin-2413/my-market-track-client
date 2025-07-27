import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";

const ProductPriceChart = ({ prices }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => date?.toLocaleDateString("sv-SE");

    const displayDate = (dateStr) => {
        const [y, m, d] = dateStr.split("-");

        const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct","Nov","Dec"];
        const monthName = months[parseInt(m, 10)-1];
        return`${parseInt(d, 10)} ${monthName}`;
    };

    const availableDates = prices.map((p) => new Date(p.date));
    const sortedPrices = [...prices].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const startISO = formatDate(startDate);
    const endISO = formatDate(endDate);

    const startData = prices.find((p) => p.date === startISO);
    const endData = prices.find((p) => p.date === endISO);
    const priceDiff =
        startData && endData ? endData.price - startData.price : null;

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
    };

    // Mark highlight range
    const enrichedPrices = sortedPrices.map((p) => ({
        ...p,
        isHighlighted:
            startISO && endISO ? p.date >= startISO && p.date <= endISO : false,
    }));

    return (
        <div className="bg-white shadow-xl border border-gray-200 rounded-xl p-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📊 Price Trend
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Start Date
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        includeDates={availableDates}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select start date"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                        End Date
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        includeDates={availableDates}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select end date"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                {startData && endData && (
                    <div
                        className={`p-3 rounded-lg text-sm font-semibold ${
                            priceDiff > 0
                                ? "bg-red-100 text-red-700"
                                : priceDiff < 0
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        From <strong>{displayDate(startData.date)}</strong> to{" "}
                        <strong>{displayDate(endData.date)}</strong>, price{" "}
                        {priceDiff === 0
                            ? "remained the same"
                            : priceDiff > 0
                            ? `increased by ৳${priceDiff}`
                            : `decreased by ৳${Math.abs(priceDiff)}`}
                        .
                    </div>
                )}
                <button
                    onClick={handleReset}
                    className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                    Reset
                </button>
            </div>

            <div className="w-full h-[300px] overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrichedPrices} className="p-4">
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={displayDate}
                            // angle={-45}
                            textAnchor="middle"
                            height={70}
                            interval={0}
                            tick={{ fontSize: 14 }}
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [`৳${value}`, "Price"]}
                            labelFormatter={(label) =>
                                `Date: ${displayDate(label)}`
                            }
                            labelStyle={{ fontWeight: "bold" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={(props) =>
                                props.payload.isHighlighted ? (
                                    <circle
                                        cx={props.cx}
                                        cy={props.cy}
                                        r={6}
                                        fill={
                                            priceDiff > 0
                                                ? "#dc2626"
                                                : priceDiff < 0
                                                ? "#16a34a"
                                                : "#6b7280"
                                        }
                                        stroke="none"
                                    />
                                ) : (
                                    <circle
                                        cx={props.cx}
                                        cy={props.cy}
                                        r={4}
                                        fill="#9333ea"
                                        stroke="none"
                                    />
                                )
                            }
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProductPriceChart;
