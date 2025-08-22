import React, { use } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";

const MainLinks = () => {
    const { logOut, user } = useAuth();

    return (
        <>
            <li>
                <NavLink
                    to="/"
                    className="nav text-white font-medium text-xl"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allProduct"
                    className="nav text-white font-medium text-xl"
                >
                    All Product
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className="nav text-white font-medium text-xl"
                >
                    About Us
                </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className="nav text-white font-medium text-xl"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className="nav text-white font-medium text-xl"
                        >
                            Profile
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );
};

export default MainLinks;
