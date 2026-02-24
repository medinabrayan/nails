# NailConnect Salon Application - Project Structure

## 📁 Organized Architecture

```
src/
├── components/
│   ├── layout/                    # Layout components
│   │   ├── Navbar.jsx            # Navigation bar with auth state
│   │   └── Footer.jsx            # Footer with links and info
│   │
│   ├── landing/                   # Landing page components
│   │   ├── Hero.jsx              # Hero section
│   │   ├── Services.jsx          # Services showcase
│   │   ├── Gallery.jsx           # Image gallery
│   │   ├── Testimonials.jsx      # Client testimonials
│   │   └── BookingCTA.jsx        # Call-to-action section
│   │
│   ├── auth/                      # Authentication components
│   │   ├── LoginForm.jsx         # Login form
│   │   ├── RegisterForm.jsx      # Registration with role selection
│   │   └── ProtectedRoute.jsx    # Route protection wrapper
│   │
│   ├── search/                    # Search & discovery components
│   │   ├── HeroSection.jsx       # Search page hero
│   │   ├── SearchBar.jsx         # Filters (service, price, rating)
│   │   ├── MapContainer.jsx      # Google Maps integration
│   │   └── ProfessionalCard.jsx  # Professional summary card
│   │
│   ├── profile/                   # Public profile components
│   │   ├── PublicProfile.jsx     # Main profile page
│   │   ├── PortfolioGallery.jsx  # Portfolio with lightbox
│   │   ├── ServiceList.jsx       # Services with pricing
│   │   └── ReviewList.jsx        # Reviews with ratings
│   │
│   ├── booking/                   # Booking system components
│   │   ├── BookingCalendar.jsx   # Date selection calendar
│   │   ├── TimeSlotPicker.jsx    # Time slot selection
│   │   ├── BookingSummary.jsx    # Booking confirmation modal
│   │   └── PaymentButton.jsx     # Payment processing
│   │
│   ├── dashboard/                 # Dashboard components
│   │   ├── professional/         # Professional dashboard
│   │   │   ├── ServiceManager.jsx    # CRUD for services
│   │   │   ├── ScheduleConfig.jsx    # Availability configuration
│   │   │   ├── AgendaView.jsx        # Appointment management
│   │   │   └── ImageUploader.jsx     # Portfolio image upload
│   │   │
│   │   └── client/               # Client dashboard
│   │       ├── MyBookings.jsx        # Booking history
│   │       └── ReviewForm.jsx        # Post-service reviews
│   │
│   └── shared/                    # Shared components
│       └── Dashboard.jsx         # Main dashboard wrapper
│
├── pages/                         # Page components
│   ├── SearchPage.jsx            # Search results page
│   └── BookingPage.jsx           # Complete booking flow
│
├── context/                       # React Context
│   └── AuthContext.jsx           # Authentication state
│
├── assets/                        # Static assets
│
├── App.jsx                        # Main app with routing
├── main.jsx                       # Entry point
└── index.css                      # Global styles
```

## 🎯 Component Organization

### Layout Components
Reusable layout elements used across the application.
- **Navbar**: Dynamic navigation with auth-aware buttons
- **Footer**: Site-wide footer with links

### Landing Components
Components specific to the landing page experience.
- Showcase services and features
- Build trust with testimonials
- Drive conversions with CTAs

### Auth Components
Handle user authentication and authorization.
- Login and registration flows
- Role-based access control
- Protected route wrapper

### Search Components
Enable users to find professionals.
- Advanced filtering
- Map-based discovery
- Professional previews

### Profile Components
Display professional public profiles.
- Comprehensive professional information
- Portfolio showcase
- Service listings
- Client reviews

### Booking Components
Complete booking flow from selection to payment.
- Interactive calendar
- Time slot management
- Booking confirmation
- Payment processing

### Dashboard Components
Role-specific management interfaces.

**Professional Dashboard:**
- Manage services and pricing
- Configure availability
- View and manage appointments
- Upload portfolio images

**Client Dashboard:**
- View booking history
- Manage upcoming appointments
- Leave reviews

### Shared Components
Components used across multiple contexts.
- Generic dashboard wrapper
- Reusable UI elements

## 📋 Import Patterns

### Absolute Imports (from pages)
```javascript
import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/search/SearchBar';
```

### Relative Imports (within same folder)
```javascript
// In PublicProfile.jsx
import PortfolioGallery from './PortfolioGallery';
import ServiceList from './ServiceList';
```

### Cross-folder Imports
```javascript
// In PublicProfile.jsx
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
```

## 🚀 Key Features by Phase

### Phase 1-2: Foundation
- Landing page with hero, services, gallery
- Authentication system with role selection
- Protected routes

### Phase 3: Search & Discovery
- Search page with filters
- Map integration
- Professional cards

### Phase 4: Public Profiles
- Comprehensive professional profiles
- Portfolio galleries
- Service listings
- Review system

### Phase 5: Booking System
- Interactive calendar
- Time slot selection
- Booking summary
- Payment processing

### Phase 6: Dashboards
- Professional management tools
- Client booking management
- Review submission

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "framer-motion": "^10.x",
  "lucide-react": "^0.x",
  "tailwindcss": "^3.x"
}
```

## 🎨 Design System

### Colors
- **Primary**: Pink/Magenta gradient (#ec4899 to #db2777)
- **Secondary**: Complementary colors
- **Accent**: Highlight colors

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- **Cards**: rounded-2xl with shadows
- **Buttons**: Gradient backgrounds
- **Inputs**: Border-2 with focus states

## 🔄 State Management

- **AuthContext**: Global authentication state
- **Component State**: Local state with useState
- **Future**: Consider Redux/Zustand for complex state

## 🛣️ Routing Structure

```
/                           → Landing Page
/login                      → Login Form
/register                   → Registration Form
/dashboard                  → Protected Dashboard
/search                     → Search Page
/professional/:id           → Public Profile
/booking/:professionalId    → Booking Page
/booking/:professionalId/:serviceId → Booking with pre-selected service
```

## 📝 Development Guidelines

1. **Component Naming**: PascalCase for components
2. **File Organization**: Group by feature/domain
3. **Import Order**: External → Internal → Relative
4. **Styling**: Tailwind utility classes
5. **State**: Keep state as local as possible
6. **Props**: Destructure in function parameters
7. **Exports**: Default export for components

## 🔮 Future Enhancements

- Backend API integration
- Real-time updates with WebSockets
- Advanced search with Elasticsearch
- Payment gateway integration (Stripe)
- Image optimization with Cloudinary
- Analytics and reporting
- Multi-language support
- Mobile app (React Native)

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Architecture**: Clean, scalable, feature-based organization
