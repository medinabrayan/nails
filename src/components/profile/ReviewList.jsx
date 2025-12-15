import React, { useState } from 'react';
import { Star, ThumbsUp, MoreVertical, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewList = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
    const [showAll, setShowAll] = useState(false);
    const [sortBy, setSortBy] = useState('recent'); // 'recent', 'highest', 'lowest'

    // Default reviews if none provided
    const defaultReviews = [
        {
            id: 1,
            userName: "Jessica Martinez",
            userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            rating: 5,
            date: "2024-12-08",
            comment: "Absolutely amazing experience! Sarah is so talented and professional. My gel manicure lasted for 3 weeks without any chips. The salon is clean and the atmosphere is so relaxing. Highly recommend!",
            helpful: 12,
            service: "Gel Manicure"
        },
        {
            id: 2,
            userName: "Emily Chen",
            userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            rating: 5,
            date: "2024-12-05",
            comment: "Best nail artist in the city! The attention to detail is incredible. I showed her a Pinterest inspiration and she recreated it perfectly. Will definitely be coming back!",
            helpful: 8,
            service: "Nail Art Design"
        },
        {
            id: 3,
            userName: "Amanda Rodriguez",
            userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            rating: 4,
            date: "2024-12-01",
            comment: "Great service and beautiful results. The only reason I'm not giving 5 stars is because I had to wait 15 minutes past my appointment time. But the quality of work made up for it!",
            helpful: 5,
            service: "Acrylic Extensions"
        },
        {
            id: 4,
            userName: "Sarah Thompson",
            userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
            rating: 5,
            date: "2024-11-28",
            comment: "I've been going to Sarah for over a year now and she never disappoints. Her work is consistently excellent and she's so friendly. The spa pedicure is heavenly!",
            helpful: 15,
            service: "Spa Pedicure"
        },
        {
            id: 5,
            userName: "Lisa Anderson",
            userImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
            rating: 5,
            date: "2024-11-25",
            comment: "Perfect gel extensions! They look so natural and feel lightweight. Sarah really knows what she's doing. The salon is also very clean and well-maintained.",
            helpful: 7,
            service: "Gel Extensions"
        },
        {
            id: 6,
            userName: "Maria Garcia",
            userImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop",
            rating: 4,
            date: "2024-11-20",
            comment: "Very good experience overall. The nail art was beautiful and exactly what I wanted. Pricing is fair for the quality you get.",
            helpful: 3,
            service: "Classic Manicure"
        }
    ];

    const reviewList = reviews.length > 0 ? reviews : defaultReviews;
    const displayedReviews = showAll ? reviewList : reviewList.slice(0, 3);

    // Calculate average rating if not provided
    const calculatedAverage = averageRating || (
        reviewList.reduce((sum, review) => sum + review.rating, 0) / reviewList.length
    ).toFixed(1);

    const calculatedTotal = totalReviews || reviewList.length;

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
        const count = reviewList.filter(r => r.rating === rating).length;
        const percentage = (count / reviewList.length) * 100;
        return { rating, count, percentage };
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="w-full">
            {/* Rating Overview */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 mb-8 border border-primary-100">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Average Rating */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-6xl font-bold text-gray-900 mb-2">{calculatedAverage}</div>
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 ${star <= Math.round(calculatedAverage)
                                            ? 'fill-primary-500 text-primary-500'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 font-medium">Based on {calculatedTotal} reviews</p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map(({ rating, count, percentage }) => (
                            <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-16">
                                    <span className="text-sm font-medium text-gray-700">{rating}</span>
                                    <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {displayedReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={review.userImage}
                                        alt={review.userName}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= review.rating
                                                                ? 'fill-primary-500 text-primary-500'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Service Badge */}
                            <div className="inline-block mb-3">
                                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                                    {review.service}
                                </span>
                            </div>

                            {/* Review Comment */}
                            <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                            {/* Helpful Button */}
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Helpful ({review.helpful})</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Show More Button */}
            {reviewList.length > 3 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300 rounded-xl font-semibold text-gray-700 transition-all"
                    >
                        {showAll ? 'Show Less' : `Show All ${reviewList.length} Reviews`}
                        <ChevronDown className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
