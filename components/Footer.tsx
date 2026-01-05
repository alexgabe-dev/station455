
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Radio, Cpu, HelpCircle } from 'lucide-react';
import { getSiteConfig } from '../services/stationService';
import { SiteConfig } from '../types';
import FAQModal from './FAQModal';

const Footer: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  useEffect(() => {
    getSiteConfig().then((data) => {
        setConfig(data);
        if (data.enableFooterPulse) {
            setIsPulsing(true);
            const timer = setTimeout(() => {
                setIsPulsing(false);
            }, 6000); // Pulse is 2s, run for 3 cycles = 6s
            return () => clearTimeout(timer);
        }
    });
  }, []);

  const handleRss = (e: React.MouseEvent) => {
    e.preventDefault();
    const xmlContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Station445 Transmissions</title>
  <link>https://station445.void</link>
  <description>Signals from the void.</description>
  <language>en-us</language>
  <item>
    <title>Signal Acquired</title>
    <link>https://station445.void/blog/signal-1</link>
    <description>New transmission detected from Sector 7G.</description>
  </item>
</channel>
</rss>`;
    const blob = new Blob([xmlContent], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = config?.adminContact || 'sys_admin@station445.void';
    window.location.href = `mailto:${email}`;
  };

  const showPulse = config?.enableFooterPulse && isPulsing;

  return (
    <>
    <footer className="bg-void-dark text-white pt-24 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-24">
            <Link to="/" className={`text-[12vw] md:text-9xl font-black leading-none uppercase tracking-tighter select-none transition-all duration-1000 ${
                showPulse 
                ? "bg-gradient-to-r from-alert via-orange-500 to-alert bg-clip-text text-transparent animate-pulse" 
                : "text-gray-900 hover:text-gray-800"
            }`}>
                STATION<span className={showPulse ? "text-transparent" : "text-gray-800"}>445</span>
            </Link>
            
            <div className="flex flex-col items-end gap-8 mt-10 md:mt-0">
                <div className="text-right font-mono text-xs text-gray-500 space-y-1">
                    <p className="tracking-widest text-white border-b border-gray-800 pb-2 mb-2">INTERSTELLAR RELAY</p>
                    <p>SECTOR: 7G</p>
                    <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                </div>
                
                {/* Active Hardline Ports */}
                <div className="flex gap-4">
                     <Link to="/station-log" title="Station Manifest" className="w-12 h-12 rounded-full bg-void-gray border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group">
                        <Globe size={20} className="text-gray-500 group-hover:text-black transition-colors" />
                    </Link>
                    <Link to="/music" title="Frequency Tuner" className="w-12 h-12 rounded-full bg-void-gray border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group">
                        <Radio size={20} className="text-gray-500 group-hover:text-black transition-colors" />
                    </Link>
                    <Link to="/admin" title="System Core Access" className="w-12 h-12 rounded-full bg-void-gray border border-gray-800 flex items-center justify-center hover:border-alert hover:bg-alert hover:text-black transition-all duration-300 group">
                        <Cpu size={20} className="text-gray-500 group-hover:text-black transition-colors" />
                    </Link>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600">
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-4 md:mb-0">
                <button onClick={handleRss} className="hover:text-alert transition-colors uppercase tracking-widest">RSS FEED</button>
                <button onClick={handleContact} className="hover:text-alert transition-colors uppercase tracking-widest">CONTACT</button>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-alert transition-colors uppercase tracking-widest flex items-center gap-1">
                    FAQ <HelpCircle size={10} />
                </button>
            </div>
            
            <div className="flex gap-8 uppercase tracking-widest mb-4 md:mb-0 hidden md:flex">
                <Link to="/blog" className="hover:text-white">Blog</Link>
                <Link to="/music" className="hover:text-white">Music</Link>
                <Link to="/about" className="hover:text-white">About</Link>
            </div>

            <div className="text-center md:text-right">
                // STATION 445 © 2025
            </div>
        </div>
      </div>
    </footer>
    
    <FAQModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
};

export default Footer;
