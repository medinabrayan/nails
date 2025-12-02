import React, { useState, useEffect } from 'react';
import { Save, Calendar, Clock, Copy, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { getScheduleByUser, updateSchedule, getDefaultSchedule } from '../../../data/mockData';

const ScheduleConfig = () => {
    const { user } = useAuth();

    const [schedule, setSchedule] = useState(getDefaultSchedule());
    const [hasChanges, setHasChanges] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const days = [
        { key: 'monday', label: 'Lunes' },
        { key: 'tuesday', label: 'Martes' },
        { key: 'wednesday', label: 'Miércoles' },
        { key: 'thursday', label: 'Jueves' },
        { key: 'friday', label: 'Viernes' },
        { key: 'saturday', label: 'Sábado' },
        { key: 'sunday', label: 'Domingo' }
    ];

    useEffect(() => {
        loadSchedule();
    }, [user]);

    const loadSchedule = () => {
        if (user) {
            const userSchedule = getScheduleByUser('user-123');
            setSchedule(userSchedule.schedule);
        }
    };

    const handleToggleDay = (day) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled
            }
        }));
        setHasChanges(true);
    };

    const handleTimeChange = (day, field, value) => {
        setSchedule(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value
            }
        }));
        setHasChanges(true);
    };

    const handleSetAllDays = () => {
        const firstEnabledDay = days.find(d => schedule[d.key].enabled);
        if (!firstEnabledDay) return;

        const template = schedule[firstEnabledDay.key];
        const newSchedule = {};

        days.forEach(day => {
            newSchedule[day.key] = {
                enabled: schedule[day.key].enabled,
                startTime: template.startTime,
                endTime: template.endTime
            };
        });

        setSchedule(newSchedule);
        setHasChanges(true);
    };

    const handleBusinessHours = () => {
        const newSchedule = {};
        days.forEach(day => {
            newSchedule[day.key] = {
                ...schedule[day.key],
                startTime: '09:00',
                endTime: '17:00'
            };
        });
        setSchedule(newSchedule);
        setHasChanges(true);
    };

    const handleReset = () => {
        if (window.confirm('¿Estás seguro de que deseas resetear al horario por defecto?')) {
            setSchedule(getDefaultSchedule());
            setHasChanges(true);
        }
    };

    const handleSave = () => {
        updateSchedule('user-123', schedule);
        setHasChanges(false);
        setSaveMessage('¡Horario guardado exitosamente!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const getDayColor = (enabled) => {
        return enabled
            ? 'bg-white border-primary-100 shadow-sm'
            : 'bg-gray-50 border-gray-100 opacity-60';
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Mi Horario</h1>
                <p className="text-gray-500">Define tu disponibilidad semanal para que los clientes agenden</p>
            </div>

            {/* Success Message */}
            {saveMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-2xl"
                >
                    <p className="text-green-700 font-bold flex items-center gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                        {saveMessage}
                    </p>
                </motion.div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-primary-50 p-6 mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Acciones Rápidas</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleSetAllDays}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-bold text-sm"
                    >
                        <Copy size={18} />
                        Aplicar 1er día a todos
                    </button>
                    <button
                        onClick={handleBusinessHours}
                        className="flex items-center gap-2 px-6 py-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-all font-bold text-sm"
                    >
                        <Clock size={18} />
                        Horario Comercial (9-5)
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm"
                    >
                        <RotateCcw size={18} />
                        Resetear
                    </button>
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="space-y-4 mb-10">
                {days.map((day, index) => (
                    <motion.div
                        key={day.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-[2rem] border-2 transition-all p-6 ${getDayColor(schedule[day.key].enabled)}`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex items-center gap-6 md:w-56">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={schedule[day.key].enabled}
                                        onChange={() => handleToggleDay(day.key)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                </div>
                                <label className="font-bold text-xl text-secondary-900">
                                    {day.label}
                                </label>
                            </div>

                            {schedule[day.key].enabled ? (
                                <div className="flex flex-1 items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Inicio</span>
                                        </div>
                                        <input
                                            type="time"
                                            value={schedule[day.key].startTime}
                                            onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-bold text-lg"
                                        />
                                    </div>
                                    <div className="pt-6 text-primary-200">
                                        —
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 text-gray-400">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Fin</span>
                                        </div>
                                        <input
                                            type="time"
                                            value={schedule[day.key].endTime}
                                            onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-bold text-lg"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 text-gray-300 flex items-center gap-3 font-medium italic">
                                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                    Cerrado / No disponible
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Save Button */}
            <div className="sticky bottom-6 z-10 w-full">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none mb-1">Estado</p>
                        <p className={`text-xl font-bold ${hasChanges ? 'text-primary-600' : 'text-gray-400'}`}>
                            {hasChanges ? 'Cambios pendientes' : 'Horario actualizado'}
                        </p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`w-full md:w-auto flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-bold transition-all ${hasChanges
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:-translate-y-0.5'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <Save size={20} />
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleConfig;
