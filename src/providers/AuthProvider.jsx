import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import useAxiosSecure from "../hooks/useAxiosSecure";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profileInfo) =>{
        return updateProfile(auth.currentUser, profileInfo)
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('token');
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);
            // console.log("user in auth state change : ", currentUser);


            if(currentUser?.email) {

                const res = await axiosSecure.post(`/jwt`,{email: currentUser?.email})
                // console.log(res.data.token);
                localStorage.setItem("token",res.data.token);
            }

            else{
                localStorage.removeItem('token');
            }


            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        signIn,
        updateUserProfile,
        signInWithGoogle,
        logOut,
        loading,
        user,
    };

    return <AuthContext value={authInfo}>
        
        {children}
        
    </AuthContext>;
};

export default AuthProvider;
