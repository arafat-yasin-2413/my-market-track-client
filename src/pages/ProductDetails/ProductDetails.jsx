import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const ProductDetails = () => {

    const { id } = useParams();
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate();

    // console.log(product);

    const {_id,email, date, itemDescription, itemName, marketDescription, marketName, name, price, status} = product || {};


    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    }

    return (
        <div className='my-10'>
            <h3>Item name : {itemName}</h3>
            <h3 className='text-red-500 font-bold'>Price : {price} tk</h3>
            <h3>date : {date}</h3>
            <h3>Market Name : {marketName}</h3>
            <h3>Market description : {marketDescription}</h3>
            <h3>Item description : {itemDescription}</h3>
            <h3>Status : {status}</h3>
            <h3>Email : {email}</h3>


            <button onClick={()=>{handlePay(_id)}} className="btn">Pay Now</button>

        </div>
    );
};

export default ProductDetails;