import React from 'react';
import { X, Calendar, Clock, DollarSign, User, MapPin, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentButton from './PaymentButton';

const BookingSummary = ({
    isOpen,
    onClose,
    bookingData,
    onConfirm
}) => {
    if (!isOpen || !bookingData) return null;

    const {
        professional = {},
        service = {},
        date = null,
        time = '',
        additionalNotes = ''
    } = bookingData;

    // Format date
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format time to 12-hour format
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Calculate total price (can add tax, fees, etc.)
    const subtotal = service.price || 0;
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + serviceFee;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-serif font-bold">Booking Summary</h2>
                                            <p className="text-primary-100 text-sm">Review your appointment details</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Professional Info */}
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <img
                                        src={professional.image || "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"}
                                        alt={professional.name}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{professional.name || 'Professional Name'}</h3>
                                        <p className="text-sm text-gray-600">{professional.specialty || 'Nail Specialist'}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-500">{professional.location || 'Location'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Details */}
                                <div className="space-y-4">
                                    <h3 className="font-serif font-bold text-lg text-gray-900">Service Details</h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Service */}
                                        <div className="p-4 border-2 border-primary-100 rounded-xl bg-primary-50/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 bg-primary-100 rounded-lg">
                                                    <User className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Service</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">{service.name || 'Service Name'}</p>
                                            <p className="text-sm text-gray-600 mt-1">{service.duration || 60} minutes</p>
                                        </div>

                                        {/* Date */}
                                        <div className="p-4 border-2 border-primary-100 rounded-xl bg-primary-50/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 bg-primary-100 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Date</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">{formatDate(date)}</p>
                                        </div>

                                        {/* Time */}
                                        <div className="p-4 border-2 border-primary-100 rounded-xl bg-primary-50/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 bg-primary-100 rounded-lg">
                                                    <Clock className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Time</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">{formatTime(time)}</p>
                                        </div>

                                        {/* Price */}
                                        <div className="p-4 border-2 border-primary-100 rounded-xl bg-primary-50/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-1.5 bg-primary-100 rounded-lg">
                                                    <DollarSign className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Service Price</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                {additionalNotes && (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                                        <p className="text-gray-700 text-sm">{additionalNotes}</p>
                                    </div>
                                )}

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Service Price</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Service Fee (5%)</span>
                                        <span className="font-medium">${serviceFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span className="text-primary-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Important Info */}
                                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary-600" />
                                        Important Information
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-0.5">•</span>
                                            <span>Please arrive 5-10 minutes before your appointment</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-0.5">•</span>
                                            <span>Cancellations must be made at least 24 hours in advance</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-0.5">•</span>
                                            <span>A confirmation email will be sent to your registered email</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all"
                                    >
                                        Confirm & Pay
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookingSummary;
