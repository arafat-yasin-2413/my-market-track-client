import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";



import { Outlet } from "react-router";
const AuthLayout = () => {
    return (
        <>
            <section>
                <Navbar></Navbar>
                
                

                    <Outlet></Outlet>
                

                <Footer></Footer>
            </section>
        </>
    );
};

export default AuthLayout;


{/* <div className="flex flex-col md:flex-row w-3/6 mx-auto gap-8 my-10 justify-center items-center">
                    <div className="border flex-1">
                        <Outlet></Outlet>
                    </div>

                    <div className="border flex-1 hidden md:flex">
                        <img src={authImage} alt="" />
                    </div>
                </div> */}