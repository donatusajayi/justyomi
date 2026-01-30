import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone } from 'lucide-react';

const CharReveal = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.4,
            delay: delay + i * 0.03,
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
        {/* Cinematic Background - Increased Opacity for higher visibility */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.85, scale: 1 }}
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

        {/* Overlays - Softened to make images brighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-1 pointer-events-none" />
        
        {/* Main Branding */}
        <div className="z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8 flex flex-col items-center"
          >
             <span className="font-inter text-[8px] md:text-[10px] tracking-[0.8em] text-white uppercase mb-4 drop-shadow-md">DALLAS • TEXAS</span>
             <div className="w-16 h-[1px] bg-white/40 shadow-sm" />
          </motion.div>

          <h1 className="select-none text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] flex flex-col items-center uppercase leading-none">
            <CharReveal 
              text="YOUR" 
              delay={0.5} 
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] font-light" 
            />
            <div className="flex items-center gap-4 md:gap-10 -mt-2 md:-mt-4">
              <motion.span
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                className="font-cormorant italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight normal-case lowercase opacity-95"
              >
                story
              </motion.span>
              <CharReveal 
                text="IN EVERY" 
                delay={1.8} 
                className="font-cinzel text-xs sm:text-sm md:text-xl lg:text-2xl tracking-[0.5em] font-normal" 
              />
            </div>
            <CharReveal 
              text="FRAME" 
              delay={2.4} 
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] font-light mt-2" 
            />
          </h1>

          <div className="flex flex-col items-center mt-16 md:mt-24 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 1.5 }}
            >
              <Link
                to="/booking"
                className="group relative inline-flex items-center gap-8 px-14 py-5 bg-white text-black font-cinzel tracking-[0.6em] text-[9px] md:text-[11px] overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white"
                aria-label="Book your cinematic experience"
              >
                <span className="relative z-10">BOOK NOW</span>
                <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-500 relative z-10" />
              </Link>
            </motion.div>

            <motion.a
              href="tel:+18183008848"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="group flex items-center gap-3 text-white font-inter text-[8px] md:text-[9px] tracking-[0.5em] uppercase transition-all"
            >
              <Phone size={10} className="text-white/40 group-hover:text-white transition-colors" />
              <span>DIRECT LINE: +1 818 300 8848</span>
              <div className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-500" />
            </motion.a>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>
    </>
  );
};

export default Landing;