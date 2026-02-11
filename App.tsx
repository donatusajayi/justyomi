
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, AlertCircle } from 'lucide-react';
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

const LockoutOverlay = () => (
  <div className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center p-8 text-center select-none cursor-default">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-12"
    >
      <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center">
        <AlertCircle size={32} className="text-black" strokeWidth={1} />
      </div>
      
      <div className="space-y-6">
        <h1 className="font-cinzel text-xl md:text-3xl tracking-[0.6em] text-black uppercase leading-relaxed">
          Service <span className="italic text-black">Suspended</span>
        </h1>
        <div className="w-12 h-[1px] bg-black mx-auto" />
        <p className="font-inter text-[10px] md:text-xs tracking-[0.4em] text-black uppercase max-w-md mx-auto leading-loose">
          Please contact the webmaster for assistance.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" />
      </div>
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Set this to true to activate the lockout screen
  const isSuspended = true; 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative select-none">
          {isSuspended && <LockoutOverlay />}
          
          <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          
          <main className="flex-grow flex flex-col" id="main-content">
            <AnimatedRoutes />
          </main>

          <Footer />

          <AnimatePresence>
            {isMenuOpen && !isSuspended && (
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
