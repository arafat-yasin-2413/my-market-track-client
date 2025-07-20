import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <div className="max-w-lg">
                <div>
                    <h1 className="flex justify-center items-center">
                        <FaLock className="text-6xl font-bold text-error mb-4"></FaLock>
                    </h1>
                    <h1 className="text-6xl font-bold text-error mb-4">
                        403 - Forbidden
                    </h1>
                </div>
                <h2 className="text-3xl font-semibold mb-2">
                    Access Forbidden
                </h2>
                <p className="mb-6 text-gray-500">
                    You don't have permission to view this page.
                </p>
                <Link to="/">
                    <button className="btn">Go Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenPage;
