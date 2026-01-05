
import React from 'react';
import { Radio, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedTransmission from './FeaturedTransmission';
import { Transmission, SiteConfig } from '../types';

interface Props {
  featuredData: Transmission | null;
  config?: SiteConfig | null;
}

const Hero: React.FC<Props> = ({ featuredData, config }) => {
  const isAlert = config?.enableHeroAlertColor;

  return (
    <section className="bg-void-dark text-white pb-12 md:pb-20 relative overflow-hidden">
      
      <style>{`
        @keyframes glitch-glow {
          0%, 100% { text-shadow: 0 0 0 transparent; opacity: 1; }
          2% { text-shadow: 0 0 20px var(--glow-color); opacity: 1; }
          4% { text-shadow: 0 0 0 transparent; opacity: 1; }
          15% { text-shadow: 0 0 0 transparent; opacity: 1; }
          16% { text-shadow: -2px 0 5px var(--glow-color); opacity: 0.8; }
          17% { text-shadow: 2px 0 5px var(--glow-color); opacity: 0.9; }
          18% { text-shadow: 0 0 0 transparent; opacity: 1; }
          45% { text-shadow: 0 0 0 transparent; opacity: 1; }
          46% { text-shadow: 0 0 30px var(--glow-color); opacity: 1; }
          47% { text-shadow: 0 0 0 transparent; opacity: 1; }
          60% { opacity: 1; }
          61% { opacity: 0.7; }
          62% { opacity: 1; }
          80% { text-shadow: 0 0 0 transparent; }
          81% { text-shadow: 0 0 10px var(--glow-color); }
          82% { text-shadow: 0 0 0 transparent; }
        }
        
        .station-glitch {
          --glow-color: ${isAlert ? 'rgba(255, 69, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)'};
          animation: glitch-glow 4s infinite;
          animation-timing-function: linear;
        }
      `}</style>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 md:pt-10 pb-12 md:pb-20 relative z-10">
        
        {/* Top Hero Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 relative">
            <div>
              <div className="font-mono text-[10px] md:text-xs text-gray-500 mb-2">:: BROADCASTING FROM THE VOID ::</div>
              <h1 className="font-inter font-black text-[15vw] md:text-[10rem] leading-[0.85] tracking-tight text-white uppercase select-none break-words">
                <span className={`${isAlert ? "text-alert" : "text-white"} station-glitch`}>STATION</span><br/>
                <span className="text-gray-800">445</span>
              </h1>
            </div>
            
            <div className="flex flex-row md:flex-col justify-between w-full md:w-auto md:items-end gap-6 mt-8 md:mt-0 md:mb-6">
                <div className="text-left md:text-right font-mono text-xs text-gray-400 space-y-1">
                    <p className="tracking-widest border-b border-gray-800 pb-1 mb-2 text-white">INTERSTELLAR RELAY</p>
                    <p>SECTOR: <span className="text-gray-300">7G</span></p>
                    <p>STATUS: <span className="text-green-500">ONLINE</span></p>
                </div>
                
                {/* Active Hardline Ports */}
                <div className="flex gap-4">
                    <Link to="/station-log" title="Station Manifest" className="w-12 h-12 rounded-full border border-gray-800 bg-void-gray flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group relative overflow-hidden">
                        <Globe size={20} className="text-gray-500 group-hover:text-black transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    </Link>
                    <Link to="/music" title="Frequency Tuner" className="w-12 h-12 rounded-full border border-gray-800 bg-void-gray flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300 group relative overflow-hidden">
                        <Radio size={20} className="text-gray-500 group-hover:text-black transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    </Link>
                    <Link to="/admin" title="System Core Access" className="w-12 h-12 rounded-full border border-gray-800 bg-void-gray flex items-center justify-center hover:border-alert hover:bg-alert hover:text-black transition-all duration-300 group relative overflow-hidden">
                        <Cpu size={20} className="text-gray-500 group-hover:text-black transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-alert translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    </Link>
                </div>
            </div>
        </div>

        {/* Integrated Featured Card */}
        <FeaturedTransmission data={featuredData} />

      </div>
    </section>
  );
};

export default Hero;
