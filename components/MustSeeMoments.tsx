
import React, { useState } from 'react';
import { BurstMoment } from '../types';
import { ArrowRight, Eye, ScanLine, Lock, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hasVisualAccess, setVisualAccess } from '../services/authService';
import PasswordModal from './PasswordModal';

interface Props {
  moments: BurstMoment[];
}

const MustSeeMoments: React.FC<Props> = ({ moments }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccessRequest = () => {
    if (hasVisualAccess()) {
        navigate('/visual-logs');
    } else {
        setIsModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
      setVisualAccess();
      setIsModalOpen(false);
      // Small delay to ensure state updates before navigation
      setTimeout(() => {
          navigate('/visual-logs');
      }, 100);
  };

  return (
    <>
        <section className="bg-void py-20 border-t border-gray-900 relative overflow-hidden">
        {/* Background decoration to hint at purpose */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <ScanLine size={200} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            
            {/* Header with Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
                <div>
                    <span className="font-mono text-xs text-alert mb-2 block uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-alert rounded-full animate-pulse"></span>
                        Surveillance Feed
                    </span>
                    <h2 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                        Visual Logs
                    </h2>
                    <p className="text-gray-500 font-mono text-xs max-w-md">
                        Recent imagery captured by automated drone patrols in Sector 7G. 
                        Requires Level 4 Clearance to view full resolution.
                    </p>
                </div>
                
                <button 
                    onClick={handleAccessRequest}
                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors mt-6 md:mt-0"
                >
                    View Full Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {moments.map((moment) => (
                    <div 
                        key={moment.id} 
                        onClick={handleAccessRequest}
                        className="block group relative cursor-pointer"
                    >
                        {/* Card Container */}
                        <div className="bg-void-gray border border-gray-800 hover:border-alert transition-all duration-300 h-full flex flex-col">
                            
                            {/* Image Header */}
                            <div className="aspect-video overflow-hidden bg-black relative border-b border-gray-800">
                                {moment.mediaType === 'video' ? (
                                    <video 
                                        src={moment.image} 
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale blur-[2px] group-hover:blur-sm"
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img 
                                        src={moment.image} 
                                        alt={moment.title} 
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale blur-[2px] group-hover:blur-sm"
                                    />
                                )}
                                
                                {/* Lock Overlay (Always visible because it's restricted) */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="bg-black/80 border border-alert text-alert px-4 py-2 font-mono text-xs uppercase tracking-widest flex items-center gap-2 backdrop-blur-md group-hover:bg-alert group-hover:text-black transition-colors">
                                        <Lock size={12} /> Restricted
                                    </span>
                                </div>

                                {/* Status Indicator */}
                                <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 border border-gray-700 group-hover:border-alert/50 transition-colors">
                                    {moment.mediaType === 'video' ? 
                                        <Video size={12} className="text-gray-500 group-hover:text-alert" /> : 
                                        <ScanLine size={12} className="text-gray-500 group-hover:text-alert" />
                                    }
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1 relative bg-scanline">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {moment.tags.map((tag, i) => (
                                        <span key={i} className="text-[9px] font-mono border border-gray-800 bg-black/50 px-2 py-0.5 text-gray-400 uppercase group-hover:text-white group-hover:border-gray-600 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-[10px] text-alert font-mono mb-2 opacity-70">
                                    RECORDED: {moment.date}
                                </div>
                                
                                <h3 className="text-lg font-bold leading-tight mb-3 text-white uppercase group-hover:text-alert transition-colors">
                                    {moment.title}
                                </h3>
                                
                                <p className="text-gray-500 text-xs leading-relaxed font-mono mb-4 flex-1">
                                    {moment.caption}
                                </p>

                                <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-gray-400">
                                    <span>ID: {moment.id}</span>
                                    <span className="flex items-center gap-1 group-hover:text-alert transition-colors">
                                        Login <Eye size={10} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        </section>
        
        <PasswordModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={handleAuthSuccess}
        />
    </>
  );
};

export default MustSeeMoments;
