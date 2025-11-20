import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TimeSlotPicker = ({ selectedDate, onTimeSelect, selectedTime, bookedSlots = [] }) => {
    // Generate time slots from 9 AM to 8 PM in 30-minute intervals
    const generateTimeSlots = () => {
        const slots = [];
        const startHour = 9; // 9 AM
        const endHour = 20; // 8 PM

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute of [0, 30]) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const displayTime = formatTime(hour, minute);
                slots.push({ time, displayTime });
            }
        }

        return slots;
    };

    const formatTime = (hour, minute) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    const timeSlots = generateTimeSlots();

    // Check if a time slot is booked
    const isSlotBooked = (time) => {
        if (!selectedDate) return false;

        return bookedSlots.some(slot => {
            const slotDate = new Date(slot.date);
            return slotDate.toDateString() === selectedDate.toDateString() && slot.time === time;
        });
    };

    // Check if time slot is in the past (for today's date)
    const isSlotPast = (time) => {
        if (!selectedDate) return false;

        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Only check for past times if selected date is today
        if (selectedDate.toDateString() !== today.toDateString()) {
            return false;
        }

        const [hours, minutes] = time.split(':').map(Number);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);

        return slotTime < now;
    };

    // Check if slot is selected
    const isSlotSelected = (time) => {
        return selectedTime === time;
    };

    // Get slot status
    const getSlotStatus = (time) => {
        if (isSlotPast(time)) return 'past';
        if (isSlotBooked(time)) return 'booked';
        if (isSlotSelected(time)) return 'selected';
        return 'available';
    };

    // Group slots by time of day
    const morningSlots = timeSlots.filter(slot => {
        const hour = parseInt(slot.time.split(':')[0]);
        return hour < 12;
    });

    const afternoonSlots = timeSlots.filter(slot => {
        const hour = parseInt(slot.time.split(':')[0]);
        return hour >= 12 && hour < 17;
    });

    const eveningSlots = timeSlots.filter(slot => {
        const hour = parseInt(slot.time.split(':')[0]);
        return hour >= 17;
    });

    const SlotButton = ({ slot }) => {
        const status = getSlotStatus(slot.time);
        const disabled = status === 'past' || status === 'booked';

        return (
            <motion.button
                whileHover={!disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                onClick={() => !disabled && onTimeSelect(slot.time)}
                disabled={disabled}
                className={`
                    relative px-4 py-3 rounded-xl font-medium text-sm transition-all
                    ${status === 'available'
                        ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-400 hover:bg-primary-50'
                        : ''
                    }
                    ${status === 'selected'
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 border-2 border-primary-600 text-white shadow-lg shadow-primary-200'
                        : ''
                    }
                    ${status === 'booked'
                        ? 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                        : ''
                    }
                    ${status === 'past'
                        ? 'bg-gray-50 border-2 border-gray-100 text-gray-300 cursor-not-allowed'
                        : ''
                    }
                `}
            >
                <div className="flex items-center justify-between gap-2">
                    <span>{slot.displayTime}</span>
                    {status === 'selected' && (
                        <CheckCircle2 className="w-4 h-4" />
                    )}
                    {status === 'booked' && (
                        <XCircle className="w-4 h-4" />
                    )}
                </div>
            </motion.button>
        );
    };

    if (!selectedDate) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Date First</h3>
                    <p className="text-gray-600">Please choose a date from the calendar to view available time slots</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                        <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-gray-900">
                            Select Time
                        </h3>
                        <p className="text-sm text-gray-600">
                            {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Morning Slots */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    Morning (9:00 AM - 12:00 PM)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {morningSlots.map(slot => (
                        <SlotButton key={slot.time} slot={slot} />
                    ))}
                </div>
            </div>

            {/* Afternoon Slots */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    Afternoon (12:00 PM - 5:00 PM)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {afternoonSlots.map(slot => (
                        <SlotButton key={slot.time} slot={slot} />
                    ))}
                </div>
            </div>

            {/* Evening Slots */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    Evening (5:00 PM - 8:00 PM)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {eveningSlots.map(slot => (
                        <SlotButton key={slot.time} slot={slot} />
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-gray-200 bg-white"></div>
                    <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-primary-600 to-primary-700"></div>
                    <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
                    <span className="text-gray-600">Booked</span>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotPicker;
