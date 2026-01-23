
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CharReveal = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.8,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const Landing: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://i.ibb.co/35Pmw5vs/60cf7f0e-b788-448e-aab1-d877e9772f06.jpg",
    "https://i.ibb.co/LX9X51Vd/4e907171-47d3-4f4d-a205-cbbade37baaf.jpg",
    "https://i.ibb.co/6dtLwJj/fd5ed5ca-b40d-4e08-aed7-c4ba4141dad9.jpg",
    "https://i.ibb.co/PvH40D9C/31c53e92-f94f-4136-8086-0435e5c82a5f.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <Helmet>
        <title>Dynamic Yomi Films | Dallas Cinematic Wedding Videographer</title>
        <meta name="description" content="Welcome to the digital archive of Dynamic Yomi Films. We create high-end, bespoke cinematic films and photography for couples and brands worldwide." />
        <link rel="canonical" href="https://dynamicyomifilms.com/" />
      </Helmet>

      <section className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 6, ease: "linear" }}
            >
              <img
                src={images[currentImage]}
                className="w-full h-full object-cover"
                alt="Cinematic Background Frame from Dynamic Yomi Films portfolio"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-1 pointer-events-none" />
        
        {/* Corner Metadata */}
        <div className="absolute top-12 right-8 md:right-12 z-20 hidden md:block text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="flex flex-col gap-1"
          >
            <span className="font-inter text-[8px] tracking-[0.5em] uppercase text-white/60">Current Status</span>
            <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-white/60">Accepting COMMISSIONS</span>
          </motion.div>
        </div>

        {/* Main Branding */}
        <div className="z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
             <div className="w-12 h-[1px] bg-white/40" />
          </motion.div>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.1em] select-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex flex-col items-center">
            <CharReveal text="DYNAMIC" delay={0.5} />
            <div className="flex items-center gap-4 md:gap-8 -mt-2 md:-mt-4">
              <CharReveal text="YOMI" delay={1.2} className="italic opacity-80" />
              <CharReveal text="FILMS" delay={1.8} />
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 1.5 }}
            className="mt-16 md:mt-20"
          >
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center gap-6 px-16 py-5 border border-white/20 text-white font-cinzel tracking-[0.6em] text-[9px] md:text-xs overflow-hidden transition-all duration-700 hover:text-black hover:border-white shadow-2xl"
              aria-label="Explore the film archives"
            >
              <span className="relative z-10">EXPLORE ARCHIVES</span>
              <div className="w-8 h-[1px] bg-white/60 group-hover:bg-black/40 group-hover:w-12 transition-all relative z-10" />
              <motion.div
                className="absolute inset-0 bg-white -translate-x-full"
                whileHover={{ translateX: 0 }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Landing;
