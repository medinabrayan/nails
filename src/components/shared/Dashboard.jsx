import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { featuredReviews } from '../../data/mockData';
import { Scissors, Calendar, LayoutGrid, Award, Star, Clock, Mail, Briefcase, Sparkles, MapPin, Search, Compass, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchLocation, setSearchLocation] = React.useState('');
    const [isLocating, setIsLocating] = React.useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchLocation.trim()) {
            navigate(`/search?location=${encodeURIComponent(searchLocation)}`);
        } else {
            navigate('/search');
        }
    };

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Mock geocoding
                    setSearchLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsLocating(false);
                    alert("No pudimos obtener tu ubicación.");
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
            setIsLocating(false);
        }
    };

    const isManicurist = user?.role === 'manicurist';

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8">
            {/* Hero Profile Section */}
            <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl">
                {/* Background Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/90 via-purple-600/90 to-secondary-900/90 z-10" />

                {/* Abstract Background pattern */}
                <div className="absolute inset-0 opacity-20 z-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full blur-2xl -ml-10 -mb-10" />
                </div>

                {/* Profile Content */}
                <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-10 text-white">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-white/20 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-pink-500 opacity-80" />
                                <span className="relative z-10 text-4xl md:text-5xl font-bold">
                                    {user?.name?.slice(0, 1).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h1 className="text-3xl md:text-5xl font-serif font-bold">
                                        ¡Hola, {user?.name?.split(' ')[0]}!
                                    </h1>
                                    {isManicurist && (
                                        <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/30 tracking-wider uppercase flex items-center gap-1">
                                            <Award size={14} className="text-yellow-400" />
                                            PRO
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm md:text-base">
                                    <div className="flex items-center gap-1.5">
                                        <Mail size={16} />
                                        {user?.email}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase size={16} />
                                        {isManicurist ? 'Manicurista' : 'Cliente'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/profile/edit')}
                            className="px-6 py-2.5 bg-white text-secondary-900 rounded-2xl font-bold text-sm hover:bg-opacity-90 transition-all shadow-xl hover:scale-105 active:scale-95"
                        >
                            Editar Perfil
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* Stats / Status Section */}
                <motion.div variants={item} className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-secondary-900/5 border border-primary-50/50">
                        <h3 className="text-xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
                            <Star className="text-primary-500" fill="currentColor" size={20} />
                            Tu Estatus
                        </h3>

                        <div className="space-y-6">
                            {isManicurist ? (
                                <>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Experiencia</label>
                                        <p className="text-2xl font-bold text-secondary-800">{user?.experience} años</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Especialidades</label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {user?.specialties?.split(',').map((spec, i) => (
                                                <span key={i} className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-xs font-bold">
                                                    {spec.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="text-primary-500" />
                                    </div>
                                    <p className="text-gray-600">Comienza a agendar citas y obtén beneficios premium.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-[2rem] p-8 text-white shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                            <Sparkles size={80} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Próxima Actualización</h4>
                            <p className="text-secondary-100 text-sm mb-4">Estamos trabajando en un sistema de recompensas para clientes leales.</p>
                            <div className="h-1 w-12 bg-primary-500 rounded-full" />
                        </div>
                    </div>
                </motion.div>

                {/* Main Interaction Area */}
                <motion.div variants={item} className="md:col-span-2 space-y-8">

                    {/* Quick Actions for Manicurists */}
                    {isManicurist && (
                        <section>
                            <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6 flex items-center gap-3">
                                Acciones Rápidas
                                <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent ml-4" />
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Manage Services */}
                                <QuickActionCard
                                    icon={<Scissors />}
                                    title="Servicios"
                                    desc="Define tus especialidades"
                                    color="from-primary-500 to-pink-500"
                                    onClick={() => navigate('/services/manage')}
                                />
                                {/* Set Schedule */}
                                <QuickActionCard
                                    icon={<Calendar />}
                                    title="Horarios"
                                    desc="Tu disponibilidad"
                                    color="from-blue-500 to-indigo-600"
                                    onClick={() => navigate('/schedule/config')}
                                />
                                {/* Portfolio */}
                                <QuickActionCard
                                    icon={<LayoutGrid />}
                                    title="Portafolio"
                                    desc="Tus mejores trabajos"
                                    color="from-purple-500 to-fuchsia-600"
                                    onClick={() => navigate('/portfolio/manage')}
                                />
                            </div>
                        </section>
                    )}

                    {!isManicurist && (
                        <section>
                            <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6 flex items-center gap-3">
                                Encontrar Manicuristas
                                <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent ml-4" />
                            </h3>
                            <div className="bg-white rounded-[2rem] p-8 border border-primary-50/50 shadow-sm">
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={searchLocation.split(',').length === 2 && !isNaN(parseFloat(searchLocation)) ? '📍 Mi Ubicación' : searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                            placeholder="Ingresa tu ubicación (ej. Miami, FL)"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition-all font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleGetLocation}
                                            disabled={isLocating}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-xl text-primary-500 hover:text-primary-600 shadow-sm border border-gray-100 transition-all disabled:opacity-50"
                                            title="Usar mi ubicación actual"
                                        >
                                            {isLocating ? <Loader2 size={18} className="animate-spin" /> : <Compass size={18} />}
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
                                    >
                                        <Search size={20} />
                                        Buscar Ahora
                                    </button>
                                </form>
                                <p className="mt-4 text-sm text-gray-500 text-center md:text-left">
                                    Encuentra las mejores profesionales cerca de ti y agenda en segundos.
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Featured Reviews */}
                    {!isManicurist && (
                        <section>
                            <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6 flex items-center gap-3">
                                Reseñas Destacadas
                                <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent ml-4" />
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featuredReviews.map((review) => (
                                    <div key={review.id} className="bg-white p-5 rounded-2xl border border-primary-50 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">
                                                    {review.userName.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{review.userName}</span>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 italic">"{review.comment}"</p>
                                        <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                            <span>Para: {review.professionalName}</span>
                                            <span>{new Date(review.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Upcoming Appointments */}
                    <section>
                        <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6 flex items-center gap-3">
                            Próximas Citas
                            <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent ml-4" />
                        </h3>

                        <div className="bg-white rounded-[2rem] p-10 border border-primary-50/50 shadow-sm text-center">
                            <div className="inline-flex p-5 bg-primary-50 rounded-3xl mb-4 text-primary-500">
                                <Clock size={40} />
                            </div>
                            <h4 className="text-xl font-bold text-secondary-900 mb-2">No hay citas programadas</h4>
                            <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                {isManicurist
                                    ? 'Pronto recibirás notificaciones cuando los clientes agenden contigo.'
                                    : 'Es un buen momento para buscar a tu manicurista ideal y agendar tu primera sesión.'}
                            </p>
                            {!isManicurist && (
                                <button
                                    onClick={() => navigate('/search')}
                                    className="px-8 py-3 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/25"
                                >
                                    Explorar Servicios
                                </button>
                            )}
                        </div>
                    </section>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Sub-component for Quick Action Cards
const QuickActionCard = ({ icon, title, desc, color, onClick }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative overflow-hidden p-6 rounded-[1.5rem] cursor-pointer group h-full shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all`}
    >
        {/* Background Glass Layer */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-white/80 z-10" />

        {/* Colorful background pattern */}
        <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${color} z-20`} />

        <div className="relative z-20 flex items-start gap-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-xl shadow-black/10`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <h4 className="text-lg font-bold text-secondary-900 leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                    {title}
                </h4>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    {desc}
                </p>
            </div>
        </div>

        {/* Decorative circle */}
        <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br ${color} opacity-5 rounded-full z-0 group-hover:scale-150 transition-transform duration-700`} />
    </motion.div>
);

export default Dashboard;
