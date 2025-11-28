import React, { useState } from 'react';
import { Star, Send, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const reviewSchema = yup.object().shape({
    rating: yup.number().min(1, 'Por favor selecciona una calificación').required('Rating is required'),
    comment: yup.string().min(10, 'El comentario debe tener al menos 10 caracteres').required('Comment is required'),
});

const ReviewForm = ({ booking, onClose, onSubmit }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: ''
        }
    });

    const rating = watch('rating');
    const comment = watch('comment');

    const onFormSubmit = async (data) => {
        const reviewData = {
            bookingId: booking?.id,
            professionalId: booking?.professionalId,
            professionalName: booking?.professionalName || 'Professional',
            service: booking?.service || 'Service',
            rating: data.rating,
            comment: data.comment.trim(),
            date: new Date().toISOString(),
            clientName: 'Current User' // Would come from auth context
        };

        console.log('=== ENVIANDO RESEÑA ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Review Data:', JSON.stringify(reviewData, null, 2));
        console.log('======================');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSubmitted(true);

        // Call parent callback
        if (onSubmit) {
            onSubmit(reviewData);
        }

        // Close after showing success message
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 2000);
    };

    const handleRatingChange = (value) => {
        setValue('rating', value, { shouldValidate: true });
    };

    const handleTagClick = (tag) => {
        let newComment = comment;
        if (comment.includes(tag)) {
            newComment = comment.replace(tag, '').trim();
        } else {
            newComment = comment ? `${comment} ${tag}` : tag;
        }
        setValue('comment', newComment, { shouldValidate: true });
    };

    const StarRating = () => {
        return (
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star
                            className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                ? 'fill-primary-500 text-primary-500'
                                : 'text-gray-300'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const getRatingLabel = (rating) => {
        switch (rating) {
            case 1:
                return 'Muy malo';
            case 2:
                return 'Malo';
            case 3:
                return 'Regular';
            case 4:
                return 'Bueno';
            case 5:
                return 'Excelente';
            default:
                return 'Selecciona tu calificación';
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
                <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    ¡Gracias por tu reseña!
                </h3>
                <p className="text-gray-600">
                    Tu opinión ayuda a otros clientes a tomar mejores decisiones
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-serif font-bold">Deja tu Reseña</h2>
                        <p className="text-primary-100 text-sm mt-1">
                            Comparte tu experiencia con {booking?.professionalName || 'el profesional'}
                        </p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
                {/* Service Info */}
                {booking && (
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-4">
                            {booking.professionalImage && (
                                <img
                                    src={booking.professionalImage}
                                    alt={booking.professionalName}
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-200"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-900">{booking.professionalName}</h3>
                                <p className="text-sm text-gray-600">{booking.service}</p>
                                {booking.date && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(booking.date).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Rating */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                        ¿Cómo calificarías el servicio? *
                    </label>
                    <div className={`flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl border-2 ${errors.rating ? 'border-red-500' : 'border-transparent'}`}>
                        <StarRating />
                        <p className={`text-lg font-medium ${rating > 0 ? 'text-primary-600' : 'text-gray-500'}`}>
                            {getRatingLabel(rating)}
                        </p>
                    </div>
                    {errors.rating && (
                        <p className="text-red-500 text-sm mt-1 text-center">{errors.rating.message}</p>
                    )}
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Cuéntanos sobre tu experiencia *
                    </label>
                    <textarea
                        {...register('comment')}
                        placeholder="¿Qué te pareció el servicio? ¿Recomendarías a este profesional?"
                        rows="5"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none resize-none ${errors.comment
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary-400'
                            }`}
                    />
                    <div className="flex justify-between mt-2">
                        <p className={`text-xs ${errors.comment ? 'text-red-500' : 'text-gray-500'}`}>
                            {errors.comment ? errors.comment.message : 'Mínimo 10 caracteres'}
                        </p>
                        <p className="text-xs text-gray-500">
                            {comment.length}/10
                        </p>
                    </div>
                </div>

                {/* Quick Tags */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Aspectos destacados (opcional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Puntual',
                            'Profesional',
                            'Amable',
                            'Limpio',
                            'Creativo',
                            'Atento',
                            'Rápido',
                            'Detallista'
                        ].map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagClick(tag)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${comment.includes(tag)
                                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-primary-300'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Enviar Reseña
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

// Wrapper component for modal usage
export const ReviewFormModal = ({ isOpen, booking, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <ReviewForm booking={booking} onClose={onClose} onSubmit={onSubmit} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReviewForm;
