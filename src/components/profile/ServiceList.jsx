import React from 'react';
import { Clock, DollarSign, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceList = ({ services = [] }) => {
    // Default services if none provided
    const defaultServices = [
        {
            id: 1,
            name: "Classic Manicure",
            description: "Traditional nail care with polish application, cuticle treatment, and hand massage",
            price: 35,
            duration: 45,
            popular: false,
            features: ["Nail shaping", "Cuticle care", "Hand massage", "Polish application"]
        },
        {
            id: 2,
            name: "Gel Manicure",
            description: "Long-lasting gel polish that stays chip-free for up to 3 weeks",
            price: 55,
            duration: 60,
            popular: true,
            features: ["Gel polish", "UV curing", "Lasts 3 weeks", "Chip-resistant"]
        },
        {
            id: 3,
            name: "Acrylic Extensions",
            description: "Full set of acrylic nail extensions with custom shape and length",
            price: 85,
            duration: 120,
            popular: true,
            features: ["Custom length", "Shape design", "Strengthening", "Natural look"]
        },
        {
            id: 4,
            name: "Spa Pedicure",
            description: "Luxurious foot treatment with exfoliation, massage, and polish",
            price: 65,
            duration: 75,
            popular: false,
            features: ["Foot soak", "Exfoliation", "Massage", "Nail care"]
        },
        {
            id: 5,
            name: "Nail Art Design",
            description: "Custom artistic designs on your nails - from simple to intricate",
            price: 25,
            duration: 30,
            popular: false,
            features: ["Custom design", "Hand-painted", "Unique patterns", "Add-on service"]
        },
        {
            id: 6,
            name: "Gel Extensions",
            description: "Natural-looking gel extensions that are lighter than acrylics",
            price: 95,
            duration: 90,
            popular: true,
            features: ["Lightweight", "Natural flex", "Damage-free", "Long-lasting"]
        }
    ];

    const serviceList = services.length > 0 ? services : defaultServices;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceList.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${service.popular
                                ? 'border-primary-300 ring-2 ring-primary-100'
                                : 'border-gray-100 hover:border-primary-200'
                            }`}
                    >
                        {/* Popular Badge */}
                        {service.popular && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl shadow-lg flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wide">Popular</span>
                                </div>
                            </div>
                        )}

                        <div className="p-6">
                            {/* Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-5 space-y-2">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-primary-600" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Price and Duration */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="p-1.5 bg-primary-50 rounded-lg">
                                            <DollarSign className="w-4 h-4 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Price</p>
                                            <p className="text-lg font-bold text-gray-900">${service.price}</p>
                                        </div>
                                    </div>

                                    <div className="w-px h-10 bg-gray-200"></div>

                                    <div className="flex items-center gap-1.5">
                                        <div className="p-1.5 bg-primary-50 rounded-lg">
                                            <Clock className="w-4 h-4 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Duration</p>
                                            <p className="text-lg font-bold text-gray-900">{service.duration} min</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Book Button */}
                                <button className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${service.popular
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300'
                                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                                    }`}>
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Decorative gradient border on hover */}
                        <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${service.popular ? 'bg-gradient-to-br from-primary-50/50 to-transparent' : ''
                            }`}></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceList;
