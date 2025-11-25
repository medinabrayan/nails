import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, DollarSign, Star, Calendar, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllServices, getServiceCategories, getApprovedManicurists, getScheduleByUser } from '../../../data/mockData';
import ProfessionalScheduleModal from './ProfessionalScheduleModal';

const AvailableOffers = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [professionals, setProfessionals] = useState([]);

    // Modal state
    const [selectedProf, setSelectedProf] = useState(null);
    const [profSchedule, setProfSchedule] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const allServices = getAllServices();
        const cats = ['All', ...getServiceCategories()];
        const pros = getApprovedManicurists();

        setServices(allServices);
        setFilteredServices(allServices);
        setCategories(cats);
        setProfessionals(pros);
    }, []);

    useEffect(() => {
        let result = services;

        if (searchTerm) {
            result = result.filter(s =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            result = result.filter(s => s.category === selectedCategory);
        }

        setFilteredServices(result);
    }, [searchTerm, selectedCategory, services]);

    const handleViewSchedule = (userId) => {
        const prof = professionals.find(p => p.id === userId);
        const schedule = getScheduleByUser(userId);

        setSelectedProf(prof);
        setProfSchedule(schedule.schedule);
        setIsModalOpen(true);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Explorar Ofertas</h1>
                <p className="text-gray-500">Descubre los mejores servicios y encuentra a tu profesional ideal</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-4 mb-10 border border-primary-50 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por servicio o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-primary-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            {filteredServices.length === 0 ? (
                <div className="bg-white rounded-[3rem] shadow-sm p-20 text-center border border-primary-50">
                    <Sparkles className="mx-auto text-gray-200 mb-6" size={64} />
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">No se encontraron ofertas</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">Prueba ajustando tus filtros o términos de búsqueda</p>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredServices.map((service) => {
                        const prof = professionals.find(p => p.id === service.userId);
                        return (
                            <motion.div
                                key={service.id}
                                variants={item}
                                className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 overflow-hidden hover:shadow-2xl transition-all group"
                            >
                                {/* Image Wrapper */}
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl font-bold text-primary-600 text-xs shadow-lg">
                                        {service.category}
                                    </div>
                                    <div className="absolute top-4 right-4 bg-secondary-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 text-xs font-bold">
                                        <Star size={12} className="text-yellow-400" fill="currentColor" />
                                        {prof?.rating || '4.8'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                {service.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                                <MapPin size={14} />
                                                {prof?.location || 'Ubicación no disponible'}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-secondary-900">${service.price}</span>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Copa</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 font-bold">
                                                {prof?.name?.charAt(0) || 'P'}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Profesional</p>
                                                <p className="text-sm font-bold text-secondary-900">{prof?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-400">
                                            <div className="flex items-center gap-1 text-sm font-medium">
                                                <Clock size={16} />
                                                {service.duration} min
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <button
                                            onClick={() => handleViewSchedule(service.userId)}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary-50 text-secondary-900 rounded-2xl font-bold text-sm hover:bg-secondary-100 transition-all border border-secondary-100"
                                        >
                                            <Calendar size={16} />
                                            Horarios
                                        </button>
                                        <button
                                            onClick={() => navigate(`/booking/${service.userId}/${service.id}`)}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-2xl font-bold text-sm hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25"
                                        >
                                            Agendar
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Schedule Modal */}
            <ProfessionalScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                professional={selectedProf}
                schedule={profSchedule}
            />
        </div>
    );
};

export default AvailableOffers;
