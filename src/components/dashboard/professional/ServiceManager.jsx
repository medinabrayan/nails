import React, { useState, useEffect } from 'react';
import { Plus, Search, DollarSign, Clock, Grid } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { getServicesByUser, addService, updateService, deleteService, getServiceCategories } from '../../../data/mockData';
import ServiceCard from './ServiceCard';
import ServiceFormModal from './ServiceFormModal';

const ServiceManager = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const categories = ['All', ...getServiceCategories()];

    useEffect(() => {
        loadServices();
    }, [user]);

    useEffect(() => {
        filterServices();
    }, [services, searchTerm, selectedCategory]);

    const loadServices = () => {
        if (user) {
            const userServices = getServicesByUser('user-123');
            setServices(userServices);
        }
    };

    const filterServices = () => {
        let filtered = [...services];
        if (searchTerm) {
            filtered = filtered.filter(service =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(service => service.category === selectedCategory);
        }
        setFilteredServices(filtered);
    };

    const handleAddService = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleDeleteService = (serviceId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            deleteService(serviceId);
            loadServices();
        }
    };

    const handleSaveService = (serviceData) => {
        if (editingService) {
            updateService(editingService.id, serviceData);
        } else {
            addService('user-123', serviceData);
        }
        loadServices();
        setIsModalOpen(false);
        setEditingService(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Mis Servicios</h1>
                <p className="text-gray-500">Gestiona los tratamientos y precios que ofreces</p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Servicios</p>
                            <p className="text-3xl font-bold text-secondary-900">{services.length}</p>
                        </div>
                        <div className="p-3 bg-primary-50 rounded-2xl text-primary-500">
                            <Grid size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Precio Promedio</p>
                            <p className="text-3xl font-bold text-secondary-900">
                                ${services.length > 0 ? Math.round(services.reduce((acc, s) => acc + s.price, 0) / services.length) : 0}
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-2xl text-green-500">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Duración Promedio</p>
                            <p className="text-3xl font-bold text-secondary-900">
                                {services.length > 0 ? Math.round(services.reduce((acc, s) => acc + s.duration, 0) / services.length) : 0} min
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-[2rem] shadow-sm p-4 mb-8 border border-primary-50">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar servicios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-6 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddService}
                        className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        Nuevo Servicio
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
                <div className="bg-white rounded-[3rem] shadow-sm p-16 text-center border border-primary-50">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Grid size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                        {searchTerm || selectedCategory !== 'All' ? 'No se encontraron servicios' : 'Aún no tienes servicios'}
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        {searchTerm || selectedCategory !== 'All'
                            ? 'Prueba ajustando tu búsqueda o filtros'
                            : 'Comienza agregando tu primer servicio para que los clientes puedan agendarte'}
                    </p>
                    {!searchTerm && selectedCategory === 'All' && (
                        <button
                            onClick={handleAddService}
                            className="bg-primary-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 inline-flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Agregar Primer Servicio
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={handleEditService}
                            onDelete={handleDeleteService}
                            index={index}
                        />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <ServiceFormModal
                    service={editingService}
                    onSave={handleSaveService}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ServiceManager;
