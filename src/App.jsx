import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Landing page components
import Hero from './components/landing/Hero';
import Services from './components/landing/Services';
import Gallery from './components/landing/Gallery';
import Testimonials from './components/landing/Testimonials';
import BookingCTA from './components/landing/BookingCTA';

// Auth components
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Shared components
import Dashboard from './components/shared/Dashboard';
import ProfileEdit from './components/shared/ProfileEdit';
import DashboardLayout from './components/shared/DashboardLayout';

// Admin components
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import PendingProfiles from './components/dashboard/admin/PendingProfiles';
import ProfileVerification from './components/dashboard/admin/ProfileVerification';

// Professional components
import ServiceManager from './components/dashboard/professional/ServiceManager';
import ScheduleConfig from './components/dashboard/professional/ScheduleConfig';
import PortfolioManager from './components/dashboard/professional/PortfolioManager';

// Client components
// Client components
import AvailableOffers from './components/dashboard/client/AvailableOffers';
import AppointmentHistory from './components/dashboard/client/AppointmentHistory';

// Profile components
import PublicProfile from './components/profile/PublicProfile';

// Pages
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <Gallery />
    <Testimonials />
    <BookingCTA />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfileEdit />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/pending"
            element={
              <AdminRoute>
                <DashboardLayout>
                  <PendingProfiles />
                </DashboardLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/verify/:id"
            element={
              <AdminRoute>
                <DashboardLayout>
                  <ProfileVerification />
                </DashboardLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/services/manage"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ServiceManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule/config"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ScheduleConfig />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio/manage"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PortfolioManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AvailableOffers />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AppointmentHistory />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/professional/:id" element={<PublicProfile />} />
          <Route path="/booking/:professionalId" element={<BookingPage />} />
          <Route path="/booking/:professionalId/:serviceId" element={<BookingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
