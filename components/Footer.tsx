
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <footer className={`w-full py-8 text-center text-[10px] md:text-xs tracking-[0.3em] text-gray-500 font-inter uppercase ${isLanding ? 'fixed bottom-0 left-0' : 'relative mt-auto bg-black'}`}>
      <div className="container mx-auto px-4">
        &copy; {new Date().getFullYear()} DYNAMIC YOMI FILMS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
