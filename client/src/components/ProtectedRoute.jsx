import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/loginSignup" replace />;
    }

    return children;
}
