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
                    className="btn btn-ghost bg-white rounded-full hidden md:flex"
                >

                    <img referrerPolicy="no-referrer" src={user?.photoURL} className="w-8 h-8 rounded-full" alt="profile image" />
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-20 p-2 shadow"
                >
                    <li><h4 className="font-bold">{user?.displayName}</h4></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownProfile;
