import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle, DollarSign, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAppointmentsByUser } from '../../../data/mockData';
import { useAuth } from '../../../context/AuthContext';
import { ReviewFormModal } from './ReviewForm';
import { AnimatePresence } from 'framer-motion';

const AppointmentHistory = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all'); // all, upcoming, past
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const data = getAppointmentsByUser(user.id);
            setAppointments(data);
        }
    }, [user]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'completed':
                return 'bg-green-50 text-green-600 border-green-100';
            case 'cancelled':
                return 'bg-red-50 text-red-600 border-red-100';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <AlertCircle size={14} />;
            case 'completed':
                return <CheckCircle size={14} />;
            case 'cancelled':
                return <XCircle size={14} />;
            default:
                return null;
        }
    };

    const filteredAppointments = appointments.filter(appt => {
        if (filter === 'all') return true;
        const apptDate = new Date(appt.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filter === 'upcoming') return apptDate >= today && appt.status !== 'cancelled';
        if (filter === 'past') return apptDate < today || appt.status === 'cancelled' || appt.status === 'completed';
        return true;
    });

    const handleOpenReview = (appt) => {
        setSelectedAppt(appt);
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = (reviewData) => {
        // Update local state to mark as reviewed
        setAppointments(prev => prev.map(appt =>
            appt.id === reviewData.bookingId ? { ...appt, reviewed: true } : appt
        ));
        setIsReviewModalOpen(false);
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Mi Historial de Citas</h1>
                    <p className="text-gray-500">Gestiona tus reservas y revisa tus tratamientos pasados</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-primary-50 shadow-sm self-start">
                    {['all', 'upcoming', 'past'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all capitalize ${filter === f
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                : 'text-gray-400 hover:text-secondary-900'
                                }`}
                        >
                            {f === 'all' ? 'Todas' : f === 'upcoming' ? 'Próximas' : 'Pasadas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-[3rem] shadow-sm p-20 text-center border border-primary-50">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">No tienes citas registradas</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">Cuando agendes un servicio, aparecerá aquí para que puedas llevar un control.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredAppointments.map((appt, index) => (
                        <motion.div
                            key={appt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="p-8 flex flex-col lg:flex-row items-center gap-8">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center w-24 h-24 bg-primary-50 rounded-3xl text-primary-600 flex-shrink-0">
                                    <span className="text-xs font-bold uppercase tracking-widest leading-none mb-1">
                                        {new Date(appt.date).toLocaleDateString('es-ES', { month: 'short' })}
                                    </span>
                                    <span className="text-3xl font-bold leading-none">
                                        {new Date(appt.date).getDate()}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-secondary-900">{appt.serviceName}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5 ${getStatusStyle(appt.status)}`}>
                                            {getStatusIcon(appt.status)}
                                            {appt.status === 'confirmed' ? 'Confirmada' : appt.status === 'completed' ? 'Finalizada' : 'Cancelada'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary-400" />
                                            {appt.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-secondary-100 flex items-center justify-center text-[10px] text-secondary-900 font-bold">
                                                {appt.professionalName.charAt(0)}
                                            </div>
                                            {appt.professionalName}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign size={16} className="text-green-500" />
                                            ${appt.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 w-full lg:w-auto">
                                    {appt.status === 'completed' && (
                                        <button
                                            onClick={() => handleOpenReview(appt)}
                                            disabled={appt.reviewed}
                                            className={`flex-1 lg:flex-initial px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${appt.reviewed
                                                    ? 'bg-gray-100 text-gray-400 cursor-default'
                                                    : 'bg-secondary-900 text-white hover:bg-secondary-800 shadow-secondary-900/10'
                                                }`}
                                        >
                                            {appt.reviewed ? 'Ya calificado' : 'Dejar Reseña'}
                                        </button>
                                    )}
                                    {appt.status === 'confirmed' && (
                                        <button className="flex-1 lg:flex-initial px-8 py-3 border-2 border-red-50 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all">
                                            Cancelar
                                        </button>
                                    )}
                                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-primary-50 hover:text-primary-500 transition-all group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Review Modal */}
            <ReviewFormModal
                isOpen={isReviewModalOpen}
                booking={selectedAppt ? {
                    id: selectedAppt.id,
                    professionalId: selectedAppt.professionalId,
                    professionalName: selectedAppt.professionalName,
                    service: selectedAppt.serviceName,
                    date: selectedAppt.date,
                    professionalImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAppt.professionalName)}&background=random`
                } : null}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
            />
        </div>
    );
};

export default AppointmentHistory;
