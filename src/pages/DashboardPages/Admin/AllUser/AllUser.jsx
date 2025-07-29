import React, { useState, useRef, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allRoles] = useState(["admin", "user", "moderator"]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedEmails, setHighlightedEmails] = useState([]);
    const modalRef = useRef();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
        setAllUsers(res.data);
    };

    const getRoleWiseColors = (role) => {
        switch (role) {
            case "admin":
                return "bg-red-500";
            case "moderator":
                return "bg-yellow-500";
            case "user":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleSearch = async () => {
        if (!searchText.trim()) {
            // Reset view if search is empty
            setUsers(allUsers);
            setHighlightedEmails([]);
            return;
        }

        try {
            const res = await axiosSecure.get(
                `/users/search?query=${searchText}`
            );
            const matched = res.data;

            // Highlight only matched users
            const matchedEmails = matched.map((u) => u.email.toLowerCase());

            // Merge matched users with all others (without duplicates)
            const merged = [
                ...matched,
                ...allUsers.filter(
                    (u) => !matchedEmails.includes(u.email.toLowerCase())
                ),
            ];

            setUsers(merged);
            setHighlightedEmails(matchedEmails);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.length === 0) {
            setSuggestions([]);
            setUsers(allUsers); // Reset list
            setHighlightedEmails([]);
            return;
        }

        const matches = allUsers
            .filter(
                (user) =>
                    user.email.toLowerCase().includes(value.toLowerCase()) ||
                    user.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((user) => user.email);

        setSuggestions(matches.slice(0, 5));
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-2xl">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-gray-800">
                <FaUsers /> All Users
            </h2>

            {/* Search Bar */}
            <div className="flex flex-col items-center justify-center mb-4 space-y-2">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by email or name"
                        className="input input-bordered w-72"
                        value={searchText}
                        onChange={handleInputChange}
                        list="suggestion-list"
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <datalist id="suggestion-list">
                    {suggestions.map((s, i) => (
                        <option key={i} value={s} />
                    ))}
                </datalist>
            </div>

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
                                    className={`border-t hover:bg-gray-50 transition ${
                                        highlightedEmails.includes(
                                            user.email.toLowerCase()
                                        )
                                            ? "bg-yellow-100"
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
