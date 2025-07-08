import React from 'react';
import { Link } from 'react-router';
import Divider from './Divider';
import SocialLogin from './SocialLogin';

const Register = () => {
    return (
        <div className="relative bg-[url(/assets/banner/banner-4.jpg)] bg-cover bg-no-repeat bg-center  min-h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-96 bg-gray-100 p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl tracking-wide font-bold text-center my-4">
                    Register
                </h2>
                <form>
                    <label>Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-4"
                        placeholder="your name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-4"
                        placeholder="photo"
                    />

                    <label>Photo</label>
                    <input
                        type="file"
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-4"
                        placeholder="Email"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition mb-2"
                        placeholder="Password"
                    />
                    <div className="text-start text-sm my-2 font-semibold">

                        <p>
                            Already have an Account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-full mt-2">
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