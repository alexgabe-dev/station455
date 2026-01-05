import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-void-dark text-white py-6 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <Link 
            to="/" 
            className="font-mono font-bold tracking-widest text-alert text-xs uppercase animate-pulse hover:text-white transition-colors z-50 relative"
            onClick={closeMenu}
        >
          // STATION_445
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">HOME</Link>
          <Link to="/blog" className="hover:text-white transition-colors">BLOG</Link>
          <Link to="/music" className="hover:text-white transition-colors">MUSIC</Link>
          <Link to="/about" className="hover:text-white transition-colors">ABOUT</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden text-white z-50 relative focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
        >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Full Screen Menu */}
        <div className={`fixed inset-0 bg-void-dark/95 backdrop-blur-xl flex flex-col justify-center items-center gap-10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <nav className="flex flex-col items-center gap-8">
                <Link to="/" onClick={closeMenu} className="text-3xl font-black uppercase tracking-tighter hover:text-alert transition-colors">HOME</Link>
                <Link to="/blog" onClick={closeMenu} className="text-3xl font-black uppercase tracking-tighter hover:text-alert transition-colors">BLOG</Link>
                <Link to="/music" onClick={closeMenu} className="text-3xl font-black uppercase tracking-tighter hover:text-alert transition-colors">MUSIC</Link>
                <Link to="/about" onClick={closeMenu} className="text-3xl font-black uppercase tracking-tighter hover:text-alert transition-colors">ABOUT</Link>
             </nav>
             
             <div className="text-xs font-mono text-gray-500 border-t border-gray-800 pt-8 mt-4">
                 // SYSTEM_READY
             </div>
        </div>
      </div>
    </header>
  );
};

export default Header;