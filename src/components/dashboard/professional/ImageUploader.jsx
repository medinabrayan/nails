import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploader = ({ onUploadComplete, maxImages = 10 }) => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    // Cloudinary configuration (these would normally come from environment variables)
    const CLOUDINARY_CLOUD_NAME = "your_cloud_name"; // Replace with your Cloudinary cloud name
    const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Replace with your upload preset

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = async (files) => {
        const fileArray = Array.from(files);

        // Check if adding these files would exceed the limit
        if (images.length + fileArray.length > maxImages) {
            alert(`Solo puedes subir un máximo de ${maxImages} imágenes`);
            return;
        }

        // Validate file types
        const validFiles = fileArray.filter(file => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                alert(`${file.name} no es una imagen válida`);
            }
            return isImage;
        });

        if (validFiles.length === 0) return;

        setUploading(true);

        // Upload each file
        for (const file of validFiles) {
            await uploadToCloudinary(file);
        }

        setUploading(false);
    };

    const uploadToCloudinary = async (file) => {
        // Create preview immediately
        const preview = URL.createObjectURL(file);
        const tempId = Date.now() + Math.random();

        const newImage = {
            id: tempId,
            preview,
            status: 'uploading',
            file: file,
            url: null,
            publicId: null
        };

        setImages(prev => [...prev, newImage]);

        try {
            // Simulate Cloudinary upload
            // In production, you would use the actual Cloudinary API:
            /*
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();
            */

            // Simulated upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulated response
            const simulatedResponse = {
                secure_url: preview, // In production, this would be the Cloudinary URL
                public_id: `portfolio/${Date.now()}`,
                width: 800,
                height: 600
            };

            console.log('=== IMAGEN SUBIDA A CLOUDINARY ===');
            console.log('File:', file.name);
            console.log('Size:', (file.size / 1024).toFixed(2), 'KB');
            console.log('Type:', file.type);
            console.log('Cloudinary URL:', simulatedResponse.secure_url);
            console.log('Public ID:', simulatedResponse.public_id);
            console.log('==================================');

            // Update image with upload result
            setImages(prev => prev.map(img =>
                img.id === tempId
                    ? {
                        ...img,
                        status: 'success',
                        url: simulatedResponse.secure_url,
                        publicId: simulatedResponse.public_id
                    }
                    : img
            ));

            if (onUploadComplete) {
                onUploadComplete(simulatedResponse);
            }

        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);

            // Update image with error status
            setImages(prev => prev.map(img =>
                img.id === tempId
                    ? { ...img, status: 'error', error: error.message }
                    : img
            ));
        }
    };

    const removeImage = (id) => {
        setImages(images.filter(img => img.id !== id));

        // In production, you would also delete from Cloudinary:
        /*
        const image = images.find(img => img.id === id);
        if (image && image.publicId) {
            // Call Cloudinary delete API
        }
        */
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Portafolio de Imágenes</h3>
                <p className="text-gray-600">
                    Sube fotos de tus trabajos ({images.length}/{maxImages} imágenes)
                </p>
            </div>

            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${dragActive
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 bg-gray-50 hover:border-primary-400'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />

                <div className="text-center">
                    <div className="inline-flex p-4 bg-primary-100 rounded-full mb-4">
                        <Upload className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {dragActive ? 'Suelta las imágenes aquí' : 'Arrastra imágenes o haz clic para seleccionar'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Formatos soportados: JPG, PNG, GIF (máx. 10MB por imagen)
                    </p>
                    <button
                        onClick={onButtonClick}
                        disabled={uploading || images.length >= maxImages}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Seleccionar Imágenes
                    </button>
                </div>
            </div>

            {/* Uploading Indicator */}
            {uploading && (
                <div className="flex items-center justify-center gap-3 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                    <Loader className="w-5 h-5 text-primary-600 animate-spin" />
                    <span className="text-primary-700 font-medium">Subiendo imágenes...</span>
                </div>
            )}

            {/* Images Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {images.map((image) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group aspect-square bg-gray-100 rounded-xl overflow-hidden"
                            >
                                {/* Image */}
                                <img
                                    src={image.preview}
                                    alt="Portfolio"
                                    className="w-full h-full object-cover"
                                />

                                {/* Status Overlay */}
                                {image.status === 'uploading' && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Loader className="w-8 h-8 text-white animate-spin" />
                                    </div>
                                )}

                                {image.status === 'success' && (
                                    <div className="absolute top-2 right-2 p-1.5 bg-green-500 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                )}

                                {image.status === 'error' && (
                                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                        <div className="text-center">
                                            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                                            <p className="text-xs text-red-600 font-medium">Error al subir</p>
                                        </div>
                                    </div>
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute top-2 left-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                    <p className="text-white text-xs truncate">{image.file?.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Integration Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Configuración de Cloudinary
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                    <p>Para usar Cloudinary en producción:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Crea una cuenta en <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">cloudinary.com</a></li>
                        <li>Obtén tu Cloud Name y Upload Preset</li>
                        <li>Configura las variables de entorno en tu archivo <code className="bg-blue-100 px-1 rounded">.env</code></li>
                        <li>Descomenta el código de integración real en este componente</li>
                    </ol>
                    <p className="mt-2 text-xs">
                        Actualmente en modo simulación - las imágenes se muestran localmente
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
