import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, LogOut, ChevronDown, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEditProfile = () => {
        setIsOpen(false);
        navigate('/profile/edit');
    };

    const handleViewDashboard = () => {
        setIsOpen(false);
        navigate('/dashboard');
    };

    const handleAdminPanel = () => {
        setIsOpen(false);
        navigate('/admin');
    };

    // Get user initials for avatar
    const getInitials = () => {
        if (!user?.name) return 'U';
        return user.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg"
            >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    {getInitials()}
                </div>
                <span className="font-medium hidden sm:inline">{user?.name}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-pink-50 border-b border-gray-100">
                            <p className="font-medium text-secondary-900">{user?.name}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <p className="text-xs text-primary-600 font-medium mt-1 capitalize">
                                {user?.role}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <button
                                onClick={handleViewDashboard}
                                className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                            >
                                <User size={18} />
                                <span>{t('userMenu.dashboard')}</span>
                            </button>
                            <button
                                onClick={handleEditProfile}
                                className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                            >
                                <Settings size={18} />
                                <span>{t('userMenu.editProfile')}</span>
                            </button>
                            {isAdmin() && (
                                <button
                                    onClick={handleAdminPanel}
                                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-purple-50 transition-colors text-purple-700 border-t border-gray-100 mt-2 pt-2"
                                >
                                    <Shield size={18} />
                                    <span className="font-medium">{t('userMenu.adminPanel')}</span>
                                </button>
                            )}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600"
                            >
                                <LogOut size={18} />
                                <span>{t('userMenu.signOut')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
