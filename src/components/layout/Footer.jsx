import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-primary-300 mb-6">LuxeNails</h3>
                        <p className="text-gray-400 mb-6">
                            Experience the art of beauty with our premium nail care services. Dedicated to perfection and your satisfaction.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors">Home</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Services</a></li>
                            <li><a href="#gallery" className="text-gray-400 hover:text-primary-400 transition-colors">Gallery</a></li>
                            <li><a href="#booking" className="text-gray-400 hover:text-primary-400 transition-colors">Book Appointment</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin size={20} className="text-primary-400 mt-1" />
                                <span>123 Beauty Avenue, Suite 101<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={20} className="text-primary-400" />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={20} className="text-primary-400" />
                                <span>hello@luxenails.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} LuxeNails. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
