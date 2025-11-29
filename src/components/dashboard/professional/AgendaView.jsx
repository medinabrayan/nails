import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const AgendaView = () => {
    const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'today', 'all'

    // Mock appointments data
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            clientName: "María García",
            clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            clientPhone: "+1 (555) 123-4567",
            clientEmail: "maria@example.com",
            service: "Gel Manicure",
            date: new Date(2025, 11, 15, 14, 30),
            duration: 60,
            price: 55,
            status: "confirmed", // confirmed, pending, completed, cancelled
            notes: "Cliente prefiere colores nude"
        },
        {
            id: 2,
            clientName: "Ana Rodríguez",
            clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            clientPhone: "+1 (555) 987-6543",
            clientEmail: "ana@example.com",
            service: "Acrylic Extensions",
            date: new Date(2025, 11, 15, 16, 0),
            duration: 120,
            price: 85,
            status: "confirmed",
            notes: ""
        },
        {
            id: 3,
            clientName: "Laura Martínez",
            clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            clientPhone: "+1 (555) 456-7890",
            clientEmail: "laura@example.com",
            service: "Spa Pedicure",
            date: new Date(2025, 11, 16, 10, 0),
            duration: 75,
            price: 65,
            status: "pending",
            notes: "Primera vez"
        },
        {
            id: 4,
            clientName: "Carmen López",
            clientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
            clientPhone: "+1 (555) 321-0987",
            clientEmail: "carmen@example.com",
            service: "Classic Manicure",
            date: new Date(2025, 11, 14, 15, 0),
            duration: 45,
            price: 35,
            status: "completed",
            notes: ""
        }
    ]);

    const getFilteredAppointments = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        switch (filter) {
            case 'today':
                return appointments.filter(apt => {
                    const aptDate = new Date(apt.date);
                    return aptDate >= today && aptDate < tomorrow;
                });
            case 'upcoming':
                return appointments.filter(apt => {
                    return new Date(apt.date) >= now && apt.status !== 'completed' && apt.status !== 'cancelled';
                }).sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'all':
            default:
                return appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'confirmed':
                return 'Confirmada';
            case 'pending':
                return 'Pendiente';
            case 'completed':
                return 'Completada';
            case 'cancelled':
                return 'Cancelada';
            default:
                return status;
        }
    };

    const updateStatus = (id, newStatus) => {
        setAppointments(appointments.map(apt =>
            apt.id === id ? { ...apt, status: newStatus } : apt
        ));
    };

    const filteredAppointments = getFilteredAppointments();

    // Group appointments by date
    const groupedAppointments = filteredAppointments.reduce((groups, apt) => {
        const dateKey = apt.date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(apt);
        return groups;
    }, {});

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Mi Agenda</h2>
                    <p className="text-gray-600 mt-1">Gestiona tus citas próximas</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 bg-white rounded-xl p-2 border border-gray-200 w-fit">
                <button
                    onClick={() => setFilter('today')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${filter === 'today'
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Hoy
                </button>
                <button
                    onClick={() => setFilter('upcoming')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${filter === 'upcoming'
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Próximas
                </button>
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${filter === 'all'
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Todas
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Confirmadas</p>
                    <p className="text-2xl font-bold text-green-600">
                        {appointments.filter(a => a.status === 'confirmed').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-4 border border-yellow-100">
                    <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {appointments.filter(a => a.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-600 mb-1">Completadas</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {appointments.filter(a => a.status === 'completed').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-4 border border-primary-100">
                    <p className="text-sm text-gray-600 mb-1">Ingresos</p>
                    <p className="text-2xl font-bold text-primary-600">
                        ${appointments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0)}
                    </p>
                </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-6">
                {Object.keys(groupedAppointments).length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No hay citas para mostrar</p>
                    </div>
                ) : (
                    Object.entries(groupedAppointments).map(([date, apts]) => (
                        <div key={date}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">{date}</h3>
                            <div className="space-y-3">
                                {apts.map((apt) => (
                                    <motion.div
                                        key={apt.id}
                                        layout
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Client Image */}
                                            <img
                                                src={apt.clientImage}
                                                alt={apt.clientName}
                                                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100"
                                            />

                                            {/* Appointment Details */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-900">{apt.clientName}</h4>
                                                        <p className="text-primary-600 font-medium">{apt.service}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                                                        {getStatusLabel(apt.status)}
                                                    </span>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-3 mb-3">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{formatTime(apt.date)} ({apt.duration} min)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-4 h-4" />
                                                        <a href={`tel:${apt.clientPhone}`} className="hover:text-primary-600">
                                                            {apt.clientPhone}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Mail className="w-4 h-4" />
                                                        <a href={`mailto:${apt.clientEmail}`} className="hover:text-primary-600 truncate">
                                                            {apt.clientEmail}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                        <span>Precio:</span>
                                                        <span className="text-primary-600">${apt.price}</span>
                                                    </div>
                                                </div>

                                                {apt.notes && (
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-medium">Nota:</span> {apt.notes}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Actions */}
                                                {apt.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => updateStatus(apt.id, 'confirmed')}
                                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            Confirmar
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(apt.id, 'cancelled')}
                                                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                )}
                                                {apt.status === 'confirmed' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => updateStatus(apt.id, 'completed')}
                                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            Marcar Completada
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(apt.id, 'cancelled')}
                                                            className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AgendaView;
