import React, { useEffect } from 'react';
import { X, Save, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getServiceCategories } from '../../../data/mockData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const serviceSchema = yup.object().shape({
    name: yup.string().required('Service name is required'),
    category: yup.string().required('Category is required'),
    description: yup.string().required('Description is required'),
    image: yup.string().url('Must be a valid URL').nullable(),
    price: yup.number().typeError('Price must be a number').positive('Price must be greater than 0').required('Price is required'),
    duration: yup.number().typeError('Duration must be a number').positive('Duration must be greater than 0').integer('Duration must be an integer').required('Duration is required'),
});

const ServiceFormModal = ({ service, onSave, onClose }) => {
    const categories = getServiceCategories();

    const { register, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm({
        resolver: yupResolver(serviceSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',
            duration: '',
            category: 'Manicure',
            image: ''
        },
        mode: 'onChange'
    });

    const imageUrl = watch('image');

    useEffect(() => {
        if (service) {
            reset({
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
                category: service.category,
                image: service.image || ''
            });
        }
    }, [service, reset]);

    const onSubmit = (data) => {
        onSave({
            ...data,
            price: parseFloat(data.price),
            duration: parseInt(data.duration)
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-2xl font-bold text-white">
                        {service ? 'Edit Service' : 'Add New Service'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Service Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Name *
                        </label>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="e.g., Classic Manicure"
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.name
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-primary-500'
                                }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            {...register('category')}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            {...register('image')}
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.image
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-primary-500'
                                }`}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                        {imageUrl && !errors.image && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL'; }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            {...register('description')}
                            placeholder="Describe what's included in this service..."
                            rows="4"
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors resize-none ${errors.description
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:border-primary-500'
                                }`}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Price and Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price ($) *
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    {...register('price')}
                                    type="number"
                                    placeholder="35"
                                    step="0.01"
                                    className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.price
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-200 focus:border-primary-500'
                                        }`}
                                />
                            </div>
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes) *
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    {...register('duration')}
                                    type="number"
                                    placeholder="45"
                                    step="5"
                                    className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.duration
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-200 focus:border-primary-500'
                                        }`}
                                />
                            </div>
                            {errors.duration && (
                                <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            {service ? 'Update Service' : 'Add Service'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ServiceFormModal;
