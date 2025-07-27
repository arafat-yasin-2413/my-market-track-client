import React from "react";
import { NavLink, Outlet } from "react-router";
import MarketTrackLogo from "../components/MarketTrackLogo/MarketTrackLogo";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import DashboardMenu from "../components/DashboardMenu/DashboardMenu";
import { AiFillHome } from "react-icons/ai";
import { FaBullhorn, FaCartPlus, FaFolderOpen } from "react-icons/fa6";
import { FaBoxes, FaBoxOpen, FaChartLine, FaClipboardList, FaHeart, FaHistory, FaListAlt, FaUsers } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import useUserRole from "../hooks/useUserRole";
import { MdCampaign } from "react-icons/md";

const DashboardLayout = () => {

    const {role, isPending} = useUserRole();
    console.log(role);

    return (
        <>
            <Navbar></Navbar>

            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col min-h-full">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        {/* dashboard menu button */}
                        <div className="flex-none">
                            <label
                                htmlFor="my-drawer-2"
                                aria-label="open sidebar"
                                className="btn btn-square btn-ghost"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 lg:hidden">
                            Dashboard
                        </div>
                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* Page content here */}
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <MarketTrackLogo></MarketTrackLogo>
                    <div className="divider"></div>
                        <ul>
                            
                            <DashboardMenu title={"Home"} link={"/dashboard"} Icon={AiFillHome}></DashboardMenu>

                            {
                                !isPending && (role === 'user') &&
                            <>
                                
                                <DashboardMenu title={"View Price Trends"} link={"/dashboard/priceTrends"} Icon={GrLineChart}></DashboardMenu>
                                <DashboardMenu title={"Manage Watchlist"} link={"/dashboard/myWatchlist"} Icon={FaHeart}></DashboardMenu>
                                <DashboardMenu title={"My Order List"} link={"/dashboard/myOrderList"} Icon={FaListAlt}></DashboardMenu>
                                <DashboardMenu title={"Payment History"} link="/dashboard/paymentHistory" Icon={FaHistory}></DashboardMenu>
                            </>

                            }
                        
                        {
                            !isPending && (role === 'vendor' ) && 
                            <>
                                <DashboardMenu title={"Add Product"} link="/dashboard/addProduct" Icon={FaCartPlus}></DashboardMenu>
                                <DashboardMenu title={"My Products"} link="/dashboard/myProducts" Icon={FaBoxes}></DashboardMenu>
                                <DashboardMenu title={"Add Advertisement"} link="/dashboard/addAdvertisement" Icon={FaBullhorn}></DashboardMenu>
                                <DashboardMenu title={"My Advertisements"} link="/dashboard/myAdvertisements" Icon={FaFolderOpen}></DashboardMenu>
                            </>
                        }
                        
                        
                        
                        {
                            !isPending && role === 'admin' && 
                            <>
                                <DashboardMenu title={"All Users"} link="/dashboard/allUser" Icon={FaUsers}></DashboardMenu>
                                <DashboardMenu title={"All Product"} link="/dashboard/allProductAdmin" Icon={FaBoxOpen}></DashboardMenu>
                                <DashboardMenu title={"All Advertisement"} link="/dashboard/allAdvertisement" Icon={MdCampaign}></DashboardMenu>
                                <DashboardMenu title={"All Order"} link="/dashboard/allOrder" Icon={FaClipboardList}></DashboardMenu>
                            
                            </>
                        }    
                            

                        
                        </ul>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default DashboardLayout;
