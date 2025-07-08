import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div>
            <div className="w-6/12 mx-auto min-h-screen flex flex-col justify-center items-center">
                <h2 className="text-3xl">This is Error Page</h2>

                <p>
                    <Link to="/" className="btn bg-blue-500 px-4 py-2">
                        Go to Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
