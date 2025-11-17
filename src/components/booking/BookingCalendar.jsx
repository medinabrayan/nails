import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingCalendar = ({ onDateSelect, selectedDate, disabledDates = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get first day of month and number of days
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Get today's date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Navigate months
    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    // Check if date is disabled
    const isDateDisabled = (date) => {
        // Disable past dates
        if (date < today) return true;

        // Check custom disabled dates
        return disabledDates.some(disabledDate =>
            disabledDate.toDateString() === date.toDateString()
        );
    };

    // Check if date is selected
    const isDateSelected = (date) => {
        if (!selectedDate) return false;
        return selectedDate.toDateString() === date.toDateString();
    };

    // Handle date click
    const handleDateClick = (day) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (!isDateDisabled(clickedDate)) {
            onDateSelect(clickedDate);
        }
    };

    // Generate calendar days
    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const disabled = isDateDisabled(date);
        const selected = isDateSelected(date);
        const isToday = date.toDateString() === today.toDateString();

        calendarDays.push(
            <motion.button
                key={day}
                whileHover={!disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(day)}
                disabled={disabled}
                className={`
                    aspect-square rounded-xl font-medium text-sm transition-all relative
                    ${disabled
                        ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                        : 'text-gray-700 hover:bg-primary-50 cursor-pointer'
                    }
                    ${selected
                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-200 hover:from-primary-700 hover:to-primary-800'
                        : ''
                    }
                    ${isToday && !selected
                        ? 'ring-2 ring-primary-400 ring-offset-2'
                        : ''
                    }
                `}
            >
                {day}
                {isToday && !selected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
            </motion.button>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">
                        Select Date
                    </h3>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <h4 className="text-lg font-semibold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>

                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-3">
                {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {calendarDays}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-primary-400"></div>
                    <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-primary-600 to-primary-700"></div>
                    <span className="text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-50 text-gray-300 flex items-center justify-center text-xs">×</div>
                    <span className="text-gray-600">Unavailable</span>
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;
