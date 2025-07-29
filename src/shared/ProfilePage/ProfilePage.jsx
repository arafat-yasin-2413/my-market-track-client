import React from "react";

const ProfilePage = ({ user }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
                <img
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
                    src={
                        user?.photoURL
                    }
                    alt="User Profile"
                />
                <h2 className="text-2xl font-bold mt-6 text-gray-800">
                    {user?.displayName || "User Name"}
                </h2>
                <p className="text-gray-500 mt-2">
                    {user?.email || "user@example.com"}
                </p>

            </div>
        </div>
    );
};

export default ProfilePage;
