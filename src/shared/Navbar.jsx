import React from "react";
import { FaChartLine } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import MarketTrackLogo from "../components/MarketTrackLogo/MarketTrackLogo";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import DropdownProfile from "../components/DropdownProfile/DropdownProfile";
import { Icon } from "@iconify/react/dist/iconify.js";
import MainLinks from "../components/MainLinks/MainLinks";

const Navbar = () => {
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
        <div className="shadow-2xl bg-primary">
            <div className="navbar w-10/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="lg:hidden cursor-pointer"
                        >
                            <Icon icon="majesticons:menu" width="36" height="36" className="text-white" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow flex flex-col"
                        >
                            <MainLinks></MainLinks>
                        </ul>
                    </div>

                    <MarketTrackLogo></MarketTrackLogo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="list-none flex justify-center items-center gap-4"><MainLinks></MainLinks></div>
                </div>

                {/* <div>{user && <h4>{user.email}</h4>}</div> */}

                <div className="navbar-end gap-1">
                    {user ? (
                        <>
                            <DropdownProfile></DropdownProfile>

                            <button
                                onClick={handleLogOut}
                                className="btn bg-red-500 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300 hover:bg-white hover:outline hover:outline-red-500 hover:text-red-600 hover:border-none cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn bg-blue-600 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn bg-blue-700 text-white text-[0.8rem] tracking-wider hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
