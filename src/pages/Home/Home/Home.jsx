import React from 'react';
import Banner from '../Banner/Banner';
import Test from '../Test/Test';
import { toast } from 'react-toastify';


const Home = () => {

    const handleToast = () => {
        toast.success('Toast successfull')
    }


    return (
        <div>
            {/* <Banner></Banner> */}

            <Test></Test>
            
        </div>
    );
};

export default Home;