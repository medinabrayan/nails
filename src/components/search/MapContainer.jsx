import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = ({ professionals, center }) => {
    const [selectedProfessional, setSelectedProfessional] = useState(null);

    // Mock data if no professionals passed
    const markers = professionals || [
        { id: 1, name: "Sarah Johnson", lat: 40.7128, lng: -74.0060, rating: 4.9 },
        { id: 2, name: "Glamour Nails", lat: 40.7150, lng: -74.0090, rating: 4.7 },
        { id: 3, name: "Artistic Touch", lat: 40.7110, lng: -74.0030, rating: 4.5 },
    ];

    // Determinar la vista inicial basada en el primer marcador, si existe
    const initialLat = markers[0]?.lat || 40.7128; // Si no hay, usa Nueva York por defecto
    const initialLng = markers[0]?.lng || -74.0060;

    // Vista inicial
    const [viewState, setViewState] = useState({
        longitude: center?.lng || initialLng,
        latitude: center?.lat || initialLat,
        zoom: 13
    });

    // Actualizar la vista cuando cambie el centro o los profesionales
    useEffect(() => {
        if (center) {
            setViewState(prev => ({
                ...prev,
                latitude: center.lat,
                longitude: center.lng,
                zoom: 13,
                transitionDuration: 1000
            }));
        } else if (professionals && professionals.length > 0) {
            setViewState(prev => ({
                ...prev,
                latitude: professionals[0].lat,
                longitude: professionals[0].lng,
                zoom: 13,
                transitionDuration: 1000
            }));
        }
    }, [center, professionals]);

    return (
        <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%' }}
            >
                {markers.map((pro) => (
                    <Marker
                        key={pro.id}
                        longitude={pro.lng}
                        latitude={pro.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedProfessional(pro);
                        }}
                    >
                        <div className="cursor-pointer transform hover:scale-110 transition-transform">
                            <div className="bg-primary-600 text-white p-2 rounded-full shadow-lg">
                                <MapPin size={24} />
                            </div>
                        </div>
                    </Marker>
                ))}

                {selectedProfessional && (
                    <Popup
                        longitude={selectedProfessional.lng}
                        latitude={selectedProfessional.lat}
                        anchor="top"
                        onClose={() => setSelectedProfessional(null)}
                        closeButton={true}
                        closeOnClick={false}
                        className="mapbox-popup"
                    >
                        <div className="p-2 min-w-[180px]">
                            <h3 className="font-bold text-gray-900 mb-1">{selectedProfessional.name}</h3>
                            <p className="text-sm text-gray-600">
                                ⭐ {selectedProfessional.rating || 'N/A'}
                            </p>
                            <button className="mt-2 w-full bg-primary-600 text-white text-xs py-1.5 rounded-md hover:bg-primary-700 transition-colors">
                                View Details
                            </button>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Warning Overlay for Missing API Key */}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-[10px] text-gray-600 px-2 py-1 rounded border border-gray-200 pointer-events-none shadow-sm">
                Mapbox API Key Required
            </div>
        </div>
    );
};

export default React.memo(MapContainer);
