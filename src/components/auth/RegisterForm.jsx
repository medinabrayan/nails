import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Briefcase, Loader2, Sparkles, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
    role: yup.string().oneOf(['client', 'manicurist']).required(),
    name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    experience: yup.string().when('role', {
        is: 'manicurist',
        then: (schema) => schema.required('Experience is required'),
        otherwise: (schema) => schema.nullable().notRequired()
    }),
    specialties: yup.string().when('role', {
        is: 'manicurist',
        then: (schema) => schema.required('Specialties are required'),
        otherwise: (schema) => schema.nullable().notRequired()
    }),
    location: yup.string().when('role', {
        is: 'manicurist',
        then: (schema) => schema.required('Location is required'),
        otherwise: (schema) => schema.nullable().notRequired()
    })
});

const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('client');

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, setValue, trigger } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            role: 'client',
            name: '',
            email: '',
            password: '',
            experience: '',
            specialties: '',
            location: ''
        },
        mode: 'onChange' // Validate on change for better feedback
    });

    useEffect(() => {
        setValue('role', selectedRole);
        // Clear errors for fields that might disappear
        if (selectedRole === 'client') {
            setValue('experience', '');
            setValue('specialties', '');
            setValue('location', '');
        }
    }, [selectedRole, setValue]);

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate('/dashboard');
        } catch (err) {
            setError('root', {
                type: 'manual',
                message: 'Failed to create account. Please try again.'
            });
        }
    };

    const handleRoleChange = (newRole) => {
        setSelectedRole(newRole);
        setValue('role', newRole);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-primary-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-2">Create Account</h2>
                    <p className="text-gray-500">Join our community of beauty enthusiasts</p>
                </div>

                {/* Role Selection */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                    <button
                        type="button"
                        onClick={() => handleRoleChange('client')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${selectedRole === 'client' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        I'm a Client
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('manicurist')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${selectedRole === 'manicurist' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        I'm a Manicurist
                    </button>
                </div>

                {errors.root && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
                        {errors.root.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...register('name')}
                                type="text"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="Jane Doe"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...register('password')}
                                type="password"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {selectedRole === 'manicurist' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register('experience')}
                                        type="number"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.experience ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="e.g. 5"
                                    />
                                </div>
                                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                                <div className="relative">
                                    <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register('specialties')}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.specialties ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="e.g. Gel, Acrylic, Nail Art"
                                    />
                                </div>
                                {errors.specialties && <p className="text-red-500 text-xs mt-1">{errors.specialties.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register('location')}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.location ? 'border-red-500' : 'border-gray-200'}`}
                                        placeholder="e.g. Miami, FL"
                                    />
                                </div>
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
