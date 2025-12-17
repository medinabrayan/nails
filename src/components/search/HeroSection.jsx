import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const HeroSection = () => {
    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
        // In a real app, this would navigate to the search results page or filter the list
        // window.location.href = '/search'; 
    };

    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop"
                    alt="Nail Salon Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[1px]"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        Find Your Perfect <br />
                        <span className="text-primary-300">Nail Artist</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Discover top-rated manicurists near you, compare prices, and book your next appointment in seconds.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <SearchBar onSearch={handleSearch} />
                </motion.div>

                {/* Quick Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/80"
                >
                    <span>Popular:</span>
                    {['Gel Manicure', 'Acrylics', 'Nail Art', 'Pedicure Spa'].map((tag) => (
                        <button key={tag} className="hover:text-white hover:underline decoration-primary-300 underline-offset-4 transition-all">
                            {tag}
                        </button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
