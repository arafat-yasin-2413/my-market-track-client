import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";


const ViewPriceTrends = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedItem, setSelectedItem] = useState(null);

    // Query to fetch user's watchlist
    const {
        data: watchlist = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["watchlist", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/myWatchlist?email=${user?.email}`
            );
            return res.data || [];
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (watchlist.length > 0) {
            setSelectedItem(watchlist[0]);
        }
    }, [watchlist]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const calculateTrend = (prices = []) => {
        if (prices.length < 2) return 0;
        const first = prices[0].price;
        const last = prices[prices.length - 1].price;
        const trend = (((last - first) / first) * 100).toFixed(1);
        return trend;
    };

    if (isLoading)
        return <div className="p-6 text-center">Loading watchlist...</div>;
    if (isError)
        return (
            <div className="p-6 text-center text-red-600">
                Failed to load data.
            </div>
        );

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full p-4">
            {watchlist.length === 0 ? (
                <div className="text-center w-full py-10 bg-gray-100 rounded-md">
                    <p className="text-xl font-semibold">
                        No items in your watchlist.
                    </p>
                    <p className="mt-2">
                        Go to <span><Link to="/allProduct" className="btn bg-blue-200">All Product</Link></span> to add items.
                    </p>
                </div>
            ) : (
                <>
                    {/* Left Side: Watchlist Items */}
                    <div className="w-full md:w-1/4 bg-gray-50 border rounded-md p-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Tracked Items
                        </h3>
                        <ul className="space-y-2">
                            {watchlist.map((item) => (
                                <li
                                    key={item._id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`cursor-pointer px-3 py-2 rounded-md ${
                                        selectedItem?._id === item._id
                                            ? "bg-orange-100 font-bold"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={item?.product?.productImage} className="w-12 rounded" alt="" />
                                        {item.product.itemName}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side: Chart */}
                    <div className="w-full md:w-3/4 bg-white border rounded-md p-4">
                        <p className="text-xl flex items-center gap-2 font-semibold mb-1">
                            <img src={selectedItem?.product?.productImage} className="w-8" alt="" />
                            <h4>{selectedItem?.product.itemName}</h4>
                        </p>
                        <p className="text-sm text-gray-500">
                            Vendor: {selectedItem?.product.name || "Unknown"}
                        </p>

                        {/* Chart */}
                        <LineChart
                            width={600}
                            height={300}
                            data={selectedItem?.product?.prices || []}
                            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                                angle={-45}
                                textAnchor="end"
                                height={70}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`Price – ${value}`, ""]}
                                labelFormatter={(label) =>
                                    `Date: ${formatDate(label)}`
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>

                        {/* Trend */}
                        <div className="text-sm mt-2">
                            Trend:{" "}
                            <span className="text-green-600 font-semibold">
                                +{calculateTrend(selectedItem?.product.prices)}% last 7
                                days
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewPriceTrends;
