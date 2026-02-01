import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n, t } = useTranslation();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'es', label: t('language.spanish'), codeLabel: 'ES' },
        { code: 'en', label: t('language.english'), codeLabel: 'EN' },
        { code: 'pt', label: t('language.portuguese'), codeLabel: 'PT' },
    ];

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                title={t('language.select')}
            >
                <Globe size={20} />
                <span className="hidden sm:inline font-medium text-sm font-bold">{currentLanguage.codeLabel}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                        i18n.language === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-sm font-bold w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">{language.codeLabel}</span>
                                        <span>{language.label}</span>
                                    </span>
                                    {i18n.language === language.code && (
                                        <Check size={16} className="text-primary-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
