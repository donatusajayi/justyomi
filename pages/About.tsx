import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  const services = [
    { id: '01', title: "WEDDING CINEMATOGRAPHY", desc: "Capturing the raw emotion and timeless moments of your special day with a cinematic flair." },
    { id: '02', title: "COMMERCIAL FILMS", desc: "Elevating brands through high-end visual storytelling and professional production values." },
    { id: '03', title: "MUSIC VIDEOS", desc: "Dynamic and experimental visual experiences that bring sonic art to life." },
    { id: '04', title: "PRE-WEDDING SHOOTS", desc: "Intimate and stylish sessions that tell your unique love story before the 'I Do'." },
    { id: '05', title: "EVENT COVERAGE", desc: "Professional documentation of corporate events, gala nights, and exclusive private parties." },
    { id: '06', title: "CREATIVE DIRECTION", desc: "Comprehensive visual strategy from concept to final frame for ambitious projects." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <>
      <Helmet>
        <title>About Dynamic Yomi Films | Cinematic Storytelling Dallas</title>
        <meta name="description" content="Learn about the philosophy and standard of Dynamic Yomi Films. Led by Director Yomi, we provide luxury wedding cinematography and creative brand films globally." />
        <link rel="canonical" href="https://dynamicyomifilms.com/#/about" />
      </Helmet>

      <article className="pt-32 md:pt-48 pb-24 px-6 md:px-12 min-h-screen bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-32 md:mb-48">
            <motion.span 
              initial={{ letterSpacing: "0.2em", opacity: 0 }} animate={{ letterSpacing: "0.6em", opacity: 0.8 }}
              className="font-inter text-[10px] md:text-xs uppercase mb-8 block text-white"
            >
              OUR MANIFESTO
            </motion.span>
            <h1 className="font-cinzel text-4xl md:text-7xl lg:text-8xl tracking-[0.1em] leading-tight mb-12 text-white">
              CRAFTING <span className="font-cormorant italic opacity-90 text-white lowercase">light</span> <br />
              & SHADOW
            </h1>
            <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent mx-auto" />
          </header>

          <section className="max-w-3xl mx-auto text-center mb-40 md:mb-60">
            <h2 className="font-cinzel text-xl md:text-2xl tracking-[0.4em] uppercase mb-12 text-white">The Vision</h2>
            <p className="font-cormorant text-2xl md:text-4xl text-white/90 leading-relaxed font-light">
              DYNAMIC YOMI FILMS is more than a production house. It is a pursuit of <span className="text-white font-medium italic">visual majesty</span>. We believe every frame is a canvas, and every story deserves the weight of cinema. 
            </p>
            <blockquote className="font-inter text-white/70 mt-14 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto italic tracking-wide">
              "We don't just record events; we curate memories into high-fidelity art that stands the test of time."
            </blockquote>
            <div className="mt-16 font-cinzel tracking-[0.5em] text-[10px] text-white opacity-60">
              — DIRECTOR YOMI
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40 md:mb-60">
             <section className="space-y-8">
               <h3 className="font-cinzel text-lg tracking-[0.4em] uppercase border-b border-white/10 pb-4 text-white">Our Philosophy</h3>
               <p className="font-inter text-white/80 text-sm md:text-base leading-relaxed tracking-wide">
                 Based in Dallas, Texas and operating globally, our approach is defined by intentionality. We utilize the latest in cinema technology—not for the sake of specs, but to serve the emotional truth of the moment. 
               </p>
             </section>
             <section className="space-y-8">
               <h3 className="font-cinzel text-lg tracking-[0.4em] uppercase border-b border-white/10 pb-4 text-white">The Standard</h3>
               <p className="font-inter text-white/80 text-sm md:text-base leading-relaxed tracking-wide">
                 From the first consultation to the final color grade, excellence is non-negotiable. We offer a bespoke experience tailored to couples and brands who demand the extraordinary.
               </p>
             </section>
          </div>

          <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-40">
            <div className="flex items-center gap-6 mb-20">
              <h2 className="font-cinzel text-xl md:text-3xl tracking-[0.4em] uppercase text-white">SERVICES</h2>
              <div className="flex-grow h-[1px] bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {services.map((service) => (
                <div key={service.id} className="group relative border-t border-white/10 pt-8 hover:border-white transition-colors duration-700">
                  <span className="font-cinzel text-[10px] text-white/60 group-hover:text-white transition-colors block mb-4">{service.id}</span>
                  <h3 className="font-cinzel text-sm md:text-base tracking-[0.2em] text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                  <p className="font-inter text-[11px] md:text-xs text-white/70 leading-relaxed uppercase tracking-wider">{service.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <section className="text-center pt-20 border-t border-white/10">
            <h2 className="font-cinzel text-lg md:text-2xl tracking-[0.3em] mb-12 text-white">READY TO TELL YOUR STORY?</h2>
            <Link to="/booking" className="inline-block font-cinzel text-[10px] tracking-[0.5em] border border-white px-12 py-5 hover:bg-white hover:text-black transition-all duration-500 text-white uppercase">
              START THE PROJECT
            </Link>
          </section>
        </div>
      </article>
    </>
  );
};

export default About;