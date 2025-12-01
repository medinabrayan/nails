import React from 'react';
import { LayoutGrid } from 'lucide-react';
import ImageUploader from './ImageUploader';

const PortfolioManager = () => {
    const handleUploadComplete = (response) => {
        console.log('Imagen agregada al portafolio:', response);
    };

    return (
        <div className="pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-2">Mi Portafolio</h1>
                <p className="text-gray-500">Muestra tus mejores diseños para atraer más clientes</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-primary-50">
                <div className="p-6 md:p-10">
                    <ImageUploader
                        onUploadComplete={handleUploadComplete}
                        maxImages={10}
                    />
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-[2.5rem] p-8 text-white shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <LayoutGrid size={120} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center flex-shrink-0">
                        <LayoutGrid size={40} className="text-primary-300" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Consejo de Profesional</h3>
                        <p className="text-secondary-100 max-w-2xl text-lg leading-relaxed">
                            Las fotos de alta calidad y buena iluminación atraen <span className="text-primary-400 font-bold">3 veces más</span> reservas.
                            Te recomendamos subir capturas de tus diseños más creativos y variados.
                        </p>
                    </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl group-hover:bg-primary-500/30 transition-colors"></div>
            </div>
        </div>
    );
};

export default PortfolioManager;
