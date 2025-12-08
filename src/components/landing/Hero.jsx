import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Hero = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAction = (path) => {
        if (user) {
            navigate(path);
        } else {
            navigate('/login');
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.imgur.com/eDFXxTy.jpeg"
                    alt="Nail Art Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-lg md:text-xl font-medium tracking-[0.2em] uppercase mb-4 text-primary-200">
                        Premium Nail Care
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                        Beauty at Your <br />
                        <span className="text-primary-300">Fingertips</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                        Indulge in a luxurious experience where art meets wellness.
                        We bring your dream designs to life with precision and care.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleAction('/offers')}
                            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Book Appointment
                        </button>
                        <button
                            onClick={() => handleAction('/offers')}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2"
                        >
                            View Services <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
