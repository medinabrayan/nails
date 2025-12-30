# 💅 Nail Appointment System

<div align="center">

**A modern, full-featured React application for booking nail appointments**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

A comprehensive nail salon booking platform that connects clients with professional manicurists. Features include advanced search with geolocation, interactive maps, real-time availability, role-based dashboards, and a seamless booking experience.

### ✨ Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🗺️ **Interactive Maps** - Find nearby professionals with Mapbox integration
- 🔐 **Secure Authentication** - Role-based access control for clients and professionals
- 📅 **Smart Booking** - Calendar-based appointment scheduling with time slot management
- 💼 **Professional Tools** - Complete dashboard for managing services, schedule, and appointments
- 📱 **Mobile-First** - Fully responsive design optimized for all devices

---

## 🚀 Features

### 🏠 Landing Page & Authentication
- ✅ Eye-catching hero section with call-to-action
- ✅ Services showcase with detailed descriptions
- ✅ Portfolio gallery with professional work
- ✅ Customer testimonials and ratings
- ✅ Secure user authentication (login/register)
- ✅ Role-based access (Client/Manicurist)
- ✅ Protected routes with automatic redirects

### 🔍 Search & Discovery
- ✅ Advanced search with multiple filters
- ✅ Service type filtering (manicure, pedicure, extensions, etc.)
- ✅ Price range slider
- ✅ Rating-based filtering
- ✅ Interactive Mapbox integration with custom markers
- ✅ Professional cards with photos, ratings, and distance
- ✅ Real-time search results

### 👤 Public Profiles
- ✅ Comprehensive professional profiles
- ✅ Portfolio gallery with lightbox
- ✅ Service listings with pricing
- ✅ Client reviews and ratings
- ✅ Location and contact information

### 📅 Booking System
- ✅ Interactive calendar with date selection
- ✅ Time slot picker with availability
- ✅ Service selection with pricing
- ✅ Booking summary and confirmation
- ✅ Payment integration ready
- ✅ Additional notes for special requests

### 💼 Professional Dashboard
- ✅ Service management (CRUD operations)
- ✅ Schedule configuration
- ✅ Appointment agenda view
- ✅ Portfolio image uploader
- ✅ Earnings and analytics

### 👥 Client Dashboard
- ✅ Booking history
- ✅ Upcoming appointments
- ✅ Review submission
- ✅ Favorite professionals

---

## 📦 Installation

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Mapbox API Token** - [Get free token](https://www.mapbox.com/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nails
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

4. **Get your Mapbox API token**
   - Visit [Mapbox](https://www.mapbox.com/)
   - Sign up for a free account
   - Navigate to your [account dashboard](https://account.mapbox.com/)
   - Copy your **default public token**

5. **Update `.env` file**
   ```env
   VITE_MAPBOX_ACCESS_TOKEN=your_actual_mapbox_token_here
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 19](https://react.dev/)** - UI framework with latest features
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Libraries & Tools
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Mapbox GL JS](https://www.mapbox.com/mapbox-gljs)** - Interactive maps
- **[react-map-gl](https://visgl.github.io/react-map-gl/)** - React wrapper for Mapbox

### Design System
- **Typography**: Playfair Display (headings), Inter (body)
- **Colors**: Pink/Magenta gradient primary palette
- **Components**: Rounded corners, soft shadows, gradient buttons

---

## 📚 Documentation

### Project Structure

For detailed architecture documentation, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

```
src/
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── landing/             # Hero, Services, Gallery, Testimonials
│   ├── auth/                # Login, Register, ProtectedRoute
│   ├── search/              # SearchBar, MapContainer, ProfessionalCard
│   ├── profile/             # PublicProfile, Portfolio, Reviews
│   ├── booking/             # Calendar, TimeSlot, Summary, Payment
│   ├── dashboard/
│   │   ├── professional/    # ServiceManager, Schedule, Agenda
│   │   └── client/          # MyBookings, ReviewForm
│   └── shared/              # Dashboard wrapper
├── pages/                   # SearchPage, BookingPage
├── context/                 # AuthContext
├── assets/                  # Images, icons
├── App.jsx                  # Main routing
└── main.jsx                 # Entry point
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_MAPBOX_ACCESS_TOKEN` | Mapbox API token for map functionality | ✅ Yes | - |

> **Important**: All Vite environment variables must be prefixed with `VITE_` to be accessible in client-side code.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🔐 Security

### Best Practices

- ✅ Never commit `.env` file to version control
- ✅ Keep your Mapbox token secure and private
- ✅ Use `.env.example` as a template for team members
- ✅ Rotate tokens immediately if accidentally exposed
- ✅ Implement proper authentication on backend (when integrated)
- ✅ Validate and sanitize all user inputs
- ✅ Use HTTPS in production

### Current Implementation

- Role-based access control (RBAC)
- Protected routes with authentication checks
- Secure token storage in localStorage
- Automatic logout on token expiration

---

## 🐛 Troubleshooting

### Common Issues

**Map not displaying**
- Verify your Mapbox token is correctly set in `.env`
- Check browser console for API errors
- Ensure token has proper permissions

**Build errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
# Vite will automatically try the next available port
# Or specify a custom port
npm run dev -- --port 3000
```

**Environment variables not loading**
- Ensure variables are prefixed with `VITE_`
- Restart development server after changing `.env`
- Check for typos in variable names

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Backend API integration
- [ ] Real-time notifications with WebSockets
- [ ] Payment gateway integration (Stripe)
- [ ] Email confirmations and reminders
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Social media integration
- [ ] Loyalty program

---

## 🤝 Contributing

This is a private project. For team members:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

### Code Style

- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Run `npm run lint` before committing
- Keep components focused and reusable

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

## 📞 Support

For questions or issues, please contact the development team.

---

<div align="center">

**Built with ❤️ using React and modern web technologies**

</div>
