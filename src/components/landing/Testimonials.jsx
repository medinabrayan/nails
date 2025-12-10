import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Regular Client",
        content: "The best nail salon I've ever been to! The attention to detail is unmatched and the atmosphere is so relaxing.",
        rating: 5
    },
    {
        name: "Emily Davis",
        role: "Bride",
        content: "They did my wedding nails and they were absolutely perfect. Lasted through the honeymoon too! Highly recommend.",
        rating: 5
    },
    {
        name: "Jessica Chen",
        role: "Fashion Blogger",
        content: "I'm always impressed by their creativity. I bring in complex designs and they nail it every single time.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">Client Love</h2>
                    <div className="w-20 h-1 bg-primary-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4 text-accent-500">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                            <div>
                                <h4 className="font-bold text-secondary-900">{testimonial.name}</h4>
                                <p className="text-sm text-primary-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
