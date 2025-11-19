import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentButton = ({
    amount,
    bookingData,
    onPaymentSuccess,
    onPaymentError,
    disabled = false
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);

        // Log payment details to console
        console.log('=== PAYMENT INITIATED ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Amount:', `$${amount.toFixed(2)}`);
        console.log('Booking Details:', {
            professional: bookingData?.professional?.name || 'N/A',
            service: bookingData?.service?.name || 'N/A',
            date: bookingData?.date?.toLocaleDateString() || 'N/A',
            time: bookingData?.time || 'N/A',
            duration: bookingData?.service?.duration || 'N/A',
            location: bookingData?.professional?.location || 'N/A'
        });
        console.log('Payment Breakdown:', {
            servicePrice: bookingData?.service?.price || 0,
            serviceFee: (bookingData?.service?.price || 0) * 0.05,
            total: amount
        });
        console.log('========================');

        // Simulate payment processing (2-3 seconds)
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));

            // Simulate successful payment
            const paymentResult = {
                success: true,
                transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                amount: amount,
                timestamp: new Date().toISOString(),
                paymentMethod: 'Credit Card',
                bookingConfirmation: `BOOK-${Date.now()}`
            };

            console.log('=== PAYMENT SUCCESSFUL ===');
            console.log('Transaction ID:', paymentResult.transactionId);
            console.log('Booking Confirmation:', paymentResult.bookingConfirmation);
            console.log('Payment Method:', paymentResult.paymentMethod);
            console.log('==========================');

            setPaymentComplete(true);

            // Call success callback after animation
            setTimeout(() => {
                if (onPaymentSuccess) {
                    onPaymentSuccess(paymentResult);
                }
            }, 1500);

        } catch (error) {
            console.error('=== PAYMENT FAILED ===');
            console.error('Error:', error);
            console.error('======================');

            setIsProcessing(false);
            if (onPaymentError) {
                onPaymentError(error);
            }
        }
    };

    return (
        <div className="w-full">
            <motion.button
                whileHover={!disabled && !isProcessing ? { scale: 1.02 } : {}}
                whileTap={!disabled && !isProcessing ? { scale: 0.98 } : {}}
                onClick={handlePayment}
                disabled={disabled || isProcessing || paymentComplete}
                className={`
                    w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden
                    ${paymentComplete
                        ? 'bg-green-600 text-white'
                        : isProcessing
                            ? 'bg-primary-400 text-white cursor-wait'
                            : disabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg shadow-primary-200 hover:shadow-xl'
                    }
                `}
            >
                {/* Processing Animation */}
                {isProcessing && !paymentComplete && (
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.5, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                )}

                {/* Button Content */}
                <div className="relative flex items-center justify-center gap-3">
                    {paymentComplete ? (
                        <>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            >
                                <CheckCircle className="w-6 h-6" />
                            </motion.div>
                            <span>Payment Successful!</span>
                        </>
                    ) : isProcessing ? (
                        <>
                            <Loader className="w-6 h-6 animate-spin" />
                            <span>Processing Payment...</span>
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-6 h-6" />
                            <span>Pay ${amount.toFixed(2)}</span>
                            <Lock className="w-4 h-4 ml-1 opacity-70" />
                        </>
                    )}
                </div>
            </motion.button>

            {/* Security Badge */}
            {!paymentComplete && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock className="w-3 h-3" />
                    <span>Secure payment powered by Stripe</span>
                </div>
            )}

            {/* Success Message */}
            {paymentComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                    <p className="text-sm text-green-800 text-center">
                        Your booking has been confirmed! Check your email for details.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default PaymentButton;
