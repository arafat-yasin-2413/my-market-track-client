import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FaUsers } from "react-icons/fa";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ["allUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return (
            <div className="text-center p-10 text-red-600">
                Error loading users.
            </div>
        );
    }

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
                <FaUsers /> All Users
            </h2>

            {
                users.length === 0 ? (<p className="text-center text-gray-500">
                    No User found.
                </p>) : (
<div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-xl">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">SL</th>
                            <th className="px-6 py-3">Photo</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-700">
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize font-semibold">
                                    <span className="bg-blue-500 text-white rounded-full px-2 py-0.5">{user.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleTimeString([], {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                )
            }

            
        </div>
    );
};

export default AllUser;
