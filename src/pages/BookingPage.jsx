import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookingCalendar from '../components/booking/BookingCalendar';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import BookingSummary from '../components/booking/BookingSummary';
import PaymentButton from '../components/booking/PaymentButton';

const BookingPage = () => {
    const { t } = useTranslation();
    const { professionalId, serviceId } = useParams();
    const navigate = useNavigate();

    // Booking state
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');

    // Mock data - in real app, fetch based on IDs
    const professional = {
        id: professionalId || 1,
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
        specialty: "Master Nail Artist",
        location: "Downtown Manhattan, NY",
        rating: 4.9
    };

    const services = [
        {
            id: 1,
            name: "Classic Manicure",
            price: 35,
            duration: 45,
            description: "Traditional nail care with polish"
        },
        {
            id: 2,
            name: "Gel Manicure",
            price: 55,
            duration: 60,
            description: "Long-lasting gel polish"
        },
        {
            id: 3,
            name: "Acrylic Extensions",
            price: 85,
            duration: 120,
            description: "Full set of acrylic extensions"
        },
        {
            id: 4,
            name: "Spa Pedicure",
            price: 65,
            duration: 75,
            description: "Luxurious foot treatment"
        }
    ];

    // Mock booked slots
    const bookedSlots = [
        { date: new Date(2025, 11, 15), time: '10:00' },
        { date: new Date(2025, 11, 15), time: '14:30' },
        { date: new Date(2025, 11, 16), time: '11:00' },
    ];

    // Set initial service if serviceId provided
    React.useEffect(() => {
        if (serviceId && !selectedService) {
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) setSelectedService(service);
        }
    }, [serviceId]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reset time when date changes
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    const handleContinue = () => {
        if (selectedDate && selectedTime && selectedService) {
            setShowSummary(true);
        }
    };

    const handleConfirmBooking = () => {
        // Close summary and show payment in the main view
        setShowSummary(false);
    };

    const handlePaymentSuccess = (paymentResult) => {
        console.log('Booking completed successfully!', paymentResult);
        // In real app, save booking to database and redirect to confirmation page
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const handlePaymentError = (error) => {
        console.error('Payment failed:', error);
        alert(t('common.error'));
    };

    const isBookingComplete = selectedDate && selectedTime && selectedService;
    const bookingData = {
        professional,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        additionalNotes
    };

    const totalAmount = selectedService ? selectedService.price + (selectedService.price * 0.05) : 0;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-8">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>{t('booking.back')}</span>
                    </button>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{t('booking.title')}</h1>
                    <p className="text-primary-100">{t('booking.subtitle')}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Booking Steps */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Select Service */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedService ? 'bg-green-500 text-white' : 'bg-primary-600 text-white'
                                    }`}>
                                    {selectedService ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                                </div>
                                <h2 className="text-xl font-serif font-bold text-gray-900">{t('booking.selectService')}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {services.map(service => (
                                    <motion.button
                                        key={service.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleServiceSelect(service)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedService?.id === service.id
                                            ? 'border-primary-600 bg-primary-50 shadow-md'
                                            : 'border-gray-200 hover:border-primary-300 bg-white'
                                            }`}
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">{service.duration} min</span>
                                            <span className="font-bold text-primary-600">${service.price}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Select Date */}
                        <div className={selectedService ? '' : 'opacity-50 pointer-events-none'}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedDate ? 'bg-green-500 text-white' : 'bg-primary-600 text-white'
                                    }`}>
                                    {selectedDate ? <CheckCircle2 className="w-5 h-5" /> : '2'}
                                </div>
                                <h2 className="text-xl font-serif font-bold text-gray-900">{t('booking.selectDate')}</h2>
                            </div>
                            <BookingCalendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                                disabledDates={[]}
                            />
                        </div>

                        {/* Step 3: Select Time */}
                        <div className={selectedDate ? '' : 'opacity-50 pointer-events-none'}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedTime ? 'bg-green-500 text-white' : 'bg-primary-600 text-white'
                                    }`}>
                                    {selectedTime ? <CheckCircle2 className="w-5 h-5" /> : '3'}
                                </div>
                                <h2 className="text-xl font-serif font-bold text-gray-900">{t('booking.selectTime')}</h2>
                            </div>
                            <TimeSlotPicker
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onTimeSelect={handleTimeSelect}
                                bookedSlots={bookedSlots}
                            />
                        </div>

                        {/* Additional Notes */}
                        {isBookingComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <h3 className="font-semibold text-gray-900 mb-3">{t('booking.additionalNotes')}</h3>
                                <textarea
                                    value={additionalNotes}
                                    onChange={(e) => setAdditionalNotes(e.target.value)}
                                    placeholder={t('booking.notesPlaceholder')}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:outline-none resize-none"
                                    rows="3"
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Summary & Payment */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Professional Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">{t('booking.yourProfessional')}</h3>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={professional.image}
                                        alt={professional.name}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{professional.name}</h4>
                                        <p className="text-sm text-gray-600">{professional.specialty}</p>
                                        <p className="text-xs text-gray-500 mt-1">⭐ {professional.rating}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Summary */}
                            {isBookingComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                                >
                                    <h3 className="font-semibold text-gray-900 mb-4">{t('booking.bookingSummary')}</h3>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('common.price')}</span>
                                            <span className="font-medium text-gray-900">{selectedService.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('booking.calendar.selectDate')}</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('booking.selectTime')}</span>
                                            <span className="font-medium text-gray-900">{selectedTime}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('booking.duration')}</span>
                                            <span className="font-medium text-gray-900">{selectedService.duration} {t('common.minutes')}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('common.price')}</span>
                                            <span className="font-medium">${selectedService.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">{t('booking.serviceFee')}</span>
                                            <span className="font-medium">${(selectedService.price * 0.05).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                            <span>{t('booking.total')}</span>
                                            <span className="text-primary-600">${totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleContinue}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all"
                                        >
                                            {t('booking.reviewAndPay')}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Summary Modal */}
            <BookingSummary
                isOpen={showSummary}
                onClose={() => setShowSummary(false)}
                bookingData={bookingData}
                onConfirm={handleConfirmBooking}
            />

            <Footer />
        </div>
    );
};

export default BookingPage;
