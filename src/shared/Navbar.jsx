import React from "react";
import { FaChartLine } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import MarketTrackLogo from "../components/MarketTrackLogo/MarketTrackLogo";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className="nav text-[0.8rem] font-semibold tracking-wider"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allProducts"
                    className="nav text-[0.8rem] font-semibold tracking-wider"
                >
                    All Products
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className="nav text-[0.8rem] font-semibold tracking-wider"
                >
                    Dashboard
                </NavLink>
            </li>
        </>
    );

    const { logOut, user } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfull");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="navbar bg-blue-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>


                <MarketTrackLogo></MarketTrackLogo>

                
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
            </div>

            <div>{user && <h4>{user.email}</h4>}</div>

            <div className="navbar-end gap-1">
                <button
                    onClick={handleLogOut}
                    className="btn bg-red-500 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300 hover:bg-white hover:outline hover:outline-red-500 hover:text-red-600 hover:border-none"
                >
                    Logout
                </button>
                <Link
                    to="/login"
                    className="btn bg-blue-600 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="btn bg-blue-700 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
