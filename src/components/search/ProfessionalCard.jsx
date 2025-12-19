import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

const ProfessionalCard = ({ professional }) => {
    const navigate = useNavigate();

    // Default data if not provided
    const {
        id = 1,
        name = "Sarah Johnson",
        image = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        rating = 4.8,
        reviews = 124,
        distance = "1.2 km",
        specialty = "Nail Art Specialist",
        priceRange = "$$",
        nextAvailable = "Today, 2:00 PM"
    } = professional || {};

    const handleViewProfile = () => {
        navigate(`/professional/${id}`);
    };

    return (
        // CAMBIO PRINCIPAL: Se añadió 'h-64' para fijar la altura vertical
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col sm:flex-row h-64">

            {/* Image Section */}
            {/* Se usa 'sm:h-full' para que la imagen ocupe la altura fija en vista de escritorio */}
            <div className="sm:w-1/3 h-24 sm:h-full relative flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                    {priceRange}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-grow overflow-y-auto pr-2"> {/* Permite el scroll si el contenido es demasiado largo */}
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight">{name}</h3> {/* Ajuste de texto para ahorrar espacio */}
                            <p className="text-primary-600 font-medium text-sm">{specialty}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-lg flex-shrink-0">
                            <Star className="w-4 h-4 fill-primary-500 text-primary-500" />
                            <span className="font-bold text-gray-900">{rating}</span>
                            <span className="text-xs text-gray-500">({reviews})</span>
                        </div>
                    </div>

                    <div className="space-y-1 mt-3"> {/* Ajuste de espacio */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{distance} away</span> {/* Se añade truncate para texto largo */}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>Next slot: <span className="text-green-600 font-medium">{nextAvailable}</span></span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2 flex-shrink-0"> {/* Se añade flex-shrink-0 para que los botones no se encojan */}
                    <button className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-xs transition-colors">
                        Book Now
                    </button>
                    <button
                        onClick={handleViewProfile}
                        className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalCard;