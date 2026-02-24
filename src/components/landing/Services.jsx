import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Scissors, Hand } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Hand size={32} />,
            title: t('landing.services.items.manicure.title'),
            description: t('landing.services.items.manicure.description'),
            price: t('landing.services.items.manicure.price')
        },
        {
            icon: <Scissors size={32} />,
            title: t('landing.services.items.pedicure.title'),
            description: t('landing.services.items.pedicure.description'),
            price: t('landing.services.items.pedicure.price')
        },
        {
            icon: <Palette size={32} />,
            title: t('landing.services.items.nailArt.title'),
            description: t('landing.services.items.nailArt.description'),
            price: t('landing.services.items.nailArt.price')
        },
        {
            icon: <Sparkles size={32} />,
            title: t('landing.services.items.extensions.title'),
            description: t('landing.services.items.extensions.description'),
            price: t('landing.services.items.extensions.price')
        }
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                        {t('landing.services.title')}
                    </h2>
                    <div className="w-20 h-1 bg-primary-400 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        {t('landing.services.subtitle')}
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
