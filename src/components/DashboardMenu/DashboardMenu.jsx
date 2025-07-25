import React from "react";
import { NavLink } from "react-router";

const DashboardMenu = ({ title, link, Icon }) => {

    const isExactPath = link === "/dashboard";

    return (
        <>
            <li className="bg-base-100 my-2 rounded">
                <NavLink className="dashboardLink text-base font-semibold" to={link} end={isExactPath}>
                    {Icon && <Icon></Icon>}
                    {title}
                </NavLink>
            </li>
        </>
    );
};

export default DashboardMenu;
