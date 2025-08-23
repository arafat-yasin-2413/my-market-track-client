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
                            <Icon
                                icon="majesticons:menu"
                                width="36"
                                height="36"
                                className="text-white"
                            />
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
                    <div className="list-none flex justify-center items-center gap-4">
                        <MainLinks></MainLinks>
                    </div>
                </div>

                {/* <div>{user && <h4>{user.email}</h4>}</div> */}

                <div className="navbar-end gap-1">
                    {user ? (
                        <>
                            <DropdownProfile></DropdownProfile>

                            <button
                                onClick={handleLogOut}
                                className="bg-primary border border-white rounded-md px-2 py-1 text-white font-semibold tracking-wider cursor-pointer hover:scale-102 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="bg-primary border border-white rounded-md px-2 py-1 text-white font-semibold tracking-wider cursor-pointer hover:scale-102 transition duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary border border-white rounded-md px-2 py-1 text-white font-semibold tracking-wider cursor-pointer hover:scale-102 transition duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
