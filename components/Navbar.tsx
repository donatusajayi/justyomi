
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-4 py-6 md:px-8 md:py-8 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto">
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <img 
            src="https://i.ibb.co/NnLHRT3s/DYF-Icon-White.png" 
            alt="Dynamic Yomi Films Logo" 
            className="w-8 h-8 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-500"
          />
          <div className="flex flex-col">
            <span className="font-cinzel text-[10px] md:text-sm tracking-[0.3em] text-white leading-none">
              DYNAMIC YOMI
            </span>
            <span className="font-cinzel text-[8px] md:text-[10px] tracking-[0.5em] text-white/50 leading-none mt-1">
              FILMS
            </span>
          </div>
        </Link>
      </div>

      <div className="pointer-events-auto">
        <button 
          onClick={toggleMenu}
          className="text-white hover:text-gray-400 transition-colors group flex items-center gap-2 md:gap-3"
          aria-label="Open Menu"
        >
          <Menu size={28} className="md:w-8 md:h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
