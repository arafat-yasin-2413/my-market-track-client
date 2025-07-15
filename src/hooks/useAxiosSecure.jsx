import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
    const token = localStorage.getItem("token");

    axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    axiosSecure.interceptors.response.use((res) => {
        return res;
    });
    return axiosSecure;
};

export default useAxiosSecure;
