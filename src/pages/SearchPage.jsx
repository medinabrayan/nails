import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/search/HeroSection';
import ProfessionalCard from '../components/search/ProfessionalCard';
import MapContainer from '../components/search/MapContainer';
import { Map as MapIcon, List, Search, Compass, Loader2 } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';

// Fallback coordinates for common cities to improve centering when no pros are found
const CITY_COORDINATES = {
    'miami': { lat: 25.7617, lng: -80.1918 },
    'new york': { lat: 40.7128, lng: -74.0060 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'austin': { lat: 30.2672, lng: -97.7431 }
};

const MOCK_PROFESSIONALS = [
    {
        id: 1,
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 128,
        distance: "0.8 km",
        specialty: "Nail Art Specialist",
        priceRange: "$$",
        nextAvailable: "Today, 2:00 PM",
        lat: 40.7128,
        lng: -74.0060,
        location: 'Manhattan, NY'
    },
    {
        id: 2,
        name: "Luxe Nails by Emma",
        image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=1000&auto=format&fit=crop",
        rating: 4.7,
        reviews: 85,
        distance: "1.2 km",
        specialty: "Gel Extensions",
        priceRange: "$$$",
        nextAvailable: "Tomorrow, 10:00 AM",
        lat: 40.7150,
        lng: -74.0090,
        location: 'Brooklyn, NY'
    },
    {
        id: 3,
        name: "Polished Perfection",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop",
        rating: 4.5,
        reviews: 210,
        distance: "2.5 km",
        specialty: "Classic Manicure",
        priceRange: "$",
        nextAvailable: "Today, 4:30 PM",
        lat: 40.7110,
        lng: -74.0030,
        location: 'Queens, NY'
    },
    {
        id: 4,
        name: "Glamour Studio",
        image: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?q=80&w=1000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 56,
        distance: "3.0 km",
        specialty: "Pedicure Spa",
        priceRange: "$$",
        nextAvailable: "Fri, 11:00 AM",
        lat: 40.7180,
        lng: -74.0100,
        location: 'Hoboken, NJ'
    }
];

const SearchPage = () => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState('both'); // 'list', 'map', 'both' (desktop default)
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLocating, setIsLocating] = useState(false);
    const locationQuery = searchParams.get('location') || '';

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // In a real app, we would reverse geocode these coordinates
                    // For now, we'll just set a mock location or search by coordinates
                    setSearchParams({ location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` });
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsLocating(false);
                    alert("No pudimos obtener tu ubicación. Por favor, ingrésala manualmente.");
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
            setIsLocating(false);
        }
    };

    const filteredProfessionals = locationQuery
        ? MOCK_PROFESSIONALS.filter(pro =>
            pro.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
            pro.name.toLowerCase().includes(locationQuery.toLowerCase())
        )
        : MOCK_PROFESSIONALS;

    // Obtener coordenadas de la query si existen (formato: "lat, lng")
    const getCoordinatesFromQuery = () => {
        if (!locationQuery) return null;
        const parts = locationQuery.split(',').map(p => p.trim());
        if (parts.length === 2) {
            const lat = parseFloat(parts[0]);
            const lng = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
                return { lat, lng };
            }
        }
        return null;
    };

    const queryCoords = getCoordinatesFromQuery();

    // Mejorar el centrado: Si hay coordenadas en la query, usarlas. 
    // Si no, buscar si la query es una ciudad conocida.
    // Si no, usar la ubicación del primer profesional encontrado.
    const getMapCenter = () => {
        if (queryCoords) return queryCoords;

        if (locationQuery) {
            const city = locationQuery.toLowerCase();
            for (const [cityName, coords] of Object.entries(CITY_COORDINATES)) {
                if (city.includes(cityName)) return coords;
            }
        }

        if (filteredProfessionals.length > 0) {
            return { lat: filteredProfessionals[0].lat, lng: filteredProfessionals[0].lng };
        }

        return null;
    };

    const mapCenter = getMapCenter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero with Search */}
            <HeroSection />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                        {locationQuery ? (
                            <>{t('search.resultsFor')} <span className="text-primary-600">
                                {queryCoords ? `📍 ${t('search.myLocation')}` : `"${locationQuery}"`}
                            </span></>
                        ) : (
                            <>{t('search.results')} <span className="text-primary-600">{t('search.nearYou')}</span></>
                        )}
                    </h2>

                    {/* Mobile View Toggle & Geolocation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleGetLocation}
                            disabled={isLocating}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                        >
                            {isLocating ? <Loader2 size={18} className="animate-spin" /> : <Compass size={18} />}
                            <span className="hidden sm:inline">{t('search.myLocation')}</span>
                        </button>

                        <div className="md:hidden bg-white border border-gray-200 rounded-lg p-1 flex">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
                            >
                                <List size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}
                            >
                                <MapIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    {/* List View */}
                    <div className={`flex-1 space-y-6 ${viewMode === 'map' ? 'hidden lg:block' : 'block'}`}>
                        {filteredProfessionals.length > 0 ? (
                            filteredProfessionals.map((pro) => (
                                <ProfessionalCard key={pro.id} professional={pro} />
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-gray-300" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{t('search.noResults')}</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    {t('search.noResultsDescription', { location: queryCoords ? t('search.myLocation') : `"${locationQuery}"` })}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Map View */}
                    <div className={`lg:w-[45%] h-[calc(100vh-150px)] sticky top-24 ${viewMode === 'list' ? 'hidden lg:block' : 'block'}`}>
                        <MapContainer
                            professionals={filteredProfessionals}
                            center={mapCenter}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SearchPage;
