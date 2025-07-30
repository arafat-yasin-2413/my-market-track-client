import React from "react";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const {signIn} = useAuth();
    const location = useLocation();


    const from = location.state?.from || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = data => {
        // console.log(data);

        signIn(data.email, data.password)
        .then(result=>{
            toast.success('Login Successfull')
            // console.log(result.user);
            navigate(from);
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    return (
        <div className="relative bg-[url(/assets/banner/banner-4.jpg)] bg-cover bg-no-repeat bg-center  min-h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-96 bg-gray-100 p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl tracking-wide font-bold text-center my-4">
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* email field */}
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-4"
                        placeholder="Email"
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-500">Email is required</p>
                    )}

                    {/* password field */}
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                message:
                                    "Password must contain uppercase, lowercase, and a number",
                            },
                        })}
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2"
                        placeholder="Password"
                    />
                    {errors.password?.type === "required" && (
                        <p className="text-red-500">Password is required</p>
                    )}

                    {errors.password?.type === "minLength" && (
                        <p className="text-red-500">
                            Password must be 6 characters or longer
                        </p>
                    )}

                    {errors.password?.type === "pattern" && (
                        <p className="text-red-500">
                            {errors.password.message}
                        </p>
                    )}


                    <div className="text-start text-sm my-2 font-semibold">
                        <p>
                            Don't have an Account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-full mt-2 cursor-pointer">
                        Login
                    </button>
                </form>

                <Divider></Divider>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;
