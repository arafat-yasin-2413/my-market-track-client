import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        // <section className='bg-base-200'>

        // <div className=''>
        //     <Navbar></Navbar>
        // </div>
        
        // <div className='max-w-11/12 mx-auto'>
        //     <Outlet></Outlet>
        //     {/* <Footer></Footer> */}
        // </div>
        // </section>




        <div>
            <Navbar></Navbar>
            <div className='w-10/12 mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;