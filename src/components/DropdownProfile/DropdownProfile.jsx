import React from "react";
import useAuth from "../../hooks/useAuth";

const DropdownProfile = () => {

    const {user} = useAuth();
    // console.log(user);

    return (
        <div>
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost hidden md:flex"
                >
                    {/* <svg
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
                    </svg> */}

                    <img referrerPolicy="no-referrer" src={user?.photoURL} className="w-8 h-8 rounded-full" alt="profile image" />
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-20 p-2 shadow"
                >
                    <li>{user?.displayName}</li>
                    <li>bddw</li>
                    <li>cgfr</li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownProfile;
