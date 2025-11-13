import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;
