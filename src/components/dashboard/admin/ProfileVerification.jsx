import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, Phone, MapPin, Briefcase, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { getManicuristById, approveManicurist, rejectManicurist } from '../../../data/mockData';

const ProfileVerification = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);

    useEffect(() => {
        const manicurist = getManicuristById(id);
        if (manicurist) {
            setProfile(manicurist);
        } else {
            navigate('/admin/pending');
        }
    }, [id, navigate]);

    const handleApprove = () => {
        if (window.confirm(`¿Estás seguro de que deseas aprobar a ${profile.name}?`)) {
            approveManicurist(id);
            navigate('/admin/pending');
        }
    };

    const handleReject = () => {
        if (rejectionReason.trim()) {
            rejectManicurist(id, rejectionReason);
            navigate('/admin/pending');
        } else {
            alert('Por favor, indica un motivo de rechazo');
        }
    };

    if (!profile) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="pb-12 max-w-5xl">
            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Detalle de Verificación</h1>
                    <p className="text-gray-500">Revisa minuciosamente la información profesional del candidato</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleApprove}
                        className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                    >
                        <CheckCircle size={20} />
                        Aprobar Perfil
                    </button>
                    <button
                        onClick={() => setShowRejectModal(true)}
                        className="bg-red-50 text-red-500 border-2 border-red-100 px-8 py-3 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                        <XCircle size={20} />
                        Rechazar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full opacity-50 -mr-10 -mt-10" />

                        <div className="flex items-center gap-8 mb-10 relative z-10">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-primary-200">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-secondary-900 mb-2">{profile.name}</h2>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold uppercase tracking-widest">
                                        Pendiente
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium">Candidato PRO</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <InfoItem icon={<Mail />} label="Email" value={profile.email} />
                            <InfoItem icon={<Phone />} label="Teléfono" value={profile.phone} />
                            <InfoItem icon={<MapPin />} label="Ubicación" value={profile.location} />
                            <InfoItem icon={<Calendar />} label="Fecha Solicitud" value={profile.appliedDate} />
                        </div>

                        <div className="space-y-8 pt-8 border-t border-gray-50">
                            <div>
                                <h3 className="text-lg font-bold text-secondary-900 mb-3 flex items-center gap-2">
                                    <Briefcase size={20} className="text-primary-500" />
                                    Experiencia y Especialidades
                                </h3>
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <p className="text-secondary-800 font-bold mb-2">{profile.experience} años de experiencia profesional</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.specialties.split(',').map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-white border border-gray-100 text-primary-600 rounded-lg text-xs font-bold shadow-sm">
                                                {s.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-secondary-900 mb-3">Biografía de Presentación</h3>
                                <p className="text-gray-600 leading-relaxed italic">"{profile.bio}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio */}
                    {profile.portfolio && profile.portfolio.length > 0 && (
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                                <Star className="text-primary-500" fill="currentColor" />
                                Galería de Portafolio
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {profile.portfolio.map((img, idx) => (
                                    <motion.img
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        src={img}
                                        alt={`Portfolio ${idx + 1}`}
                                        className="w-full h-48 object-cover rounded-2xl border-2 border-white shadow-sm cursor-zoom-in"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">Checklist de Revisión</h3>
                            <ul className="space-y-4">
                                <CheckItem label="Calidad de imágenes" />
                                <CheckItem label="Coherencia en especialidades" />
                                <CheckItem label="Ubicación verificada" />
                                <CheckItem label="Información de contacto válida" />
                            </ul>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-secondary-900 mb-2">Rechazar Solicitud</h3>
                        <p className="text-gray-500 mb-8">
                            Indica el motivo por el cual el perfil de <span className="font-bold text-secondary-900">{profile.name}</span> no cumple con los estándares.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Ej: Las imágenes no tienen suficiente calidad..."
                            rows="4"
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all outline-none resize-none mb-8 font-medium"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="flex-1 px-4 py-4 text-gray-400 font-bold hover:text-secondary-900 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 px-4 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/25"
                            >
                                Confirmar Rechazo
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="font-bold text-secondary-900">{value}</p>
        </div>
    </div>
);

const CheckItem = ({ label }) => (
    <li className="flex items-center gap-3 text-sm font-medium text-secondary-100">
        <div className="w-5 h-5 rounded-full border border-secondary-600 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
        </div>
        {label}
    </li>
);

export default ProfileVerification;
