import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Eye, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPendingManicurists, approveManicurist, rejectManicurist } from '../../../data/mockData';

const PendingProfiles = () => {
    const navigate = useNavigate();
    const [pendingProfiles, setPendingProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    useEffect(() => {
        loadProfiles();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = pendingProfiles.filter(profile =>
                profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProfiles(filtered);
        } else {
            setFilteredProfiles(pendingProfiles);
        }
    }, [searchTerm, pendingProfiles]);

    const loadProfiles = () => {
        setPendingProfiles(getPendingManicurists());
    };

    const handleApprove = (id, e) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que deseas aprobar este perfil?')) {
            approveManicurist(id);
            loadProfiles();
        }
    };

    const handleReject = (id, e) => {
        e.stopPropagation();
        const reason = window.prompt('Por favor, indica el motivo del rechazo (opcional):');
        if (reason !== null) {
            rejectManicurist(id, reason);
            loadProfiles();
        }
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Verificación de Perfiles</h1>
                        <p className="text-gray-500">Revisa y aprueba las solicitudes de nuevos manicuristas</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-primary-50 shadow-sm">
                        <Clock className="text-yellow-500" size={20} />
                        <span className="font-bold text-secondary-900">{filteredProfiles.length} pendientes</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-[2rem] shadow-sm p-4 mb-8 border border-primary-50">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o ubicación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>

            {/* Profiles List */}
            {filteredProfiles.length === 0 ? (
                <div className="bg-white rounded-[3rem] shadow-sm p-20 text-center border border-primary-50">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Clock size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        {searchTerm ? 'No se encontraron resultados' : '¡Todo libre!'}
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        {searchTerm ? 'Prueba con otros términos de búsqueda' : 'No hay solicitudes pendientes de revisión en este momento.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredProfiles.map((profile, index) => (
                            <motion.div
                                key={profile.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 overflow-hidden hover:shadow-xl transition-all group"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Avatar & Info */}
                                        <div className="flex items-start gap-6 flex-1">
                                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-200 flex-shrink-0">
                                                {profile.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-secondary-900">{profile.name}</h3>
                                                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-yellow-100">
                                                        Nuevo Candidato
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    {profile.location} • {profile.email}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-4 py-1.5 bg-primary-50 text-primary-600 rounded-xl text-xs font-bold">
                                                        {profile.experience} años exp.
                                                    </span>
                                                    <span className="px-4 py-1.5 bg-secondary-900/5 text-secondary-800 rounded-xl text-xs font-bold">
                                                        Aplicó: {profile.appliedDate}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-none">
                                                    <span className="font-bold text-secondary-900">Especialidades:</span> {profile.specialties}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-row lg:flex-col justify-center gap-3 min-w-[200px]">
                                            <button
                                                onClick={() => navigate(`/admin/verify/${profile.id}`)}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all font-bold text-sm"
                                            >
                                                <Eye size={20} />
                                                Detalles
                                            </button>
                                            <button
                                                onClick={(e) => handleApprove(profile.id, e)}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 font-bold text-sm"
                                            >
                                                <CheckCircle size={20} />
                                                Aprobar
                                            </button>
                                            <button
                                                onClick={(e) => handleReject(profile.id, e)}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-100 text-red-500 rounded-2xl hover:bg-red-50 transition-all font-bold text-sm"
                                            >
                                                <XCircle size={20} />
                                                Rechazar
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mini Portfolio Preview */}
                                    {profile.portfolio && profile.portfolio.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-gray-50">
                                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                                                {profile.portfolio.map((img, idx) => (
                                                    <div key={idx} className="flex-shrink-0 relative group/img overflow-hidden rounded-2xl">
                                                        <img
                                                            src={img}
                                                            alt={`Portfolio ${idx + 1}`}
                                                            className="w-32 h-32 object-cover border-2 border-white shadow-sm group-hover/img:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default PendingProfiles;
