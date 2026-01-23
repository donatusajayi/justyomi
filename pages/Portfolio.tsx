import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, LayoutGroup } from 'framer-motion';
import { Play, Maximize2, ArrowRight, X, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
// Fix: Added missing Link import
import { Link } from 'react-router-dom';

interface Work {
  id: number;
  title: string;
  category: string;
  thumb?: string;
  src?: string;
  featured?: boolean;
}

interface PortfolioItemProps {
  work: Work;
  activeTab: 'video' | 'picture';
  index: number;
  onItemClick: (work: Work, index: number) => void;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes('youtu.be') || url.includes('youtube.com')) {
    const id = url.split('/').pop()?.split('?')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0`;
  }
  return url;
};

const VideoModal = ({ work, onClose }: { work: Work; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl overflow-hidden rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={getEmbedUrl(work.src || "")}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          title={`Cinematic film: ${work.title}`}
        />
        
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
          <div className="space-y-1">
            <span className="font-inter text-[8px] tracking-[0.4em] text-white/80 uppercase block">NOW PLAYING</span>
            <h4 className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-white uppercase">{work.title}</h4>
          </div>
          <button 
            onClick={onClose}
            className="pointer-events-auto p-2 text-white/80 hover:text-white hover:rotate-90 transition-all duration-500"
            aria-label="Close video player"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Lightbox = ({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  images: Work[]; 
  currentIndex: number; 
  onClose: () => void; 
  onNext: () => void; 
  onPrev: () => void; 
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 select-none"
      onClick={onClose}
    >
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none z-10">
        <div className="space-y-1">
          <span className="font-inter text-[8px] tracking-[0.4em] text-white/80 uppercase block">STILL FRAME {currentIndex + 1} / {images.length}</span>
          <h4 className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-white uppercase">{currentImage.title || "Untitled Still"}</h4>
        </div>
        <button 
          onClick={onClose}
          className="pointer-events-auto p-2 text-white/80 hover:text-white hover:rotate-90 transition-all duration-500"
          aria-label="Close lightbox"
        >
          <X size={32} strokeWidth={1} />
        </button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative max-w-full max-h-full"
          >
            <img 
              src={currentImage.src} 
              alt={`Dynamic Yomi Films Still: ${currentImage.title || currentImage.category || 'Portfolio Frame'}`} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white hover:translate-x-[-10px] transition-all duration-500 hidden md:block"
          aria-label="Previous image"
        >
          <ChevronLeft size={64} strokeWidth={0.5} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white hover:translate-x-[10px] transition-all duration-500 hidden md:block"
          aria-label="Next image"
        >
          <ChevronRight size={64} strokeWidth={0.5} />
        </button>
      </div>

      <div className="absolute bottom-12 font-inter text-[8px] tracking-[0.8em] text-white/40 uppercase">
        SCROLL TO NAVIGATE
      </div>
    </motion.div>
  );
};

const PortfolioItem: React.FC<PortfolioItemProps> = ({ work, activeTab, index, onItemClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 250 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);
  const scale = useSpring(1, springConfig);
  const imageScale = useSpring(1, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    imageScale.set(1.1);
  };
  
  const handleMouseLeave = () => {
    x.set(0); y.set(0); scale.set(1); imageScale.set(1);
  };

  // 1st (index 0) and 5th (index 4) items are featured wide in video tab
  const isWide = activeTab === 'video' && (index === 0 || index === 4);

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: (index % 3) * 0.1 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onItemClick(work, index)}
      style={{ perspective: 1200 }}
      className={`group relative overflow-hidden bg-zinc-950 cursor-pointer mb-10 block
        ${activeTab === 'video' ? (isWide ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video') : 'break-inside-avoid mb-8'}`}
    >
      <motion.div
        style={{ rotateX, rotateY, scale }}
        className="w-full h-full transition-shadow duration-700"
      >
        <motion.img 
          src={work.thumb || work.src} 
          alt={activeTab === 'video' ? `${work.category}: ${work.title}` : 'Cinematic Still'} 
          style={{ scale: imageScale }}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out" 
        />
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-8 flex flex-col justify-end"
      >
        <div className="space-y-4">
          {activeTab === 'video' && (
            <>
              <div className="flex items-center gap-4">
                {(work.category || work.title) && <span className="h-[1px] w-8 bg-white" />}
                <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-white">{work.category}</p>
              </div>
              <h3 className="font-cinzel text-lg md:text-2xl tracking-[0.2em] uppercase text-white leading-tight">
                {work.title}
              </h3>
            </>
          )}
          
          <div className="pt-4 flex items-center gap-4 text-white">
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
              {activeTab === 'video' ? <Play size={14} fill="currentColor" /> : <Maximize2 size={14} />}
            </div>
            <span className="font-cinzel text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              {activeTab === 'video' ? 'Play Film' : 'VIEW FULL IMAGE'}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-6 bg-black/90 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-700 ease-[0.19,1,0.22,1]" />
      <div className="absolute bottom-0 left-0 w-full h-6 bg-black/90 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-700 ease-[0.19,1,0.22,1]" />
    </motion.article>
  );
};

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'picture'>('video');
  const [selectedVideo, setSelectedVideo] = useState<Work | null>(null);
  const [selectedPictureIndex, setSelectedPictureIndex] = useState<number | null>(null);

  const videoWorks: Work[] = [
    { id: 7, title: "When Mr & Mrs Dallas Got Married in Dallas Texas ❤️💍", category: "Wedding Film", thumb: "https://vumbnail.com/1149502259.jpg", src: "https://vimeo.com/1149502259", featured: true },
    { id: 2, title: "Otito & Humphrey | A Destination Wedding Story", category: "Wedding Film", thumb: "https://vumbnail.com/1149183302.jpg", src: "https://vimeo.com/1149183302" },
    { id: 3, title: "Bola & John | Pre-Wedding Shoot Story", category: "Wedding Film", thumb: "https://vumbnail.com/1149189691.jpg", src: "https://vimeo.com/1149189691" },
    { id: 6, title: "Oyin & TJ | A 4K Cinematic Experience", category: "Wedding Film", thumb: "https://vumbnail.com/1149195084.jpg", src: "https://vimeo.com/1149195084" },
    { id: 1, title: "Brian & Bethania | Beautiful Rainy Wedding at the Dallas Arboretum", category: "Wedding Film", thumb: "https://vumbnail.com/1149185331.jpg", src: "https://vimeo.com/1149185331" },
  ];

  const pictureWorks: Work[] = [
    { id: 101, title: "Wedding Portrait Dallas", category: "Photography", src: "https://i.ibb.co/35Pmw5vs/60cf7f0e-b788-448e-aab1-d877e9772f06.jpg" },
    { id: 103, title: "Cinematic Editorial", category: "Photography", src: "https://i.ibb.co/LX9X51Vd/4e907171-47d3-4f4d-a205-cbbade37baaf.jpg" },
    { id: 105, title: "Luxe Event Coverage", category: "Photography", src: "https://i.ibb.co/6dtLwJj/fd5ed5ca-b40d-4e08-aed7-c4ba4141dad9.jpg" },
    { id: 106, title: "Emotional Candid Still", category: "Photography", src: "https://i.ibb.co/PvH40D9C/31c53e92-f94f-4136-8086-0435e5c82a5f.jpg" },
    { id: 107, title: "Editorial Film Frame", category: "Photography", src: "https://i.ibb.co/HLwk9GzP/8c9a85f0-2e69-46c5-b044-002183d36fee.jpg" },
  ];

  const handleItemClick = (work: Work, index: number) => {
    if (activeTab === 'video') setSelectedVideo(work);
    else setSelectedPictureIndex(index);
  };

  return (
    <>
      <Helmet>
        <title>Cinematic Portfolio | Dynamic Yomi Films | Dallas Wedding Films</title>
        <meta name="description" content="Explore a curated gallery of high-end wedding films and editorial photography. Experience the visual majesty of Dynamic Yomi Films." />
        <link rel="canonical" href="https://dynamicyomifilms.com/#/portfolio" />
      </Helmet>

      <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 min-h-screen bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 md:mb-40 grid grid-cols-1 lg:grid-cols-2 items-end gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
              <span className="font-inter text-[10px] md:text-xs tracking-[0.6em] text-white uppercase mb-6 block">SELECTED WORKS</span>
              <h1 className="font-cinzel text-4xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase text-white">
                GALLERY <br />
                OF <span className="italic opacity-80">STORY</span>
              </h1>
            </motion.div>

            <motion.div className="flex lg:justify-end">
              <nav className="flex gap-12 border-b border-white/20 pb-4" aria-label="Portfolio filters">
                <button 
                  onClick={() => setActiveTab('video')}
                  className={`group flex items-center gap-4 font-cinzel tracking-[0.4em] text-[10px] md:text-xs transition-colors duration-500 ${activeTab === 'video' ? 'text-white' : 'text-white/40'}`}
                >
                  FILMS
                  {activeTab === 'video' && <motion.div layoutId="tab-underline" className="h-[1px] w-8 bg-white" />}
                </button>
                <button 
                  onClick={() => setActiveTab('picture')}
                  className={`group flex items-center gap-4 font-cinzel tracking-[0.4em] text-[10px] md:text-xs transition-colors duration-500 ${activeTab === 'picture' ? 'text-white' : 'text-white/40'}`}
                >
                  STILLS
                  {activeTab === 'picture' && <motion.div layoutId="tab-underline" className="h-[1px] w-8 bg-white" />}
                </button>
              </nav>
            </motion.div>
          </header>

          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`${activeTab === 'video' ? "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4" : "columns-1 sm:columns-2 lg:columns-3 gap-8"}`}
              >
                {(activeTab === 'video' ? videoWorks : pictureWorks).map((work, idx) => (
                  <PortfolioItem key={work.id} work={work} activeTab={activeTab} index={idx} onItemClick={handleItemClick} />
                ))}
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>

          <AnimatePresence>
            {selectedVideo && <VideoModal work={selectedVideo} onClose={() => setSelectedVideo(null)} />}
          </AnimatePresence>

          <AnimatePresence>
            {selectedPictureIndex !== null && (
              <Lightbox 
                images={pictureWorks} currentIndex={selectedPictureIndex} onClose={() => setSelectedPictureIndex(null)}
                onNext={() => setSelectedPictureIndex((selectedPictureIndex + 1) % pictureWorks.length)}
                onPrev={() => setSelectedPictureIndex((selectedPictureIndex - 1 + pictureWorks.length) % pictureWorks.length)}
              />
            )}
          </AnimatePresence>

          <footer className="mt-40 pt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="text-center md:text-left">
              <p className="font-inter text-[10px] tracking-[0.4em] text-white uppercase mb-8">HAVE A VISION?</p>
              <Link to="/booking" className="font-cinzel text-xl md:text-3xl tracking-[0.2em] uppercase flex items-center justify-center md:justify-start gap-6 group text-white">
                LET'S FILM IT <ArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="font-inter text-[10px] tracking-[0.4em] text-white uppercase mb-8">WANT MORE FILMS?</p>
              <motion.a href="https://www.youtube.com/@DynamicYomiFilms" target="_blank" rel="noopener noreferrer" className="font-cinzel text-xl md:text-3xl tracking-[0.1em] uppercase flex items-center justify-center md:justify-end gap-6 group text-white">
                <Youtube className="group-hover:scale-110 transition-transform duration-500 text-[#FF0000]" size={32} />
                WATCH ON YOUTUBE
              </motion.a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Portfolio;