import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVerificationStats, getPendingManicurists } from '../../../data/mockData';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
    const [recentPending, setRecentPending] = useState([]);

    useEffect(() => {
        setStats(getVerificationStats());
        setRecentPending(getPendingManicurists().slice(0, 3));
    }, []);

    const StatCard = ({ icon: Icon, title, value, color, onClick }) => (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onClick}
            className={`bg-white rounded-[2rem] p-8 border border-primary-50 shadow-sm cursor-pointer transition-all hover:shadow-xl group overflow-hidden relative`}
        >
            <div className={`absolute top-0 left-0 w-2 h-full bg-${color}-500 opacity-50`} />
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className={`text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1`}>{title}</p>
                    <p className="text-4xl font-bold text-secondary-900 leading-none">{value}</p>
                </div>
                <div className={`p-4 bg-${color}-50 rounded-2xl text-${color}-500 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Panel de Administración</h1>
                <p className="text-gray-500">Supervisión y verificación de perfiles de manicuristas</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={Clock}
                    title="Pendientes"
                    value={stats.pending}
                    color="yellow"
                    onClick={() => navigate('/admin/pending')}
                />
                <StatCard
                    icon={CheckCircle}
                    title="Aprobados"
                    value={stats.approved}
                    color="green"
                />
                <StatCard
                    icon={XCircle}
                    title="Rechazados"
                    value={stats.rejected}
                    color="red"
                />
                <StatCard
                    icon={Users}
                    title="Total Perfiles"
                    value={stats.total}
                    color="blue"
                />
            </div>

            {/* Recent Pending Profiles */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-secondary-900 flex items-center gap-3">
                        <Clock className="text-yellow-500" />
                        Perfiles Pendientes Recientes
                    </h2>
                    <button
                        onClick={() => navigate('/admin/pending')}
                        className="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2 px-4 py-2 hover:bg-primary-50 rounded-xl transition-all"
                    >
                        Ver Todos
                        <TrendingUp size={18} />
                    </button>
                </div>

                {recentPending.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <CheckCircle className="mx-auto text-green-400 mb-4" size={56} />
                        <h3 className="text-xl font-bold text-gray-700">¡Todo al día!</h3>
                        <p className="text-gray-400 mt-1">No hay perfiles esperando verificación en este momento.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentPending.map((manicurist) => (
                            <motion.div
                                key={manicurist.id}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => navigate(`/admin/verify/${manicurist.id}`)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-200">
                                        {manicurist.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-secondary-900 group-hover:text-primary-600 transition-colors">{manicurist.name}</h3>
                                        <p className="text-gray-500 font-medium">{manicurist.email}</p>
                                        <div className="flex gap-4 mt-2">
                                            <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">{manicurist.experience} años exp.</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{manicurist.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <span className="inline-block px-4 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-widest border border-yellow-100">
                                        Pendiente
                                    </span>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">
                                        Solicitud: {manicurist.appliedDate}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
