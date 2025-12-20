import React, { useState } from 'react';
import { Search, Filter, Star, DollarSign } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        serviceType: '',
        minPrice: '',
        maxPrice: '',
        minRating: 0,
    });
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch({ query, ...filters });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto relative z-20">
            <form onSubmit={handleSearch} className="relative">
                <div className="flex flex-col md:flex-row gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20">
                    {/* Main Search Input */}
                    <div className="flex-1 flex items-center px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-100 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                        <Search className="text-gray-400 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Find services (e.g., Gel Manicure) or specialists..."
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Toggle (Mobile/Desktop) */}
                    <button
                        type="button"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                            isFiltersOpen
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Filter size={18} />
                        <span className="hidden md:inline">Filters</span>
                    </button>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-lg shadow-primary-600/30 transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                        Search
                    </button>
                </div>

                {/* Expanded Filters Panel */}
                {isFiltersOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-top-2 z-30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Service Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Service Type</label>
                                <select
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all"
                                    value={filters.serviceType}
                                    onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
                                >
                                    <option value="">All Services</option>
                                    <option value="manicure">Manicure</option>
                                    <option value="pedicure">Pedicure</option>
                                    <option value="nail-art">Nail Art</option>
                                    <option value="extensions">Extensions</option>
                                    <option value="removal">Removal</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full pl-8 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                        />
                                    </div>
                                    <span className="text-gray-400">-</span>
                                    <div className="relative flex-1">
                                        <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full pl-8 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Minimum Rating</label>
                                <div className="flex gap-2">
                                    {[4, 3, 2, 1].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFilters({ ...filters, minRating: star })}
                                            className={`flex-1 py-2 rounded-lg border transition-all flex justify-center items-center gap-1 ${
                                                filters.minRating === star
                                                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="font-medium">{star}+</span>
                                            <Star size={14} className={filters.minRating === star ? 'fill-primary-700' : ''} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
