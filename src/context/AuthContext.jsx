import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token in localStorage on mount
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login - replace with actual API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    // Check if admin login
                    let mockUser;
                    if (email === 'admin@nails.com') {
                        mockUser = {
                            email,
                            role: 'admin',
                            name: 'Admin User',
                            isAdmin: true
                        };
                    } else {
                        mockUser = { email, role: 'client', name: 'Test User' };
                    }
                    const mockToken = 'mock-jwt-token';

                    localStorage.setItem('token', mockToken);
                    localStorage.setItem('user', JSON.stringify(mockUser));

                    setUser(mockUser);
                    setIsAuthenticated(true);
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const register = async (userData) => {
        // Mock register - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = { ...userData };
                const mockToken = 'mock-jwt-token';

                localStorage.setItem('token', mockToken);
                localStorage.setItem('user', JSON.stringify(mockUser));

                setUser(mockUser);
                setIsAuthenticated(true);
                resolve(mockUser);
            }, 1000);
        });
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const isAdmin = () => {
        return user?.role === 'admin' || user?.isAdmin === true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, updateUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
