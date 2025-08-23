import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const DropdownProfile = () => {

    const {user} = useAuth();
    // console.log(user);

    return (
        <div>
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="bg-secondary p-1 rounded-full hidden md:flex cursor-pointer"
                >

                    <img referrerPolicy="no-referrer" src={user?.photoURL} className="w-8 h-8 rounded-full" alt="profile image" />
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-36 p-2 shadow flex flex-col gap-2"
                >
                    <li><h4 className="font-bold text-xl">{user?.displayName}</h4></li>
                    <li><Link to="/profile" className="text-base font-medium bg-white">Profile</Link></li>
                    <li><Link to="/about" className="text-base font-medium bg-white">About Us</Link></li>
                    <li><Link to="/terms" className="text-base font-medium bg-white">Policy</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownProfile;
