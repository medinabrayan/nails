// Mock data for manicurist verification system

export const pendingManicurists = [
    {
        id: 'pending-1',
        name: 'Sofia Martinez',
        email: 'sofia.martinez@email.com',
        phone: '+1 (555) 234-5678',
        role: 'manicurist',
        experience: 5,
        specialties: 'Gel nails, Nail art, Acrylic extensions',
        bio: 'Passionate nail artist with 5 years of experience. Specialized in creative nail art and gel manicures. I love bringing my clients\' visions to life!',
        location: 'Downtown, Miami, FL',
        status: 'pending',
        appliedDate: '2026-01-20',
        portfolio: [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
            'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
        ]
    },
    {
        id: 'pending-2',
        name: 'Isabella Chen',
        email: 'isabella.chen@email.com',
        phone: '+1 (555) 345-6789',
        role: 'manicurist',
        experience: 3,
        specialties: 'French manicure, Pedicure, Natural nail care',
        bio: 'Certified nail technician focused on natural nail health and classic styles. I believe in enhancing natural beauty.',
        location: 'Santa Monica, Los Angeles, CA',
        status: 'pending',
        appliedDate: '2026-01-22',
        portfolio: [
            'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400',
        ]
    },
    {
        id: 'pending-3',
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@email.com',
        phone: '+1 (555) 456-7890',
        role: 'manicurist',
        experience: 7,
        specialties: 'Luxury spa treatments, Gel polish, Nail extensions',
        bio: '7+ years creating beautiful nails. Trained in luxury spa techniques and the latest nail trends.',
        location: 'Manhattan, New York, NY',
        status: 'pending',
        appliedDate: '2026-01-23',
        portfolio: [
            'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
            'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
        ]
    },
    {
        id: 'pending-4',
        name: 'Olivia Thompson',
        email: 'olivia.thompson@email.com',
        phone: '+1 (555) 567-8901',
        role: 'manicurist',
        experience: 2,
        specialties: 'Minimalist designs, Press-on nails, Quick services',
        bio: 'Modern nail artist specializing in minimalist and trendy designs. Fast, efficient, and always on point!',
        location: 'South Austin, Austin, TX',
        status: 'pending',
        appliedDate: '2026-01-24',
        portfolio: []
    }
];

export const approvedManicurists = [
    {
        id: 'user-789', // Maria Garcia
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 111-2222',
        role: 'manicurist',
        experience: 10,
        specialties: 'All nail services, Nail art, Bridal nails',
        bio: 'Award-winning nail artist with a decade of experience.',
        location: 'Chicago, IL',
        status: 'approved',
        approvedDate: '2026-01-15',
        rating: 4.9
    },
    {
        id: 'user-456', // Elena Soler
        name: 'Elena Soler',
        email: 'elena.soler@email.com',
        phone: '+1 (555) 888-9999',
        role: 'manicurist',
        experience: 6,
        specialties: 'Acrílico, Pedicura, Masajes',
        bio: 'Especialista en acabados naturales y salud ungueal.',
        location: 'Miami, FL',
        status: 'approved',
        approvedDate: '2026-01-10',
        rating: 4.7
    },
    {
        id: 'user-111', // Lucia Mendez
        name: 'Lucia Mendez',
        email: 'lucia.mendez@email.com',
        phone: '+1 (555) 444-5555',
        role: 'manicurist',
        experience: 8,
        specialties: 'Nail Art 3D, Decoración Avanzada',
        bio: 'Artista creativa enfocada en diseños únicos y personalizados.',
        location: 'New York, NY',
        status: 'approved',
        approvedDate: '2026-01-05',
        rating: 4.9
    }
];

// In-memory storage (in a real app, this would be in a database)
let manicuristData = {
    pending: [...pendingManicurists],
    approved: [...approvedManicurists],
    rejected: []
};

// Helper functions
export const getPendingManicurists = () => {
    return manicuristData.pending;
};

export const getApprovedManicurists = () => {
    return manicuristData.approved;
};

export const getRejectedManicurists = () => {
    return manicuristData.rejected;
};

export const getManicuristById = (id) => {
    const allManicurists = [
        ...manicuristData.pending,
        ...manicuristData.approved,
        ...manicuristData.rejected
    ];
    return allManicurists.find(m => m.id === id);
};

export const approveManicurist = (id) => {
    const index = manicuristData.pending.findIndex(m => m.id === id);
    if (index !== -1) {
        const manicurist = manicuristData.pending.splice(index, 1)[0];
        manicurist.status = 'approved';
        manicurist.approvedDate = new Date().toISOString().split('T')[0];
        manicuristData.approved.push(manicurist);
        return true;
    }
    return false;
};

export const rejectManicurist = (id, reason = '') => {
    const index = manicuristData.pending.findIndex(m => m.id === id);
    if (index !== -1) {
        const manicurist = manicuristData.pending.splice(index, 1)[0];
        manicurist.status = 'rejected';
        manicurist.rejectedDate = new Date().toISOString().split('T')[0];
        manicurist.rejectionReason = reason;
        manicuristData.rejected.push(manicurist);
        return true;
    }
    return false;
};

export const getVerificationStats = () => {
    return {
        pending: manicuristData.pending.length,
        approved: manicuristData.approved.length,
        rejected: manicuristData.rejected.length,
        total: manicuristData.pending.length + manicuristData.approved.length + manicuristData.rejected.length
    };
};

// ==================== SERVICE MANAGEMENT ====================

// Mock services data
const mockServices = [
    {
        id: 'service-1',
        userId: 'user-789', // Maria Garcia
        name: 'Classic Manicure',
        description: 'Traditional manicure with nail shaping, cuticle care, and polish application',
        price: 35,
        duration: 45,
        category: 'Manicure',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'
    },
    {
        id: 'service-2',
        userId: 'user-789',
        name: 'Gel Manicure',
        description: 'Long-lasting gel polish manicure with UV curing',
        price: 55,
        duration: 60,
        category: 'Gel/Acrylic',
        image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400'
    },
    {
        id: 'service-3',
        userId: 'user-456', // Elena Soler
        name: 'Spa Pedicure',
        description: 'Luxurious pedicure with exfoliation, massage, and polish',
        price: 65,
        duration: 75,
        category: 'Pedicure',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400'
    },
    {
        id: 'service-4',
        userId: 'user-111', // Lucia Mendez
        name: 'Diseño 3D Floral',
        description: 'Arte en 3D hecho a mano con relieve y detalles artísticos',
        price: 85,
        duration: 120,
        category: 'Nail Art',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400'
    },
    {
        id: 'service-5',
        userId: 'user-456',
        name: 'Uñas Acrílicas Full Set',
        description: 'Set completo de extensiones en acrílico con acabado natural',
        price: 75,
        duration: 90,
        category: 'Gel/Acrylic',
        image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400'
    }
];

// In-memory storage for services
let servicesData = [...mockServices];
let serviceIdCounter = 6;

// Service CRUD functions
export const getServicesByUser = (userId) => {
    return servicesData.filter(service => service.userId === userId);
};

export const getAllServices = () => {
    return servicesData;
};

export const getServiceById = (serviceId) => {
    return servicesData.find(service => service.id === serviceId);
};

export const addService = (userId, serviceData) => {
    const newService = {
        id: `service-${serviceIdCounter++}`,
        userId,
        ...serviceData,
        createdAt: new Date().toISOString()
    };
    servicesData.push(newService);
    return newService;
};

export const updateService = (serviceId, serviceData) => {
    const index = servicesData.findIndex(service => service.id === serviceId);
    if (index !== -1) {
        servicesData[index] = {
            ...servicesData[index],
            ...serviceData,
            updatedAt: new Date().toISOString()
        };
        return servicesData[index];
    }
    return null;
};

export const deleteService = (serviceId) => {
    const index = servicesData.findIndex(service => service.id === serviceId);
    if (index !== -1) {
        servicesData.splice(index, 1);
        return true;
    }
    return false;
};

export const getServiceCategories = () => {
    return [
        'Manicure',
        'Pedicure',
        'Gel/Acrylic',
        'Nail Art',
        'Spa Treatment',
        'Other'
    ];
};

// ==================== SCHEDULE MANAGEMENT ====================

// Default schedule template
const getDefaultSchedule = () => ({
    monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    saturday: { enabled: false, startTime: '10:00', endTime: '14:00' },
    sunday: { enabled: false, startTime: '10:00', endTime: '14:00' }
});

// Mock schedule data
const mockSchedules = {
    'user-789': {
        userId: 'user-789',
        schedule: getDefaultSchedule()
    },
    'user-456': {
        userId: 'user-456',
        schedule: getDefaultSchedule()
    },
    'user-111': {
        userId: 'user-111',
        schedule: getDefaultSchedule()
    }
};

// In-memory storage for schedules
let schedulesData = { ...mockSchedules };

// Schedule CRUD functions
export const getScheduleByUser = (userId) => {
    if (schedulesData[userId]) {
        return schedulesData[userId];
    }
    return {
        userId,
        schedule: getDefaultSchedule()
    };
};

export const updateSchedule = (userId, scheduleData) => {
    schedulesData[userId] = {
        userId,
        schedule: scheduleData,
        updatedAt: new Date().toISOString()
    };
    return schedulesData[userId];
};

export const resetSchedule = (userId) => {
    schedulesData[userId] = {
        userId,
        schedule: getDefaultSchedule(),
        updatedAt: new Date().toISOString()
    };
    return schedulesData[userId];
};

export { getDefaultSchedule };

// ==================== APPOINTMENT MANAGEMENT ====================

const mockAppointments = [
    {
        id: 'appt-1',
        userId: 'current-user-id',
        professionalId: 'user-789', // Maria Garcia
        professionalName: 'Maria Garcia',
        serviceId: 'service-1',
        serviceName: 'Classic Manicure',
        date: '2026-01-20',
        time: '10:00',
        status: 'completed',
        reviewed: true,
        price: 35
    },
    {
        id: 'appt-2',
        userId: 'current-user-id',
        professionalId: 'user-456', // Elena Soler
        professionalName: 'Elena Soler',
        serviceId: 'service-3',
        serviceName: 'Spa Pedicure',
        date: '2026-02-01',
        time: '14:30',
        status: 'confirmed',
        reviewed: false,
        price: 65
    }
];

export const submitReview = (bookingId, reviewData) => {
    const index = appointmentsData.findIndex(appt => appt.id === bookingId);
    if (index !== -1) {
        appointmentsData[index].reviewed = true;
        // In a real app, we would add the review to a professional's review list
        console.log(`Review submitted for booking ${bookingId}:`, reviewData);
        return true;
    }
    return false;
};

let appointmentsData = [...mockAppointments];

export const getAppointmentsByUser = (userId) => {
    return appointmentsData.filter(appt => appt.userId === userId || userId === 'current-user-id');
};

export const featuredReviews = [
    {
        id: 1,
        userName: "Jessica Martinez",
        rating: 5,
        comment: "¡Increíble servicio! Mis uñas quedaron perfectas para mi boda.",
        professionalName: "Maria Garcia",
        date: "2026-01-15"
    },
    {
        id: 2,
        userName: "Emily Chen",
        rating: 5,
        comment: "La atención al detalle fue espectacular. ¡Muy recomendado!",
        professionalName: "Elena Soler",
        date: "2026-01-20"
    },
    {
        id: 3,
        userName: "Amanda R.",
        rating: 5,
        comment: "Puntualidad y profesionalismo. Volveré sin duda.",
        professionalName: "Lucia Mendez",
        date: "2026-01-22"
    }
];
