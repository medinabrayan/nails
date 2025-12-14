import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Star, MapPin, Clock, Phone, Mail, Share2, Heart,
    Award, Calendar, CheckCircle, Instagram, Facebook, MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PortfolioGallery from './PortfolioGallery';
import ServiceList from './ServiceList';
import ReviewList from './ReviewList';

const PublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('services'); // 'services', 'portfolio', 'reviews'
    const [isFavorite, setIsFavorite] = useState(false);

    // Mock professional data - in real app, fetch based on id
    const professional = {
        id: id || 1,
        name: "Sarah Johnson",
        title: "Master Nail Artist & Specialist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
        rating: 4.9,
        totalReviews: 128,
        yearsExperience: 8,
        completedServices: 1250,
        verified: true,
        bio: "Passionate nail artist with over 8 years of experience in creating beautiful, long-lasting nail designs. Specialized in gel extensions, intricate nail art, and natural nail care. I believe every client deserves personalized attention and stunning results that boost their confidence.",
        specialties: ["Gel Extensions", "Nail Art", "Natural Nail Care", "Spa Treatments"],
        location: "Downtown Manhattan, New York, NY",
        phone: "+1 (555) 123-4567",
        email: "sarah@nailsbysarah.com",
        workingHours: {
            monday: "9:00 AM - 7:00 PM",
            tuesday: "9:00 AM - 7:00 PM",
            wednesday: "9:00 AM - 7:00 PM",
            thursday: "9:00 AM - 7:00 PM",
            friday: "9:00 AM - 8:00 PM",
            saturday: "10:00 AM - 6:00 PM",
            sunday: "Closed"
        },
        social: {
            instagram: "@nailsbysarah",
            facebook: "NailsBySarah"
        },
        certifications: [
            "Licensed Nail Technician",
            "Gel Extension Specialist",
            "Nail Art Master Class Graduate"
        ]
    };

    const tabs = [
        { id: 'services', label: 'Services & Pricing' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'reviews', label: 'Reviews' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Cover Image */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary-400 to-primary-600 overflow-hidden">
                <img
                    src={professional.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Profile Header */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                src={professional.image}
                                alt={professional.name}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                            />
                            {professional.verified && (
                                <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                                        {professional.name}
                                    </h1>
                                    <p className="text-primary-600 font-medium text-lg mb-3">
                                        {professional.title}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 bg-primary-50 px-3 py-1.5 rounded-lg">
                                                <Star className="w-5 h-5 fill-primary-500 text-primary-500" />
                                                <span className="font-bold text-gray-900">{professional.rating}</span>
                                                <span className="text-gray-600">({professional.totalReviews} reviews)</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-gray-400" />
                                            <span>{professional.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className={`p-3 rounded-xl border-2 transition-all ${isFavorite
                                            ? 'bg-primary-50 border-primary-300 text-primary-600'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
                                            }`}
                                    >
                                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-primary-600' : ''}`} />
                                    </button>
                                    <button className="p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-600 hover:border-primary-300 transition-all">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/booking/${id}`)}
                                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all flex items-center gap-2"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Book Appointment
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <Award className="w-5 h-5 text-primary-600" />
                                        <p className="text-2xl font-bold text-gray-900">{professional.yearsExperience}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">Years Experience</p>
                                </div>
                                <div className="text-center border-x border-gray-200">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <CheckCircle className="w-5 h-5 text-primary-600" />
                                        <p className="text-2xl font-bold text-gray-900">{professional.completedServices}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">Services Completed</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <Star className="w-5 h-5 text-primary-600" />
                                        <p className="text-2xl font-bold text-gray-900">{professional.rating}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">Average Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* About */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">About</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">{professional.bio}</p>

                            <div className="space-y-3 mb-6">
                                <h4 className="font-semibold text-gray-900">Specialties</h4>
                                <div className="flex flex-wrap gap-2">
                                    {professional.specialties.map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900">Certifications</h4>
                                {professional.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                        <span>{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Contact</h3>
                            <div className="space-y-3">
                                <a href={`tel:${professional.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                                    <div className="p-2 bg-primary-50 rounded-lg">
                                        <Phone className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span>{professional.phone}</span>
                                </a>
                                <a href={`mailto:${professional.email}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors">
                                    <div className="p-2 bg-primary-50 rounded-lg">
                                        <Mail className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span className="text-sm">{professional.email}</span>
                                </a>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="p-2 bg-primary-50 rounded-lg">
                                        <MapPin className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span className="text-sm">{professional.location}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="font-semibold text-gray-900 mb-3">Social Media</h4>
                                <div className="flex gap-3">
                                    <a href="#" className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-green-500 text-white rounded-xl hover:shadow-lg transition-all">
                                        <MessageCircle className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary-600" />
                                Working Hours
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(professional.workingHours).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700 capitalize">{day}</span>
                                        <span className={hours === 'Closed' ? 'text-red-600' : 'text-gray-600'}>
                                            {hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
                            <div className="flex border-b border-gray-100">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 px-6 py-4 font-semibold transition-all relative ${activeTab === tab.id
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                            {activeTab === 'services' && <ServiceList />}
                            {activeTab === 'portfolio' && <PortfolioGallery />}
                            {activeTab === 'reviews' && <ReviewList />}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PublicProfile;
