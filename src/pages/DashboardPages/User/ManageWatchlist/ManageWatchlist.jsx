import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageWatchlist = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: watchlistItems = [], isLoading, isError, error } = useQuery({
        queryKey: ['watchlistItems', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/myWatchlist?email=${user?.email}`);
            return res.data;
        }
    });


    console.log(watchlistItems);

    return (
        <div>

            manage watchlist page
            
        </div>
    );
};

export default ManageWatchlist;