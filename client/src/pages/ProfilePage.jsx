import React, { useEffect, useState } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Example: Get user from localStorage JWT payload
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    name: payload.name,
                    email: payload.email,
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }

        // Optional styling for Profile page
        document.body.style.backgroundColor = "#f8f9fa";
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        };
    }, []);

    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <h2>Please log in to view your profile.</h2>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "15px" }}>
                <h2 className="mb-4 text-center">Profile</h2>
                <div className="mb-3">
                    <strong>Name:</strong> {user.name}
                </div>
                <div className="mb-3">
                    <strong>Email:</strong> {user.email}
                </div>
                <button className="btn btn-primary w-100 mt-3">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
