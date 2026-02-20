import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import Landing from './pages/Landing.tsx';
import Portfolio from './pages/Portfolio.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Booking from './pages/Booking.tsx';

// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative select-none">
          <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          
          <main className="flex-grow flex flex-col" id="main-content">
            <AnimatedRoutes />
          </main>

          <Footer />

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
              >
                <button 
                  onClick={toggleMenu}
                  className="absolute top-8 right-8 text-white hover:text-gray-400 transition-colors p-4"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>

                <nav className="flex flex-col items-center gap-6" aria-label="Main Navigation">
                  {[
                    { name: 'HOME', path: '/' },
                    { name: 'PORTFOLIO', path: '/portfolio' },
                    { name: 'ABOUT', path: '/about' },
                    { name: 'CONTACT', path: '/contact' },
                    { name: 'BOOKING', path: '/booking' },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className="font-cinzel text-3xl md:text-5xl tracking-[0.3em] hover:tracking-[0.4em] hover:opacity-50 transition-all duration-500"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;