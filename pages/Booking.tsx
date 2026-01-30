import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Booking: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) { 
        setSubmitted(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }
      else { 
        setError(data.message || "An error occurred."); 
      }
    } catch (err) { 
      setError("Failed to connect. Please try again later."); 
    }
    finally { 
      setIsSubmitting(false); 
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black px-6 overflow-hidden text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-3xl md:text-5xl tracking-[0.4em] mb-6 uppercase text-white"
        >
          THANK YOU
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-inter text-white tracking-[0.2em] uppercase text-[10px] md:text-xs"
        >
          Your inquiry has been received. We will be in touch shortly.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setSubmitted(false)} 
          className="mt-12 font-cinzel text-[10px] tracking-[0.3em] uppercase border border-white px-10 py-4 hover:bg-white hover:text-black transition-all text-white"
        >
          RETURN
        </motion.button>
      </div>
    );
  }

  // Simplified style with pure white placeholders
  const inputClasses = "w-full bg-transparent border-b border-white/20 py-4 font-cinzel tracking-widest text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white placeholder:opacity-100 placeholder:font-inter placeholder:text-[10px] text-white";
  const labelClasses = "font-inter text-[9px] tracking-[0.4em] text-white uppercase block mb-2";

  return (
    <>
      <Helmet>
        <title>Inquire | Dynamic Yomi Films | Dallas Cinematography</title>
        <meta name="description" content="Simpler, faster inquiry form for Dynamic Yomi Films. Tell us about your vision and let's bring it to life." />
        <link rel="canonical" href="https://dynamicyomifilms.com/#/booking" />
      </Helmet>

      <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <span className="font-inter text-[10px] tracking-[0.6em] text-white uppercase block mb-4">INQUIRY FORM</span>
            <h1 className="font-cinzel text-4xl md:text-7xl tracking-tighter uppercase text-white">
              LET'S <span className="italic opacity-80">CREATE</span>
            </h1>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-12"
          >
            <input type="hidden" name="access_key" value="1b6fbc19-4a8b-4833-9ad6-6e85adad44f4" />
            <input type="hidden" name="subject" value="New Project Inquiry - Dynamic Yomi Films" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className={labelClasses}>YOUR NAME</label>
                <input type="text" name="name" required placeholder="PLEASE ENTER FULL NAME" className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>YOUR EMAIL</label>
                <input type="email" name="email" required placeholder="EMAIL@EXAMPLE.COM" className={inputClasses} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className={labelClasses}>PHONE NUMBER</label>
                <input type="tel" name="phone" required placeholder="+1 (000) 000-0000" className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>SERVICE TYPE</label>
                <select name="service" required className={`${inputClasses} appearance-none cursor-pointer bg-black text-white`}>
                  <option value="wedding" className="bg-black">WEDDING CINEMATOGRAPHY</option>
                  <option value="brand" className="bg-black">BRAND STORYTELLING</option>
                  <option value="other" className="bg-black">OTHER CREATIVE WORK</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className={labelClasses}>EVENT DATE</label>
                <input type="date" name="date" required className={`${inputClasses} [color-scheme:dark]`} />
              </div>
              <div>
                <label className={labelClasses}>LOCATION</label>
                <input 
                  type="text"
                  name="location" 
                  required 
                  placeholder="WHERE IS THE PROJECT LOCATED?" 
                  className={inputClasses}
                />
              </div>
            </div>

            {error && <p className="text-red-500 font-inter text-[10px] tracking-widest text-center">{error}</p>}

            <div className="flex justify-center pt-8">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="group relative px-20 py-6 bg-white text-black font-cinzel tracking-[0.5em] text-[10px] md:text-xs hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default Booking;