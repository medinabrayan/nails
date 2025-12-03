import React from 'react';
import { Edit, Trash2, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, onEdit, onDelete, index }) => {
    const getCategoryColor = (category) => {
        const colors = {
            'Manicure': 'bg-pink-100 text-pink-700',
            'Pedicure': 'bg-purple-100 text-purple-700',
            'Gel/Acrylic': 'bg-blue-100 text-blue-700',
            'Nail Art': 'bg-yellow-100 text-yellow-700',
            'Spa Treatment': 'bg-green-100 text-green-700',
            'Other': 'bg-gray-100 text-gray-700'
        };
        return colors[category] || colors['Other'];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
        >
            {/* Service Image */}
            <div className="h-40 overflow-hidden relative">
                <img
                    src={service.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getCategoryColor(service.category)}`}>
                        {service.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-secondary-900 mb-1">
                            {service.name}
                        </h3>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                </p>

                {/* Price and Duration */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-green-600">
                        <DollarSign size={18} />
                        <span className="font-bold text-lg">${service.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                        <Clock size={18} />
                        <span className="font-medium">{service.duration} min</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(service)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                        <Edit size={16} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(service.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
