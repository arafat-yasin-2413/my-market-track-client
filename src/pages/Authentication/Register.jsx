import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { createUser,updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        
        console.log(data);
        
        createUser(data.email, data.password)
        .then( async (result) => {
            toast.success('Account Created Successfully')
            console.log(result.user);

            // update user info to DB
            const userInfo = {
                email: data.email,
                name: data.name,
                role: 'user',
                photo: profilePic,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            }

            const userRes = await axiosPublic.post(`/users`,userInfo);
            console.log(userRes.data);



            // update user info to Firebase
            const userProfile = {
                displayName: data.name,
                photoURL: profilePic
            }
            updateUserProfile(userProfile)
            .then(()=>{
                console.log('profile name, picture updated');
            })
            .catch(error=>{
                console.log('failed to upload picture.', error);
            })
            navigate('/');











            reset();
        })
        .catch(error=>{
            console.error(error);
        })
    };

    const handleImageUpload = async(e)=>{
        const image = e.target.files[0];
        // console.log(image);

        const formData = new FormData();
        formData.append("image",image);

        const imageUploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData);
        console.log(res.data);
        // console.log(res.data.data);
        setProfilePic(res.data.data.url);
        


    }

    return (
        <div className="relative bg-[url(/assets/banner/banner-4.jpg)] bg-cover bg-no-repeat bg-center  min-h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-96 bg-gray-100 p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl tracking-wide font-bold text-center my-4">
                    Register
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name field */}
                    <label>Name</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2 tracking-wider text-[1.1rem]"
                        placeholder="your name"
                    />

                    {errors.name?.type === "required" && (
                        <p className="text-red-500">Name is required</p>
                    )}

                    {/* email field */}
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2 tracking-wider text-[1.1rem]"
                        placeholder="your email"
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-500">Email is required</p>
                    )}

                    {/* photo field */}
                    <label>Photo</label>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        name="photo"
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2 tracking-wider text-[1.1rem]"
                        placeholder="your photo"
                    />
                  

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
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2 font-semibold tracking-wider text-[1.1rem]"
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
                            Already have an Account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-full mt-2 cursor-pointer">
                        Register
                    </button>
                </form>

                <Divider></Divider>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
