import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
    // const navigate = useNavigate();

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        (res) => {
            return res;
        },
        (error) => {
            // console.log("inside response interceptor : ", error.response?.status);
            
            return Promise.reject(error);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;
