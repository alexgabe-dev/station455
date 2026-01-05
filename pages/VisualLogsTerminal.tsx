
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasVisualAccess } from '../services/authService';
import { getMustSeeMoments } from '../services/stationService';
import { BurstMoment } from '../types';
import { ScanLine, Clock, Aperture, Eye, ArrowLeft, Terminal, AlertTriangle, Download, Video, Image as ImageIcon } from 'lucide-react';

// Import layout components since we are now outside the global layout
import Header from '../components/Header';
import Footer from '../components/Footer';
import Starfield from '../components/Starfield';

const VisualLogsTerminal: React.FC = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState<'CHECKING' | 'AUTHORIZED' | 'DENIED'>('CHECKING');
  const [showContent, setShowContent] = useState(false);
  const [moments, setMoments] = useState<BurstMoment[]>([]);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Verify Authentication
    if (!hasVisualAccess()) {
        setAuthStatus('DENIED');
        return;
    }
    setAuthStatus('AUTHORIZED');
    getMustSeeMoments().then(setMoments);
  }, []);

  // 2. Run Terminal Animation sequence once authorized
  useEffect(() => {
    if (authStatus === 'AUTHORIZED') {
        const lines = [
            "> INITIALIZING SECURE UPLINK...",
            "> HANDSHAKE PROTOCOL: ESTABLISHED",
            "> VERIFYING CLEARANCE LEVEL 5...",
            "> DECRYPTING VISUAL ASSETS...",
            "> BYPASSING FIREWALL [██████████] 100%",
            "> ACCESS GRANTED."
        ];

        let delay = 0;
        lines.forEach((line, index) => {
            delay += 600 + Math.random() * 400; // Random delay for realism
            setTimeout(() => {
                setTerminalLines(prev => [...prev, line]);
                // Auto scroll
                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, delay);
        });

        // Show content after all lines + buffer
        setTimeout(() => {
            setShowContent(true);
        }, delay + 800);
    }
  }, [authStatus]);

  const handleDownload = async (url: string, id: string) => {
    setDownloadingId(id);
    
    // Simulate "extraction" time for effect
    await new Promise(r => setTimeout(r, 1500));

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `STATION445_ARCHIVE_${id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download failed:', error);
        // Fallback
        window.open(url, '_blank');
    } finally {
        setDownloadingId(null);
    }
  };

  if (authStatus === 'DENIED') {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="text-alert mb-4 w-16 h-16 animate-pulse" />
              <h1 className="text-3xl font-black text-white uppercase mb-2">Access Denied</h1>
              <p className="font-mono text-gray-500 text-xs mb-8">Authorization token missing or expired.</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-alert text-black font-mono text-sm px-6 py-3 uppercase font-bold hover:bg-white transition-colors"
              >
                  Return to Base
              </button>
          </div>
      );
  }

  // Pure Terminal State (No Header/Footer)
  if (authStatus === 'CHECKING' || !showContent) {
      return (
        <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">
             {/* CRT Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-scanline opacity-10"></div>
            <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.4)_100%)]"></div>
            
            <div className="max-w-3xl w-full px-6 flex flex-col justify-end h-[60vh]">
                <div className="font-mono text-sm md:text-base space-y-2">
                    {terminalLines.map((line, i) => (
                        <div key={i} className="text-green-500 animate-in fade-in duration-300">
                            {line}
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </div>
            </div>
        </div>
      );
  }

  // Full Page Content State
  return (
    <div className="min-h-screen bg-void text-signal font-inter flex flex-col">
        <Starfield />
        <Header />
        
        <style>{`
            @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes cardReveal {
                from { opacity: 0; transform: translateY(20px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .card-reveal {
                opacity: 0;
                animation: cardReveal 0.8s ease-out forwards;
            }
        `}</style>
        
        <div className="bg-black pt-20 pb-20 relative overflow-hidden flex-1">
            {/* CRT Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-scanline opacity-10"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 animate-slide-up relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-alert transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                            <span className="font-mono text-xs text-green-500 uppercase tracking-widest flex items-center gap-2 border border-green-500/30 px-2 py-1 bg-green-500/10">
                                <Terminal size={12} /> Secure Terminal Active
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                            Classified<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-alert to-white">Visual Archives</span>
                        </h1>
                    </div>
                    <div className="text-right font-mono text-xs text-gray-500 mt-6 md:mt-0">
                        CLEARANCE: LEVEL 5<br/>
                        SESSION: ENCRYPTED
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-12">
                    {moments.map((moment, index) => (
                        <div 
                            key={moment.id} 
                            className="bg-void-gray border border-gray-800 p-1 group hover:border-alert/50 transition-colors duration-500 card-reveal"
                            style={{ animationDelay: `${index * 200 + 300}ms` }}
                        >
                            {/* Meta Header */}
                            <div className="bg-black p-3 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest border-b border-gray-800">
                                <span className="text-alert">{moment.id}</span>
                                <span>{moment.date}</span>
                            </div>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Media Container */}
                                <div className="lg:w-2/3 relative overflow-hidden bg-black flex items-center justify-center">
                                    {moment.mediaType === 'video' ? (
                                        <video 
                                            src={moment.image} 
                                            controls
                                            loop
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <img 
                                            src={moment.image} 
                                            alt={moment.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none"></div>
                                </div>

                                {/* Data */}
                                <div className="lg:w-1/3 p-6 md:p-8 flex flex-col bg-void-dark">
                                    <div className="mb-6">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-2xl font-bold text-white uppercase mb-2 leading-tight">{moment.title}</h2>
                                            {moment.mediaType === 'video' ? 
                                                <Video size={16} className="text-gray-500" /> : 
                                                <ImageIcon size={16} className="text-gray-500" />
                                            }
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {moment.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-mono border border-gray-700 text-gray-400 px-2 py-1 uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="font-mono text-xs text-gray-400 leading-relaxed border-l-2 border-alert/30 pl-4">
                                            {moment.caption}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-2 border-t border-gray-800 pt-6">
                                        <div className="flex justify-between text-[10px] font-mono text-gray-500">
                                            <span className="flex items-center gap-2"><Clock size={12} /> PROCESS_TIME</span>
                                            <span className="text-white">{moment.readTime}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-gray-500">
                                            <span className="flex items-center gap-2"><Aperture size={12} /> SENSOR_ARRAY</span>
                                            <span className="text-white">PRIMARY</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-gray-500">
                                            <span className="flex items-center gap-2"><Eye size={12} /> VISUAL_CLARITY</span>
                                            <span className="text-white">94.2%</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleDownload(moment.image, moment.id)}
                                        disabled={downloadingId === moment.id}
                                        className="mt-6 w-full py-3 bg-white/5 border border-gray-700 hover:bg-alert hover:text-black hover:border-alert transition-all text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {downloadingId === moment.id ? (
                                            <span className="animate-pulse">EXTRACTING DATA...</span>
                                        ) : (
                                            <>
                                                <Download size={14} className="group-hover:animate-bounce" /> EXTRACT VISUAL ASSET
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <Footer />
    </div>
  );
};

export default VisualLogsTerminal;
