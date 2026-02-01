import React from 'react';
import { useTranslation } from 'react-i18next';

const BookingCTA = () => {
    const { t } = useTranslation();

    return (
        <section id="booking" className="py-20 bg-primary-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-dots"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">{t('landing.bookingCTA.title')}</h2>
                <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                    {t('landing.bookingCTA.subtitle')}
                </p>
                <button className="bg-white text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-100 transition-colors shadow-lg transform hover:scale-105 transition-transform">
                    {t('landing.bookingCTA.button')}
                </button>
            </div>
        </section>
    );
};

export default BookingCTA;
