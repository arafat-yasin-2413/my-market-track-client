import React from "react";
import { NavLink } from "react-router";

const DashboardMenu = ({ title, link, Icon }) => {
    return (
        <>
            <li className="bg-base-100 my-2 rounded">
                <NavLink className="dashboardLink text-base" to={link}>
                    {Icon && <Icon></Icon>}
                    {title}
                </NavLink>
            </li>
        </>
    );
};

export default DashboardMenu;
