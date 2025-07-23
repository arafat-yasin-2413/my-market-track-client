import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import ProductCard from '../ProductCard/ProductCard';

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();


    const {data: allProduct = [], isLoading, isError, error} = useQuery({
        queryKey: ["allProduct"],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/allProduct');
            // console.log(res.data);
            return res.data;
        }
    });


    // console.log(allProduct);



    if(isLoading) return LoadingSpinner;
    if(isError) return toast.error(error.message);




    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {allProduct.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default AllProduct;