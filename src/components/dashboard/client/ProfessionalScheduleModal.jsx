import React from 'react';
import { X, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfessionalScheduleModal = ({ isOpen, onClose, professional, schedule }) => {
    if (!isOpen || !professional) return null;

    const days = [
        { key: 'monday', label: 'Lunes' },
        { key: 'tuesday', label: 'Martes' },
        { key: 'wednesday', label: 'Miércoles' },
        { key: 'thursday', label: 'Jueves' },
        { key: 'friday', label: 'Viernes' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-primary-500 p-8 text-white relative">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl shadow-lg">
                                {professional.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{professional.name}</h3>
                                <p className="text-primary-100 flex items-center gap-2 text-sm uppercase font-bold tracking-widest mt-1">
                                    <Clock size={14} />
                                    Horarios de Atención
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="space-y-3">
                            {days.map((day) => {
                                const dayData = schedule?.[day.key];
                                const isEnabled = dayData?.enabled;

                                return (
                                    <div
                                        key={day.key}
                                        className={`flex items-center justify-between p-4 rounded-2xl border ${isEnabled
                                                ? 'bg-white border-primary-50'
                                                : 'bg-gray-50 border-transparent opacity-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                                            <span className="font-bold text-secondary-900">{day.label}</span>
                                        </div>
                                        <div>
                                            {isEnabled ? (
                                                <span className="text-secondary-600 font-medium">
                                                    {dayData.startTime} - {dayData.endTime}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 italic text-sm">Cerrado</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-8 py-4 bg-secondary-900 text-white rounded-2xl font-bold hover:bg-secondary-800 transition-all shadow-xl shadow-secondary-900/20"
                        >
                            Entendido
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProfessionalScheduleModal;
