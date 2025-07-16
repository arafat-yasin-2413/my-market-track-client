import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FaUser } from "react-icons/fa";

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
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
                <FaUser /> All Users
            </h2>

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
                                <td className="px-6 py-4 capitalize">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
