import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const images = [
    "https://i.imgur.com/3Ida69F.png",
    "https://i.imgur.com/0ONLGUT.png",
    "https://i.imgur.com/jur7F25.jpeg",
    "https://i.imgur.com/goprcUj.png",
    "https://i.imgur.com/bfo93aE.png",
    "https://i.imgur.com/SPOPGuA.png",
];

const Gallery = () => {
    const { t } = useTranslation();

    return (
        <section id="gallery" className="py-20 bg-primary-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">{t('landing.gallery.title')}</h2>
                    <div className="w-20 h-1 bg-primary-400 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        {t('landing.gallery.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
                        >
                            <img
                                src={src}
                                alt={`${t('landing.gallery.viewDesign')} ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="bg-white/90 text-secondary-900 px-6 py-2 rounded-full font-medium text-sm backdrop-blur-sm">
                                        {t('landing.gallery.viewDesign')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
