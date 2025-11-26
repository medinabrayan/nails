import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, DollarSign, MoreVertical, XCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookings = () => {
    const [filter, setFilter] = useState('upcoming'); // 'upcoming', 'past', 'cancelled'

    const [bookings, setBookings] = useState([
        {
            id: 1,
            professionalName: "Sarah Johnson",
            professionalImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
            professionalRating: 4.9,
            service: "Gel Manicure",
            date: new Date(2025, 11, 20, 14, 30),
            duration: 60,
            price: 55,
            location: "Downtown Manhattan, NY",
            status: "confirmed", // confirmed, completed, cancelled
            canReview: false,
            bookingNumber: "BOOK-1234567"
        },
        {
            id: 2,
            professionalName: "Sarah Johnson",
            professionalImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
            professionalRating: 4.9,
            service: "Spa Pedicure",
            date: new Date(2025, 11, 25, 16, 0),
            duration: 75,
            price: 65,
            location: "Downtown Manhattan, NY",
            status: "confirmed",
            canReview: false,
            bookingNumber: "BOOK-1234568"
        },
        {
            id: 3,
            professionalName: "Emma Williams",
            professionalImage: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=200&auto=format&fit=crop",
            professionalRating: 4.7,
            service: "Acrylic Extensions",
            date: new Date(2025, 11, 5, 10, 0),
            duration: 120,
            price: 85,
            location: "Upper East Side, NY",
            status: "completed",
            canReview: true,
            bookingNumber: "BOOK-1234560"
        },
        {
            id: 4,
            professionalName: "Sarah Johnson",
            professionalImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
            professionalRating: 4.9,
            service: "Classic Manicure",
            date: new Date(2025, 10, 28, 15, 0),
            duration: 45,
            price: 35,
            location: "Downtown Manhattan, NY",
            status: "completed",
            canReview: false, // Already reviewed
            bookingNumber: "BOOK-1234555"
        },
        {
            id: 5,
            professionalName: "Lisa Anderson",
            professionalImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
            professionalRating: 4.8,
            service: "Nail Art Design",
            date: new Date(2025, 11, 18, 11, 0),
            duration: 90,
            price: 75,
            location: "Brooklyn, NY",
            status: "cancelled",
            canReview: false,
            bookingNumber: "BOOK-1234562"
        }
    ]);

    const getFilteredBookings = () => {
        const now = new Date();

        switch (filter) {
            case 'upcoming':
                return bookings.filter(b => b.status === 'confirmed' && new Date(b.date) >= now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'past':
                return bookings.filter(b => b.status === 'completed')
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'cancelled':
                return bookings.filter(b => b.status === 'cancelled')
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
            default:
                return bookings;
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
            case 'completed':
                return 'Completada';
            case 'cancelled':
                return 'Cancelada';
            default:
                return status;
        }
    };

    const handleCancelBooking = (id) => {
        if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            setBookings(bookings.map(b =>
                b.id === id ? { ...b, status: 'cancelled' } : b
            ));
            console.log('Reserva cancelada:', id);
        }
    };

    const filteredBookings = getFilteredBookings();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Mis Reservas</h2>
                <p className="text-gray-600 mt-1">Gestiona tus citas y revisa tu historial</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 bg-white rounded-xl p-2 border border-gray-200 w-fit">
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
                    onClick={() => setFilter('past')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${filter === 'past'
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Pasadas
                </button>
                <button
                    onClick={() => setFilter('cancelled')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${filter === 'cancelled'
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Canceladas
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Próximas Citas</p>
                    <p className="text-2xl font-bold text-green-600">
                        {bookings.filter(b => b.status === 'confirmed' && new Date(b.date) >= new Date()).length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-600 mb-1">Completadas</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {bookings.filter(b => b.status === 'completed').length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-4 border border-primary-100">
                    <p className="text-sm text-gray-600 mb-1">Total Gastado</p>
                    <p className="text-2xl font-bold text-primary-600">
                        ${bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)}
                    </p>
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No hay reservas para mostrar</p>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <motion.div
                            key={booking.id}
                            layout
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                {/* Professional Image */}
                                <img
                                    src={booking.professionalImage}
                                    alt={booking.professionalName}
                                    className="w-20 h-20 rounded-xl object-cover ring-2 ring-primary-100"
                                />

                                {/* Booking Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{booking.professionalName}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
                                                    <span className="text-sm font-medium text-gray-700">{booking.professionalRating}</span>
                                                </div>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-sm text-gray-600">{booking.service}</span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                            {getStatusLabel(booking.status)}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(booking.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>{formatTime(booking.date)} ({booking.duration} min)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{booking.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                            <DollarSign className="w-4 h-4 text-primary-600" />
                                            <span className="text-primary-600">${booking.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-500">
                                            Reserva #{booking.bookingNumber}
                                        </span>

                                        <div className="flex gap-2">
                                            {booking.status === 'confirmed' && (
                                                <>
                                                    <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                                        Ver Detalles
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'completed' && booking.canReview && (
                                                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                                    <Star className="w-4 h-4" />
                                                    Dejar Reseña
                                                </button>
                                            )}
                                            {booking.status === 'completed' && !booking.canReview && (
                                                <span className="text-sm text-gray-500 italic">Reseña enviada</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings;
