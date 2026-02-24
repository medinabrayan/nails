# 💅 NailConnect - Plataforma de Reservas de Uñas

<div align="center">

**A modern, full-featured React application for booking nail appointments**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-ES%2FEN%2FPT-green)](https://react.i18next.com/)

[🎨 Vistas](#-vistas-principales) • [✨ Features](#-features) • [📦 Instalación](#-installation) • [🛠️ Tech Stack](#-tech-stack)

</div>

---

## 📸 Vistas Principales

### 👥 Matriz de Permisos por Rol

A continuación se detalla qué vistas están disponibles para cada tipo de usuario en la plataforma:

| Vista | Ruta | 🙋 Cliente | 💅 Manicurista | 🔐 Admin |
|-------|------|:----------:|:--------------:|:--------:|
| **🏠 Landing Page** | `/` | ✅ | ✅ | ✅ |
| **🔐 Login** | `/login` | ✅ | ✅ | ✅ |
| **📝 Registro** | `/register` | ✅ | ✅ | ✅ |
| **🔍 Buscar Profesionales** | `/search` | ✅ | ✅ | ✅ |
| **👤 Perfil Profesional** | `/professional/:id` | ✅ | ✅ | ✅ |
| **📅 Reservar Cita** | `/booking/:proId/:serviceId` | ✅ | ❌ | ❌ |
| **📊 Dashboard** | `/dashboard` | ✅ | ✅ | ✅ |
| **🎯 Explorar Ofertas** | `/offers` | ✅ | ❌ | ❌ |
| **📋 Mi Historial** | `/history` | ✅ | ❌ | ❌ |
| **⭐ Dejar Reseña** | Modal en historial | ✅ | ❌ | ❌ |
| **✏️ Editar Perfil** | `/profile/edit` | ✅ | ✅ | ❌ |
| **⚙️ Mis Servicios** | `/services/manage` | ❌ | ✅ | ❌ |
| **🕐 Configurar Horarios** | `/schedule/config` | ❌ | ✅ | ❌ |
| **🖼️ Mi Portafolio** | `/portfolio/manage` | ❌ | ✅ | ❌ |
| **📅 Mi Agenda** | `/agenda` | ❌ | ✅ | ❌ |
| **⚡ Panel Admin** | `/admin` | ❌ | ❌ | ✅ |
| **✅ Verificar Perfiles** | `/admin/pending` | ❌ | ❌ | ✅ |

#### Leyenda de Permisos:
- ✅ **Acceso Total** - El usuario puede ver y utilizar todas las funcionalidades
- ❌ **Sin Acceso** - La vista no está disponible para este rol
- 🔒 **Protegido** - Requiere autenticación previa

#### Resumen por Rol:

**🙋 Cliente (Usuario Normal)**
- Puede buscar profesionales y ver sus perfiles
- Puede reservar citas y gestionar sus reservas
- Tiene acceso a "Explorar Ofertas" y "Mi Historial"
- Puede dejar reseñas sobre servicios recibidos
- Puede editar su perfil personal

**💅 Manicurista**
- Tiene todas las funcionalidades del cliente excepto "Explorar Ofertas"
- Puede gestionar sus servicios, horarios y portafolio
- Tiene acceso a la agenda de citas
- Puede ver y editar su información profesional

**🔐 Administrador**
- Tiene acceso al panel de administración exclusivo
- Puede verificar y aprobar perfiles de manicuristas
- Puede gestionar el estado de los usuarios en la plataforma
- Tiene acceso completo a todas las funcionalidades de cliente y manicurista

---

### 🏠 1. Landing Page
**Ruta:** `/` | **Rol:** Público

Página de inicio cautivadora que presenta la plataforma:

```
┌─────────────────────────────────────────────────────┐
│  [Logo]      Home  Services  Gallery  [Login]       │
├─────────────────────────────────────────────────────┤
│                                                     │
│   PREMIUM NAIL CARE                                 │
│   Beauty at Your Fingertips                        │
│                                                     │
│   [Book Appointment]  [View Services]              │
│                                                     │
│   ↓ Scroll indicator                                │
└─────────────────────────────────────────────────────┘
```

**Secciones:**
- 🎨 **Hero Section**: Imagen de fondo impactante con título principal y botones CTA
- 💅 **Services**: Grid de servicios populares (Manicure, Pedicure, Nail Art)
- 🖼️ **Gallery**: Portafolio de trabajos realizados con diseños impresionantes
- ⭐ **Testimonials**: Opiniones de clientes satisfechos
- 📞 **CTA Final**: Llamado a la acción para reservar

**Features:**
- Navegación sticky con efecto blur al hacer scroll
- Selector de idioma (ES/EN/PT) integrado
- Animaciones suaves con Framer Motion
- 100% responsive

---

### 🔐 2. Login / Registro
**Rutas:** `/login` | `/register` | **Rol:** Público

Sistema de autenticación elegante y seguro:

```
┌─────────────────────────────────────────────────────┐
│  ← Back                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Welcome Back                                      │
│   Sign in to manage your appointments               │
│                                                     │
│   📧 Email                                           │
│   🔒 Password                                        │
│                                                     │
│   [        Sign In        ]                          │
│                                                     │
│   Don't have an account? Sign up                   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Validación en tiempo real con Yup
- Iconos intuitivos (Mail, Lock)
- Mensajes de error personalizados
- Botón "Volver" al landing page
- Toggle entre Cliente y Manicurista en registro
- Campos específicos por rol (experiencia, especialidades)

---

### 📊 3. Dashboard Principal
**Ruta:** `/dashboard` | **Roles:** Cliente / Manicurista

Panel de control personalizado según el rol:

```
┌─────────────────────────────────────────────────────┐
│ [≡]  Nails Studio                                   │
├──────────┬──────────────────────────────────────────┤
│          │  👋 Hello, Maria!              [PRO]     │
│  🏠 Home  │  📧 maria@email.com  💼 Manicurist     │
│          │                                          │
│  ✨ Offers│  ┌─────────────┐  ┌──────────────────┐  │
│  📅 History   │ Experience  │  │ Quick Actions    │  │
│          │  │ 5 years     │  │ [Services]       │  │
│  ✂️ My    │  │             │  │ [Schedule]       │  │
│  Services│  │ Specialties │  │ [Portfolio]      │  │
│          │  │ • Gel       │  └──────────────────┘  │
│  ⏰ Schedule   │  • Acrylic  │                          │
│          │  │  • Nail Art │  Upcoming Appointments   │
│  🖼️ Portfolio   └─────────────┘                          │
│          │  ⏰ No appointments scheduled             │
│  👤 My   │                                          │
│  Profile │  [Language: ES]  [Logout]                │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

**Para Clientes:**
- 🔍 Buscador de profesionales con geolocalización
- 📝 Reseñas destacadas de otros usuarios
- 📅 Próximas citas programadas
- ⭐ Sistema de recompensas (próximamente)

**Para Manicuristas:**
- 📊 Estadísticas personales (experiencia, especialidades)
- ⚡ Acciones rápidas: Servicios, Horarios, Portafolio
- 💰 Panel de ganancias
- 📬 Notificaciones de nuevas reservas

**Diseño:**
- Sidebar responsive (colapsable en móvil)
- Tarjetas con bordes redondeados y sombras
- Gradientes elegantes y colores pastel
- Animaciones de entrada staggered

---

### 🔍 4. Página de Búsqueda
**Ruta:** `/search` | **Rol:** Cliente

Sistema avanzado de búsqueda de profesionales:

```
┌─────────────────────────────────────────────────────┐
│  Find Your Perfect                                  │
│  Nail Artist                                        │
│                                                     │
│  [ 🔍 Search services or specialists...     ]     │
│                                                     │
│  Category: [All ▼]  Price: [$$ ▼]  Rating: [⭐4+ ▼]│
│                                                     │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  Results     │      📍 Map View                     │
│  ─────────── │                                      │
│              │   [Interactive Map]                  │
│  👩 Sarah    │                                      │
│  ⭐ 4.9      │                                      │
│  📍 0.8 km   │                                      │
│  💅 Gel Art  │                                      │
│  [Book Now]  │                                      │
│              │                                      │
│  👩 Emma     │                                      │
│  ⭐ 4.7      │                                      │
│  📍 1.2 km   │                                      │
│  [View] [Book]                                      │
└──────────────┴──────────────────────────────────────┘
```

**Features:**
- 🗺️ **Vista Dual**: Lista + Mapa interactivo (Mapbox)
- 🔎 **Filtros Avanzados**:
  - Tipo de servicio (Manicure, Pedicure, Nail Art, Extensiones)
  - Rango de precio
  - Calificación mínima
  - Ubicación geográfica
- 📍 Geolocalización automática
- 📱 Toggle entre lista y mapa en móvil

---

### 👤 5. Perfil del Profesional
**Ruta:** `/professional/:id` | **Rol:** Público

Página de perfil detallada del manicurista:

```
┌─────────────────────────────────────────────────────┐
│  [Cover Photo]                                       │
│                                                     │
│  [👩]  Sarah Johnson                    ⭐ 4.9 (128) │
│  💅 Nail Art Specialist                             │
│                                                     │
│  [Services & Pricing] [Portfolio] [Reviews]        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SERVICES                                           │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  💅 Classic Manicure            $25    45 min    [Book]│
│  ✨ Gel Extensions             $45    60 min    [Book]│
│  🎨 Custom Nail Art            $65    90 min    [Book]│
│                                                     │
│  PORTFOLIO                                          │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  [🖼️] [🖼️] [🖼️] [🖼️]                             │
│                                                     │
│  REVIEWS                                            │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  ⭐⭐⭐⭐⭐  "Amazing work!" - Maria                │
│  ⭐⭐⭐⭐⭐  "Best nails ever!" - Ana                │
│                                                     │
│  [        🗓️ Book Appointment        ]             │
└─────────────────────────────────────────────────────┘
```

**Secciones:**
- 📸 Header con foto de portada y avatar
- 📋 Tabs: Servicios / Portafolio / Reseñas
- 💰 Lista de servicios con precios y duración
- 🖼️ Galería de trabajos (lightbox integrado)
- ⭐ Sistema de reseñas con estrellas
- 📞 Botón principal "Reservar Ahora"

---

### 📅 6. Sistema de Reservas
**Ruta:** `/booking/:professionalId/:serviceId` | **Rol:** Cliente

Flujo de reserva paso a paso:

```
┌─────────────────────────────────────────────────────┐
│  ← Back  Book Your Appointment              Step 1/4│
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. SELECT SERVICE        ○ 2. DATE    ○ 3. TIME   │
│                                                     │
│  Choose your preferred service:                     │
│                                                     │
│  ○ 💅 Classic Manicure                      $25     │
│  ● ✨ Gel Extensions                        $45  ✓ │
│  ○ 🎨 Custom Nail Art                     $65     │
│                                                     │
│  [        Continue →        ]                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  YOUR PROFESSIONAL         BOOKING SUMMARY          │
│  👩 Sarah Johnson          Service: Gel Ext. $45   │
│  ⭐ 4.9 (128 reviews)      Date: -                │
│                            Time: -                │
│                            ────────────────────    │
│                            Total: $45             │
└─────────────────────────────────────────────────────┘
```

**Pasos:**
1. ✅ **Seleccionar Servicio** - Lista con precios y duración
2. 📅 **Seleccionar Fecha** - Calendario interactivo
3. ⏰ **Seleccionar Hora** - Slots disponibles
4. 💳 **Confirmar y Pagar** - Resumen + notas adicionales

**Features:**
- Indicador de pasos (stepper visual)
- Panel lateral con resumen en tiempo real
- Validación de disponibilidad
- Notas especiales opcionales

---

### 📱 7. Menú Explorar Ofertas
**Ruta:** `/offers` | **Rol:** Cliente

Vista de todos los servicios disponibles:

```
┌─────────────────────────────────────────────────────┐
│  Explorar Ofertas                                   │
│  Discover the best services                          │
│                                                     │
│  [ 🔍 Search by service or description...   ]      │
│                                                     │
│  [All] [Gel] [Acrylic] [Nail Art] [Pedicure]        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │   [Image]   │ │   [Image]   │ │   [Image]   │  │
│  │             │ │             │ │             │  │
│  │ Gelish      │ │ French      │ │ Nail Art    │  │
│  │ Manicure    │ │ Tips        │ │ 3D          │  │
│  │             │ │             │ │             │  │
│  │ 📍 Miami    │ │ 📍 Brickell │ │ 📍 Doral    │  │
│  │             │ │             │ │             │  │
│  │ 💅 Sarah    │ │ 💅 Emma     │ │ 💅 Lisa     │  │
│  │             │ │             │ │             │  │
│  │ ⏱️ 60 min   │ │ ⏱️ 45 min   │ │ ⏱️ 90 min   │  │
│  │             │ │             │ │             │  │
│  │ [$45 USD]   │ │ [$35 USD]   │ │ [$75 USD]   │  │
│  │             │ │             │ │             │  │
│  │ [Schedule]  │ │ [Schedule]  │ │ [Schedule]  │  │
│  │ [   Book   ]│ │ [   Book   ]│ │ [   Book   ]│  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Grid de servicios con imágenes
- Filtros por categoría
- Información del profesional
- Botones: "Ver Horarios" / "Agendar"

---

### 📋 8. Mi Historial de Citas
**Ruta:** `/history` | **Rol:** Cliente

Gestión completa de citas:

```
┌─────────────────────────────────────────────────────┐
│  Mi Historial de Citas                              │
│  Manage your appointments                            │
│                                                     │
│  [All] [Upcoming] [Past]                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  ┌─────┐                                        │ │
│  │  │ JAN │ Classic Manicure              [Confirm]│ │
│  │  │ 15  │ ⏰ 2:00 PM                  💵 $35    │ │
│  │  └─────┘ 👩 Sarah Johnson                       │ │
│  │                                                 │ │
│  │  [Leave Review] [Cancel]                [→]    │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  ┌─────┐                                        │ │
│  │  │ DEC │ Gel Extensions            [Completed]✅ │ │
│  │  │ 28  │ ⏰ 10:00 AM               💵 $45      │ │
│  │  └─────┘ 👩 Emma Davis              ⭐⭐⭐⭐⭐   │ │
│  │                                   "Loved it!"  │ │
│  │                         [Already Reviewed]    │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Filtros: Todas / Próximas / Pasadas
- Tarjetas con fecha visual (mes/día)
- Indicadores de estado (color-coded)
- Acciones según estado: Cancelar / Reseñar
- Historial completo con precios

---

### ✏️ 9. Editar Mi Perfil
**Ruta:** `/profile/edit` | **Roles:** Cliente / Manicurista

Formulario completo de edición:

```
┌─────────────────────────────────────────────────────┐
│  ✏️ Editar Mi Perfil                                │
│  Update your personal and professional info          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  👤 BASIC INFORMATION                          │ │
│  │                                                 │ │
│  │  Full Name        [Maria Garcia          ]     │ │
│  │  Email            [maria@email.com       ]     │ │
│  │  Phone            [+1 305-123-4567       ]     │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  💼 PROFESSIONAL INFORMATION (Manicurista)   │ │
│  │                                                 │ │
│  │  Years Experience [5                       ]     │ │
│  │  Location/City    [Miami, FL             ]     │ │
│  │                                                 │ │
│  │  Specialties      [Nail Art, Gelish,      ]     │ │
│  │                   [Acrylic...              ]     │ │
│  │                                                 │ │
│  │  Biography        [Tell clients about your]     │ │
│  │                   [experience and style...]     │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  ❤️ CLIENT PREFERENCES (Cliente)               │ │
│  │                                                 │ │
│  │  Favorite Services [Gel, Nail Art          ]     │ │
│  │                                                 │ │
│  │  Notes &           [Any preferences...     ]     │ │
│  │  Preferences                                 │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│              [Cancel]  [💾 Save Changes]           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Secciones:**
- 👤 Información Básica (nombre, email, teléfono)
- 💼 Información Profesional (solo manicuristas)
- ❤️ Preferencias de Cliente (solo clientes)

**Features:**
- Validación en tiempo real
- Mensaje de éxito animado
- Secciones condicionales según rol

---

### ⚙️ 10. Gestión de Servicios
**Ruta:** `/services/manage` | **Rol:** Manicurista

CRUD completo de servicios:

```
┌─────────────────────────────────────────────────────┐
│  ✂️ My Services                                     │
│                                                     │
│  [ 🔍 Search services...    ]  [+ Add Service]    │
│                                                     │
│  Category: [All ▼]                                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  [🖼️ Image]                                    │ │
│  │                                                 │ │
│  │  ✨ Gel Manicure                    [📝] [🗑️] │ │
│  │  A long-lasting gel manicure...                 │ │
│  │                                                 │ │
│  │  Category: Gel      Duration: 60 min            │ │
│  │  Price: $45        Status: ✅ Active            │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  [🖼️ Image]                                    │ │
│  │  ✨ Acrylic Full Set                 [📝] [🗑️] │ │
│  │  Category: Acrylic  Duration: 90 min           │ │
│  │  Price: $65        Status: ✅ Active            │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Grid de servicios con imágenes
- Filtros por categoría
- Modal de edición (nombre, descripción, precio, duración, imagen)
- Toggle activo/inactivo
- Eliminación con confirmación

---

### 📅 11. Configuración de Horarios
**Ruta:** `/schedule/config` | **Rol:** Manicurista

Calendario semanal de disponibilidad:

```
┌─────────────────────────────────────────────────────┐
│  ⏰ Schedule Configuration                         │
│  Set your weekly availability                        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Mon      Tue      Wed      Thu      Fri     Sat  Sun│
│  ─────────────────────────────────────────────────  │
│                                                     │
│  🟢       🟢       🟢       🟢       🟢      ⚪   ⚪  │
│  ON       ON       ON       ON       ON      OFF  OFF│
│                                                     │
│  09:00    09:00    09:00    09:00    09:00         │
│  10:00    10:00    10:00    ─────    10:00         │
│  11:00    ─────    11:00    11:00    ─────         │
│  14:00    14:00    14:00    14:00    14:00         │
│  15:00    15:00    15:00    15:00    15:00         │
│                                                     │
│  [+ Add Time Slot]                                  │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Vista semanal (Lun-Dom)
- Toggle ON/OFF por día
- Slots de tiempo editables
- Agregar/eliminar horarios
- Indicadores visuales de disponibilidad

---

### 🖼️ 12. Gestión de Portafolio
**Ruta:** `/portfolio/manage` | **Rol:** Manicurista

Galería de trabajos:

```
┌─────────────────────────────────────────────────────┐
│  🖼️ Portfolio Management                           │
│  Showcase your best work                             │
│                                                     │
│  [📤 Upload Images]                                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ [🖼️]   │ │ [🖼️]   │ │ [🖼️]   │ │ [🖼️]   │     │
│  │  ❌    │ │  ❌    │ │  ❌    │ │  ❌    │     │
│  │        │ │        │ │        │ │        │     │
│  │ Gel    │ │French  │ │3D Art │ │Ombré  │     │
│  └────────┘ └────────┘ └────────┘ └────────┘     │
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ [🖼️]   │ │ [🖼️]   │ │ [🖼️]   │ │ [Drop  │     │
│  │        │ │        │ │        │ │  Zone] │     │
│  │ Wedding│ │Natural │ │Glitter│ │        │     │
│  └────────┘ └────────┘ └────────┘ └────────┘     │
│                                                     │
│  📝 Click image to view full size                   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Grid responsive de imágenes
- Upload con drag & drop
- Preview antes de subir
- Lightbox para vista completa
- Reordenar con drag & drop
- Eliminar con confirmación

---

## 🎨 Características de Diseño

### Paleta de Colores
| Elemento | Color | Uso |
|----------|-------|-----|
| **Primary** | `#EC4899` | Botones, acentos, links |
| **Secondary** | `#1F2937` | Textos principales |
| **Background** | `#FDF8F6` | Fondo de la app |
| **Success** | `#10B981` | Estados positivos |
| **Warning** | `#F59E0B` | Alertas |
| **Danger** | `#EF4444` | Errores, cancelaciones |

### Tipografía
- **Headings**: Playfair Display (elegante, serif)
- **Body**: Inter (moderna, sans-serif)
- **Sizes**: 4xl (h1), 2xl (h2), xl (h3), lg (h4), base (body)

### Componentes UI
- **Border Radius**: rounded-2xl, rounded-3xl (muy redondeado)
- **Shadows**: shadow-lg, shadow-xl (suaves y difuminadas)
- **Cards**: Fondo blanco, borde sutil border-primary-50
- **Buttons**: Degradados, sombras, hover effects

---

## ✨ Features Principales

### 🏠 Landing Page & Authentication
- ✅ Hero section con imagen de fondo y CTA
- ✅ Showcase de servicios con descripciones
- ✅ Galería portafolio con lightbox
- ✅ Testimonios de clientes
- ✅ Autenticación segura (login/register)
- ✅ Roles: Cliente / Manicurista
- ✅ Rutas protegidas

### 🔍 Search & Discovery
- ✅ Búsqueda avanzada con múltiples filtros
- ✅ Filtrado por tipo de servicio
- ✅ Rango de precio
- ✅ Filtrado por calificación
- ✅ Mapa interactivo (Mapbox)
- ✅ Tarjetas de profesionales con fotos
- ✅ Resultados en tiempo real

### 📅 Booking System
- ✅ Calendario interactivo
- ✅ Selector de time slots
- ✅ Selección de servicios
- ✅ Resumen de reserva
- ✅ Notas adicionales
- ✅ Preparado para integración de pagos

### 💼 Professional Dashboard
- ✅ CRUD de servicios
- ✅ Configuración de horarios
- ✅ Agenda de citas
- ✅ Uploader de imágenes
- ✅ Panel de ganancias

### 👥 Client Dashboard
- ✅ Historial de reservas
- ✅ Próximas citas
- ✅ Sistema de reseñas
- ✅ Favoritos

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Mapbox API Token** - [Get free token](https://www.mapbox.com/)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd nails

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your Mapbox token

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Environment Variables
```env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://react.dev/)** - UI framework
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[React Router v7](https://reactrouter.com/)** - Routing

### Libraries
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[i18next](https://react.i18next.com/)** - Internationalization (ES/EN/PT)
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Yup](https://github.com/jquense/yup)** - Validation
- **[Lucide React](https://lucide.dev/)** - Icons
- **[Mapbox GL JS](https://www.mapbox.com/mapbox-gljs)** - Maps

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── landing/             # Hero, Services, Gallery, Testimonials
│   ├── auth/                # Login, Register
│   ├── search/              # SearchBar, Map, ProfessionalCard
│   ├── profile/             # PublicProfile, Portfolio, Reviews
│   ├── booking/             # Calendar, TimeSlots, Payment
│   ├── dashboard/
│   │   ├── professional/    # ServiceManager, Schedule, Agenda
│   │   └── client/          # MyBookings, ReviewForm, AvailableOffers
│   └── shared/              # DashboardLayout, LanguageSelector
├── i18n/                    # Translations (es, en, pt)
├── pages/                   # Main pages
├── context/                 # AuthContext
├── data/                    # Mock data
└── App.jsx                  # Main routing
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

## 📝 License

This project is **private and proprietary**. All rights reserved.

---

<div align="center">

**Built with ❤️ using React and modern web technologies**

💅 *Connecting beauty professionals with clients* 💅

</div>
