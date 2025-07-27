import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const modalRef = useRef(null);

    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const allRoles = ["admin", "vendor", "user"];

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

    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ userId, role }) => {
            const res = await axiosSecure.patch(`/users/role/${userId}`, {
                newRole: role,
            });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0 || data.success) {
                toast.success("Role updated successfully");
                queryClient.invalidateQueries(["allUser"]);
            } else {
                toast.info("No changes were made.");
            }

            // Close modal & reset states
            setSelectedUser(null);
            setNewRole("");
            modalRef.current?.close();
        },
        onError: () => {
            toast.error("Failed to update role");
        },
    });

    const getRoleWiseColors = (role) => {
        switch (role) {
            case "admin":
                return "bg-red-500";
            case "vendor":
                return "bg-green-500";
            case "user":
                return "bg-blue-500";
            default:
                return "bg-gray-400";
        }
    };

    if (isPending) return <LoadingSpinner />;
    if (isError)
        return (
            <div className="text-center p-10 text-red-600">
                Error loading users.
            </div>
        );

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
                <FaUsers /> All Users
            </h2>

            {users.length === 0 ? (
                <p className="text-center text-gray-500">No User found.</p>
            ) : (
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
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
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
                                        <span
                                            className={`${getRoleWiseColors(
                                                user.role
                                            )} text-white rounded-full px-2 py-0.5`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setNewRole("");
                                                modalRef.current?.showModal();
                                            }}
                                            className="btn btn-sm bg-blue-700 rounded-full text-white"
                                        >
                                            Change Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* DaisyUI Modal */}
                    <dialog ref={modalRef} className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">
                                Change Role for {selectedUser?.name}
                            </h3>

                            <select
                                className="select select-bordered w-full mb-4"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a new role
                                </option>
                                {allRoles
                                    .filter(
                                        (role) => role !== selectedUser?.role
                                    )
                                    .map((role) => (
                                        <option key={role} value={role}>
                                            {role.charAt(0).toUpperCase() +
                                                role.slice(1)}
                                        </option>
                                    ))}
                            </select>

                            <div className="modal-action">
                                <button
                                    className="btn btn-primary"
                                    disabled={!newRole}
                                    onClick={() =>
                                        updateRole({
                                            userId: selectedUser._id,
                                            role: newRole,
                                        })
                                    }
                                >
                                    OK
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setNewRole("");
                                        modalRef.current?.close();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
};

export default AllUser;
