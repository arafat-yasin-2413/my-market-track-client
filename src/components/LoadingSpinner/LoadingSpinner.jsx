import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <ClipLoader color="#36d7b7" size={50} />
        </div>
    );
};

export default LoadingSpinner;
