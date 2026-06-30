import React from "react";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container/Container";

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
                    <img
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-accebg-orange-500nt"
                        src={user?.photoURL}
                        alt="User Profile"
                    />
                    <h2 className="text-2xl font-bold mt-6 text-bg-orange-500">
                        {user?.displayName || "User Name"}
                    </h2>
                    <p className="text-primary mt-2">
                        {user?.email || "user@example.com"}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default ProfilePage;
