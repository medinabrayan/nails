import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/dashboard');
        } catch (err) {
            setError('root', {
                type: 'manual',
                message: 'Failed to login. Please check your credentials.'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-primary-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to manage your appointments</p>
                </div>

                {errors.root && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
                        {errors.root.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                {...register('password')}
                                type="password"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
