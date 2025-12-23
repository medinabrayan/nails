import React from 'react';
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
    Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const DashboardSidebar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Inicio',
            icon: LayoutDashboard,
            path: '/dashboard',
            roles: ['manicurist', 'client']
        },
        {
            id: 'offers',
            label: 'Explorar Ofertas',
            icon: Sparkles,
            path: '/offers',
            roles: ['client']
        },
        {
            id: 'history',
            label: 'Mi Historial',
            icon: Calendar,
            path: '/history',
            roles: ['client']
        },
        {
            id: 'services',
            label: 'Mis Servicios',
            icon: Scissors,
            path: '/services/manage',
            roles: ['manicurist']
        },
        {
            id: 'schedule',
            label: 'Horarios',
            icon: Calendar,
            path: '/schedule/config',
            roles: ['manicurist']
        },
        {
            id: 'portfolio',
            label: 'Portafolio',
            icon: LayoutGrid,
            path: '/portfolio/manage',
            roles: ['manicurist']
        },
        {
            id: 'profile',
            label: 'Mi Perfil',
            icon: User,
            path: '/profile/edit',
            roles: ['manicurist', 'client']
        },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-white border-r border-primary-100 flex flex-col z-50 transition-all duration-300">
            {/* Logo Section */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200">
                    <Sparkles className="text-white" size={24} />
                </div>
                <span className="font-serif font-bold text-xl text-secondary-900 hidden md:block">Nails Studio</span>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${isActive
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-500 hover:bg-primary-50/50 hover:text-primary-500'
                                }`}
                        >
                            <item.icon size={24} className="flex-shrink-0" />
                            <span className="font-bold hidden md:block text-sm uppercase tracking-wider">{item.label}</span>

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-[-16px] w-1.5 h-8 bg-primary-600 rounded-r-full"
                                />
                            )}
                        </button>
                    );
                })}

                {isAdmin() && (
                    <button
                        onClick={() => navigate('/admin')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-purple-600 hover:bg-purple-50 hover:text-purple-700 mt-4 border-t border-gray-100 pt-6`}
                    >
                        <Shield size={24} className="flex-shrink-0" />
                        <span className="font-bold hidden md:block text-sm uppercase tracking-wider">Panel Admin</span>
                    </button>
                )}
            </nav>

            {/* User Profile Summary & Logout */}
            <div className="p-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 px-2 hidden md:flex">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-pink-500 flex items-center justify-center font-bold text-sm text-white border-2 border-primary-50 shadow-md">
                        {user?.name?.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-sm text-secondary-900 truncate">{user?.name}</p>
                        <p className="text-[10px] font-bold text-primary-500 uppercase tracking-tighter truncate capitalize">{user?.role}</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all group"
                >
                    <LogOut size={24} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span className="font-bold hidden md:block text-sm uppercase tracking-wider">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
