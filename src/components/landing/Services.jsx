import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Scissors, Hand } from 'lucide-react';

const services = [
    {
        icon: <Hand size={32} />,
        title: "Manicure",
        description: "Classic, Gel, and Spa manicures tailored to your needs. Includes shaping, cuticle care, and massage.",
        price: "from $25"
    },
    {
        icon: <Scissors size={32} />,
        title: "Pedicure",
        description: "Relaxing foot treatments to rejuvenate tired feet. Includes exfoliation, mask, and polish.",
        price: "from $35"
    },
    {
        icon: <Palette size={32} />,
        title: "Nail Art",
        description: "Custom designs from simple elegance to intricate masterpieces. Bring your inspiration or let us create.",
        price: "from $5/nail"
    },
    {
        icon: <Sparkles size={32} />,
        title: "Extensions",
        description: "Acrylic, Gel, and Dip Powder extensions for length and strength. Natural looking and durable.",
        price: "from $50"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">Our Services</h2>
                    <div className="w-20 h-1 bg-primary-400 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We offer a wide range of premium nail care services designed to pamper you and enhance your natural beauty.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-primary-50 p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-500 mb-6 shadow-sm group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                {service.description}
                            </p>
                            <p className="text-primary-600 font-bold font-serif">
                                {service.price}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
