import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Save, User, Mail, Phone, MapPin, Briefcase, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const profileSchema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string(),
    experience: yup.string(),
    specialties: yup.string(),
    bio: yup.string(),
    location: yup.string(),
    preferences: yup.string(),
    favoriteServices: yup.string(),
});

const ProfileEdit = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            experience: '',
            specialties: '',
            bio: '',
            location: '',
            preferences: '',
            favoriteServices: '',
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                experience: user?.experience || '',
                specialties: user?.specialties || '',
                bio: user?.bio || '',
                location: user?.location || '',
                preferences: user?.preferences || '',
                favoriteServices: user?.favoriteServices || '',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        updateUser(data);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="pb-12 max-w-4xl">
            {/* Header Area */}
            <div className="mb-10">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">{t('profileEdit.title')}</h1>
                <p className="text-gray-500">{t('profileEdit.subtitle')}</p>
            </div>

            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-2xl"
                >
                    <p className="text-green-700 font-bold flex items-center gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                        {t('profileEdit.successMessage')}
                    </p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Section */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10">
                    <h2 className="text-xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                        <div className="p-2 bg-primary-50 rounded-xl text-primary-500">
                            <User size={20} />
                        </div>
                        {t('profileEdit.basicInfo')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.fullName')}</label>
                            <input
                                {...register('name')}
                                type="text"
                                className={`w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.email')}</label>
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.phone')}</label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Professional Section */}
                {user?.role === 'manicurist' && (
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10">
                    <h2 className="text-xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                            <div className="p-2 bg-primary-50 rounded-xl text-primary-500">
                                <Briefcase size={20} />
                            </div>
                            {t('profileEdit.professionalInfo')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.yearsExperience')}</label>
                                <input
                                    {...register('experience')}
                                    type="number"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium text-lg font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.location')}</label>
                                <input
                                    {...register('location')}
                                    type="text"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.specialties')}</label>
                                <input
                                    {...register('specialties')}
                                    type="text"
                                    placeholder={t('profileEdit.specialtiesPlaceholder')}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.bio')}</label>
                                <textarea
                                    {...register('bio')}
                                    rows="4"
                                    placeholder={t('profileEdit.bioPlaceholder')}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {user?.role === 'client' && (
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-primary-50 p-8 md:p-10">
                    <h2 className="text-xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                            <div className="p-2 bg-primary-50 rounded-xl text-primary-500">
                                <Heart size={20} />
                            </div>
                            {t('profileEdit.clientPreferences')}
                        </h2>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.favoriteServices')}</label>
                                <input
                                    {...register('favoriteServices')}
                                    type="text"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">{t('profileEdit.preferences')}</label>
                                <textarea
                                    {...register('preferences')}
                                    rows="4"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none font-medium resize-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-4">
<button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 text-gray-400 font-bold hover:text-secondary-900 transition-colors"
                    >
                        {t('profileEdit.cancel')}
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary-500 text-white px-12 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {isSubmitting ? t('profileEdit.saving') : t('profileEdit.saveChanges')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
