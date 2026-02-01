import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Scissors,
    Calendar,
    LayoutGrid,
    User,
    Settings,
    LogOut,
    Sparkles,
    Shield,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../shared/LanguageSelector';

const DashboardSidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const menuItems = [
        {
            id: 'dashboard',
            label: t('sidebar.home'),
            icon: LayoutDashboard,
            path: '/dashboard',
            roles: ['manicurist', 'client']
        },
        {
            id: 'offers',
            label: t('sidebar.exploreOffers'),
            icon: Sparkles,
            path: '/offers',
            roles: ['client']
        },
        {
            id: 'history',
            label: t('sidebar.myHistory'),
            icon: Calendar,
            path: '/history',
            roles: ['client']
        },
        {
            id: 'services',
            label: t('sidebar.myServices'),
            icon: Scissors,
            path: '/services/manage',
            roles: ['manicurist']
        },
        {
            id: 'schedule',
            label: t('sidebar.schedule'),
            icon: Calendar,
            path: '/schedule/config',
            roles: ['manicurist']
        },
        {
            id: 'portfolio',
            label: t('sidebar.portfolio'),
            icon: LayoutGrid,
            path: '/portfolio/manage',
            roles: ['manicurist']
        },
        {
            id: 'profile',
            label: t('sidebar.myProfile'),
            icon: User,
            path: '/profile/edit',
            roles: ['manicurist', 'client']
        },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-primary-100 z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-200">
                        <Sparkles className="text-white" size={18} />
                    </div>
                    <span className="font-serif font-bold text-lg text-secondary-900">{t('sidebar.studio')}</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
                </button>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-primary-100 flex-col z-50 transition-all duration-300">
                {/* Logo Section */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <span className="font-serif font-bold text-xl text-secondary-900">{t('sidebar.studio')}</span>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {filteredItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.path)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${isActive
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-500 hover:bg-primary-50/50 hover:text-primary-500'
                                    }`}
                            >
                                <item.icon size={24} className="flex-shrink-0" />
                                <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill-desktop"
                                        className="absolute left-[-16px] w-1.5 h-8 bg-primary-600 rounded-r-full"
                                    />
                                )}
                            </button>
                        );
                    })}

                    {isAdmin() && (
                        <button
                            onClick={() => handleNavigation('/admin')}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-purple-600 hover:bg-purple-50 hover:text-purple-700 mt-4 border-t border-gray-100 pt-6`}
                        >
                            <Shield size={24} className="flex-shrink-0" />
                            <span className="font-bold text-sm uppercase tracking-wider">{t('sidebar.adminPanel')}</span>
                        </button>
                    )}
                </nav>

                {/* Language Selector */}
                <div className="px-4 py-3 border-t border-gray-100">
                    <LanguageSelector />
                </div>

                {/* User Profile Summary & Logout */}
                <div className="p-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-pink-500 flex items-center justify-center font-bold text-sm text-white border-2 border-primary-50 shadow-md">
                            {user?.name?.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm text-secondary-900 truncate">{user?.name}</p>
                            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-tighter truncate capitalize">{user?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all group"
                    >
                        <LogOut size={24} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span className="font-bold text-sm uppercase tracking-wider">{t('sidebar.logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/50 z-40"
                        />
                        
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="md:hidden fixed left-0 top-16 bottom-0 w-72 bg-white border-r border-primary-100 flex flex-col z-50"
                        >
                            {/* Language Selector - Mobile */}
                            <div className="p-4 bg-gradient-to-r from-primary-50 to-pink-50 border-b border-primary-100">
                                <LanguageSelector />
                            </div>

                            {/* User Info Header */}
                            <div className="p-4 border-b border-primary-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-400 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
                                        {user?.name?.slice(0, 1).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-secondary-900 truncate">{user?.name}</p>
                                        <p className="text-xs text-primary-600 font-medium capitalize">{user?.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Section */}
                            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                                {filteredItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigation(item.path)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-gray-500 hover:bg-primary-50/50 hover:text-primary-500'
                                                }`}
                                        >
                                            <item.icon size={22} className="flex-shrink-0" />
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </button>
                                    );
                                })}

                                {isAdmin() && (
                                    <button
                                        onClick={() => handleNavigation('/admin')}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-purple-600 hover:bg-purple-50 hover:text-purple-700 mt-4 border-t border-gray-100 pt-4`}
                                    >
                                        <Shield size={22} className="flex-shrink-0" />
                                        <span className="font-medium text-sm">{t('sidebar.adminPanel')}</span>
                                    </button>
                                )}
                            </nav>

                            {/* Bottom Section */}
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                >
                                    <LogOut size={22} />
                                    <span className="font-medium text-sm">{t('sidebar.logout')}</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashboardSidebar;
