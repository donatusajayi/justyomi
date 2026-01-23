import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Contact: React.FC = () => {
  const socials = [
    { icon: <Instagram size={20} />, name: "Instagram", link: "https://www.instagram.com/dynamicyomifilms/", handle: "@dynamicyomifilms", color: "#E1306C", description: "Behind-the-scenes & shorts" },
    { icon: <Youtube size={20} />, name: "YouTube", link: "https://www.youtube.com/@DynamicYomiFilms", handle: "DynamicYomiFilms", color: "#FF0000", description: "4K cinematic releases" },
    { icon: <TikTokIcon size={20} />, name: "TikTok", link: "https://www.tiktok.com/@dynamicyomifilms", handle: "@dynamicyomifilms", color: "#00f2ea", description: "Trending reels & edits" },
    { icon: <Facebook size={20} />, name: "Facebook", link: "https://www.facebook.com/share/17HwqywEHQ/", handle: "Dynamic Yomi Films", color: "#1877F2", description: "Community & features" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <>
      <Helmet>
        <title>Contact Dynamic Yomi Films | Book Your Dallas Cinematographer</title>
        <meta name="description" content="Get in touch with Dynamic Yomi Films for your upcoming project. Available for weddings and commercial films in Dallas and worldwide." />
        <link rel="canonical" href="https://dynamicyomifilms.com/#/contact" />
      </Helmet>

      <section className="pt-32 md:pt-48 pb-24 px-6 md:px-12 min-h-screen bg-black">
        <div className="max-w-6xl mx-auto">
          <header className="mb-24 md:mb-32">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <span className="font-inter text-[10px] md:text-xs tracking-[0.6em] text-white uppercase mb-4 block">AVAILABLE WORLDWIDE</span>
              <h1 className="font-cinzel text-4xl md:text-7xl lg:text-8xl tracking-tight mb-8 text-white">
                LET'S <span className="italic">BEGIN</span> <br />
                THE <span className="opacity-80">STORY</span>.
              </h1>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 space-y-16">
              <section>
                <h2 className="font-cinzel text-xs tracking-[0.4em] text-white uppercase mb-10">DIRECT INQUIRIES</h2>
                <address className="not-italic space-y-10">
                  <a href="mailto:info@dynamicyomifilms.com" className="group block">
                    <p className="text-[9px] tracking-[0.2em] text-white uppercase mb-2">Electronic Mail</p>
                    <p className="font-cinzel text-lg md:text-2xl tracking-wider text-white group-hover:text-white/60 transition-colors">info@dynamicyomifilms.com</p>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-2" />
                  </a>
                  
                  <a href="tel:+18183008848" className="group block">
                    <p className="text-[9px] tracking-[0.2em] text-white uppercase mb-2">Voice Correspondence</p>
                    <p className="font-cinzel text-lg md:text-2xl tracking-wider text-white group-hover:text-white/60 transition-colors">+1 818 300- 8848</p>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-2" />
                  </a>

                  <div className="group block">
                    <p className="text-[9px] tracking-[0.2em] text-white uppercase mb-2">Creative Hub</p>
                    <p className="font-cinzel text-lg md:text-2xl tracking-wider uppercase text-white">Dallas, Texas</p>
                  </div>
                </address>
              </section>

              <div className="p-8 border border-white/10 bg-zinc-950/30 rounded-sm">
                <h3 className="font-cinzel text-[10px] tracking-[0.3em] text-white mb-4 flex items-center gap-2">
                  <MapPin size={12} /> STUDIO HOURS
                </h3>
                <p className="font-inter text-xs text-white/80 tracking-wider">
                  MONDAY — FRIDAY: 09:00 - 18:00 (CST)<br />
                  SATURDAY — SUNDAY: BY APPOINTMENT
                </p>
              </div>
            </div>

            <section className="lg:col-span-7">
              <h2 className="font-cinzel text-xs tracking-[0.4em] text-white uppercase mb-10">THE ECOSYSTEM</h2>
              <nav className="grid grid-cols-2 gap-4 md:gap-6" aria-label="Social media links">
                {socials.map((social, idx) => (
                  <motion.a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="group relative p-4 md:p-8 border border-white/10 hover:border-white/30 bg-zinc-950/20 transition-all duration-500 flex flex-col justify-between aspect-square h-auto md:h-64">
                    <div className="flex justify-between items-start">
                      <div className="p-2 md:p-3 rounded-lg md:rounded-xl" style={{ color: social.color, backgroundColor: `${social.color}10` }}>
                        {social.icon}
                      </div>
                      <ArrowUpRight size={14} className="text-white/20 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-cinzel text-[10px] md:text-sm tracking-[0.2em] text-white mb-1">{social.name}</h3>
                      <p className="font-inter text-[8px] md:text-[10px] text-white/60 tracking-widest">{social.handle}</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ backgroundColor: social.color }} />
                  </motion.a>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;