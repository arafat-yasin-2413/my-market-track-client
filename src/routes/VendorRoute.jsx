import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router';

const VendorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isPending } = useUserRole();
    



    if( loading || isPending ) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(!user || role !== 'vendor') {
        return <Navigate
         to="/forbidden"></Navigate>
    }


    return children;
};

export default VendorRoute;