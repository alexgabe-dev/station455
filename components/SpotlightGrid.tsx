import React, { useState } from 'react';
import { Frequency } from '../types';
import { ArrowLeft, ArrowRight, Database, Wifi } from 'lucide-react';
import FrequencyVisualizer from './FrequencyVisualizer';

interface Props {
  frequencies: Frequency[];
}

const SpotlightGrid: React.FC<Props> = ({ frequencies }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  return (
    <section className="bg-void py-20 border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Header Block - Now filled with interactive components */}
            <div className="lg:w-1/3 flex flex-col h-auto lg:h-auto min-h-[500px]">
                <div className="mb-8">
                    <span className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-2 block border-l-2 border-alert pl-3">
                        Database Access
                    </span>
                    <h2 className="text-5xl lg:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                        Spotlight<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Frequencies</span>
                    </h2>
                </div>
                
                {/* --- INTERACTIVE GAP FILLER --- */}
                {/* Hidden on mobile to prevent clutter, shown on Desktop */}
                <div className="hidden lg:flex flex-col flex-1 gap-4">
                    
                    {/* Control Tabs */}
                    <div className="flex border border-gray-800">
                        <button 
                            onClick={() => setActiveTab('visual')}
                            className={`flex-1 py-2 font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'visual' ? 'bg-alert text-black font-bold' : 'bg-void-gray text-gray-500 hover:text-white'}`}
                        >
                            <Wifi size={12} /> Visualizer
                        </button>
                        <button 
                            onClick={() => setActiveTab('code')}
                            className={`flex-1 py-2 font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'code' ? 'bg-alert text-black font-bold' : 'bg-void-gray text-gray-500 hover:text-white'}`}
                        >
                            <Database size={12} /> Raw_Data
                        </button>
                    </div>

                    {/* The Visualizer / Data Container */}
                    <div className="flex-1 bg-black border border-gray-800 p-1 relative min-h-[250px]">
                        {activeTab === 'visual' ? (
                            <FrequencyVisualizer />
                        ) : (
                            <div className="w-full h-full bg-void-dark p-4 overflow-hidden relative group">
                                <div className="font-mono text-[10px] text-gray-600 break-all leading-relaxed group-hover:text-alert/70 transition-colors">
                                    0F 2A 4C 99 1B 00 FF A1 44 22 11 00 0F 2A 4C 99 1B 00 FF A1 
                                    44 22 11 00 CA FE BA BE 00 11 22 33 44 55 66 77 88 99 AA BB 
                                    CC DD EE FF 00 12 34 56 78 90 12 43 54 65 76 87 98 09 AA BB
                                    0F 2A 4C 99 1B 00 FF A1 44 22 11 00 0F 2A 4C 99 1B 00 FF A1 
                                    44 22 11 00 CA FE BA BE 00 11 22 33 44 55 66 77 88 99 AA BB 
                                    CC DD EE FF 00 12 34 56 78 90 12 43 54 65 76 87 98 09 AA BB
                                    44 22 11 00 CA FE BA BE 00 11 22 33 44 55 66 77 88 99 AA BB 
                                    CC DD EE FF 00 12 34 56 78 90 12 43 54 65 76 87 98 09 AA BB
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-alert/10 border border-alert/30 text-alert text-[9px] font-mono animate-pulse">
                                    DOWNLOADING...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nav Buttons */}
                    <div className="flex gap-4 mt-auto pt-4">
                        <button className="h-12 flex-1 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-gray-500 group relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase"><ArrowLeft size={16} /> PREV</span>
                            <div className="absolute inset-0 bg-alert translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                        </button>
                        <button className="h-12 flex-1 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-gray-500 group relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase">NEXT <ArrowRight size={16} /></span>
                            <div className="absolute inset-0 bg-alert translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {frequencies.map((freq) => (
                    <div key={freq.id} className="bg-void-gray p-6 border border-gray-800 hover:border-alert transition-colors group relative flex flex-col h-full shadow-lg hover:shadow-alert/5">
                        <div className="aspect-[4/3] overflow-hidden mb-6 bg-black relative border border-gray-800">
                            <img 
                                src={freq.image} 
                                alt={freq.title} 
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" 
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-scanline opacity-50 pointer-events-none"></div>
                            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[9px] font-mono text-alert border border-alert/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                IMG_ID: {freq.id}
                            </div>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                            {freq.tags.map((tag, i) => (
                                <span key={i} className="bg-black/50 text-gray-400 border border-gray-700 text-[10px] font-mono font-bold px-2 py-1 uppercase group-hover:text-white group-hover:border-gray-500 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="text-xs text-alert font-mono mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-alert rounded-full"></span>
                            {freq.date}
                        </div>
                        
                        <h3 className="text-xl font-black leading-tight mb-3 text-white uppercase group-hover:translate-x-1 transition-transform">
                            {freq.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3 mb-4">
                            {freq.excerpt}
                        </p>

                        <button className="mt-auto w-full py-3 border border-gray-800 text-xs font-mono uppercase text-gray-500 hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center gap-2 group-hover:bg-void-dark group-hover:text-white group-hover:border-gray-600">
                            Access Log <ArrowRight size={12} />
                        </button>
                        
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-800 group-hover:border-alert transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-800 group-hover:border-alert transition-colors"></div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default SpotlightGrid;