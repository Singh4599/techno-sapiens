import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import ToastContainer from '@components/common/Toast';
import Loader from '@components/common/Loader';
import ScrollProgress from '@components/animations/ScrollProgress';
import Starfield from '@components/animations/Starfield';
import AnimatedGrid from '@components/animations/AnimatedGrid';
import MatrixRain from '@components/animations/MatrixRain';
import FloatingParticles from '@components/animations/FloatingParticles';
import AdminProtectedRoute from '@components/admin/AdminProtectedRoute';
import '@styles/globals.css';
import Lenis from 'lenis';

// Lazy load pages
const Home = lazy(() => import('@pages/Home'));
const Events = lazy(() => import('@pages/Events'));
const EventDetails = lazy(() => import('@pages/EventDetails'));
const Speakers = lazy(() => import('@pages/Speakers'));
const Schedule = lazy(() => import('@pages/Schedule'));
const Gallery = lazy(() => import('@pages/Gallery'));
const FAQ = lazy(() => import('@pages/FAQ'));
const Contact = lazy(() => import('@pages/Contact'));
const Team = lazy(() => import('@pages/Team'));
const About = lazy(() => import('@pages/About'));
const Sponsors = lazy(() => import('@pages/Sponsors'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const AdminLogin = lazy(() => import('@pages/AdminLogin'));
const Admin = lazy(() => import('@pages/Admin'));

function App() {
  // Initialize Lenis Smooth Scroll with ultra-smooth settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <div className="min-h-screen bg-background text-text-primary noise-overlay cyber-grid relative">
        {/* Background Effects */}
        <MatrixRain />
        <FloatingParticles />
        <Starfield />
        <AnimatedGrid />
        
        {/* Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none z-40 scanlines" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.03) 2px, rgba(0, 229, 255, 0.03) 4px)'
        }} />
        
        {/* Static Grid Background */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Scanline Effect */}
        <div className="scanline" />

        {/* Data Streams - Optimized */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="data-stream"
            style={{
              left: `${25 + i * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Scroll Progress Bar */}
        <ScrollProgress />
        
        {/* Toast Notifications */}
        <ToastContainer />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="cyber-grid">
          <Suspense fallback={<Loader fullScreen text="Loading..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetails />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
