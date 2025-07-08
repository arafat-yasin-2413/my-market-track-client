import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;