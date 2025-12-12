import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <a href="#" className="text-2xl font-serif font-bold text-primary-700">
                    Luxe<span className="text-secondary-900">Nails</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-secondary-900 hover:text-primary-600 font-medium transition-colors">
                            {link.name}
                        </a>
                    ))}
                    <Link to="/search" className="text-secondary-900 hover:text-primary-600 font-medium transition-colors">
                        Find Artists
                    </Link>

                    {isAuthenticated ? (
                        <Link to="/dashboard" className="text-secondary-900 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
                            <User size={18} />
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="text-secondary-900 hover:text-primary-600 font-medium transition-colors">
                            Login
                        </Link>
                    )}

                    <a href="#booking" className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors flex items-center gap-2">
                        <Calendar size={18} />
                        Book Now
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-secondary-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-secondary-900 font-medium hover:text-primary-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/search"
                                className="text-secondary-900 font-medium hover:text-primary-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Find Artists
                            </Link>

                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className="text-secondary-900 font-medium hover:text-primary-600 flex items-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User size={18} />
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-secondary-900 font-medium hover:text-primary-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            )}

                            <a
                                href="#booking"
                                className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Book Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
