import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: roleData = {}, 
        isPending, 
        isError,
    } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ["userRole", user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/user/role/${user.email}`);
            return res.data;
        }
    })


    return {
        role: roleData.role,
        isPending, 
        isError,
    }
};

export default useUserRole;