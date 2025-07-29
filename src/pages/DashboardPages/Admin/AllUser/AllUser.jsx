import React, { useEffect, useRef, useState } from "react";
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
    const [searchText, setSearchText] = useState("");
    const [highlightedUserId, setHighlightedUserId] = useState(null);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const allRoles = ["admin", "vendor", "user"];

    const {
        data: users = [],
        isPending,
        isError,
    } = useQuery({
        queryKey: ["allUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            setDisplayedUsers(res.data); // populate display list initially
            return res.data;
        },
    });

    const getSuggestions = () => {
        if (!searchText) return [];
        return users
            .filter(
                (user) =>
                    user.name
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    user.email?.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((user) => user.name);
    };

    const handleSearch = async () => {
        const query = searchText.trim();
        if (!query) {
            // Reset to default full list
            setHighlightedUserId(null);
            setDisplayedUsers(users);
            return;
        }

        try {
            const res = await axiosSecure.get(`/users/search?query=${query}`);
            const matchedUsers = res.data;
            if (matchedUsers.length > 0) {
                const matchedUser = matchedUsers[0];
                setHighlightedUserId(matchedUser._id);

                // Move matched user to top, rest follow
                const reordered = [
                    matchedUser,
                    ...users.filter((u) => u._id !== matchedUser._id),
                ];
                setDisplayedUsers(reordered);
            } else {
                setHighlightedUserId(null);
                setDisplayedUsers(users);
                toast.error("No matching user found");
            }
        } catch (error) {
            setHighlightedUserId(null);
            setDisplayedUsers(users);
            toast.error("Search failed");
        }
    };

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

    useEffect(() => {
        if (searchText.trim() === "") {
            setDisplayedUsers(users);
            setHighlightedUserId(null);
        }
    }, [searchText, users]);

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
                <FaUsers /> All Users
            </h2>

            {/* Search Input */}
            <div className="flex justify-center items-center mb-6">
                <div className="form-control w-full max-w-xs relative">
                    <input
                        type="text"
                        placeholder="Search user by name or email"
                        className="input input-bordered w-full"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        list="user-suggestions"
                    />
                    <datalist id="user-suggestions">
                        {getSuggestions().map((name, index) => (
                            <option key={index} value={name} />
                        ))}
                    </datalist>
                </div>
                <button onClick={handleSearch} className="btn btn-primary ml-2">
                    Search
                </button>
            </div>

            {displayedUsers.length === 0 ? (
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
                            {displayedUsers.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`border-t hover:bg-gray-50 transition ${
                                        user._id === highlightedUserId
                                            ? "bg-yellow-100 font-semibold"
                                            : ""
                                    }`}
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

                    {/* Modal */}
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
