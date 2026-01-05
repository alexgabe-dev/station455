import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTransmissions } from '../services/stationService';
import { Transmission } from '../types';
import { FileText, Calendar, Tag } from 'lucide-react';
import Seo from '../components/Seo';

const TransmissionsPage: React.FC = () => {
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransmissions().then(data => {
        setTransmissions(data);
        setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-void pt-10 pb-20">
      <Seo 
        title="Blog & Transmissions" 
        description="Archive of all intercepted signals and logs from Station445."
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="border-b border-gray-800 pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                    The Blog
                </h1>
                <p className="font-mono text-alert text-sm tracking-widest">
                    // DECLASSIFIED_RECORDS_ARCHIVE
                </p>
            </div>
            <div className="font-mono text-xs text-gray-500 text-right">
                RECORDS_FOUND: {transmissions.length}<br/>
                CLEARANCE: MAX
            </div>
        </div>

        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-video bg-void-gray animate-pulse border border-gray-800"></div>
                ))}
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {transmissions.map((t) => (
                    <Link 
                        to={`/blog/${t.slug}`} 
                        key={t.id} 
                        className="group bg-void-gray border border-gray-800 hover:border-alert transform hover:scale-[1.01] transition-all duration-300 block overflow-hidden flex flex-col h-full shadow-md hover:shadow-alert/10"
                    >
                        <div className="aspect-video relative overflow-hidden bg-black">
                            {t.coverImage && (
                                <img 
                                    src={t.coverImage} 
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                                    alt={t.title} 
                                />
                            )}
                            <div className="absolute inset-0 bg-scanline opacity-40 pointer-events-none"></div>
                            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-white/10">
                                <span className="text-[10px] font-mono text-white">{t.readTime}</span>
                            </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col bg-scanline relative">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {t.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] font-mono border border-gray-700 px-2 py-0.5 text-gray-400 uppercase group-hover:border-gray-500 transition-colors bg-black/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="font-mono text-[10px] text-alert mb-2 flex items-center gap-2">
                                <Calendar size={10} />
                                {t.publishDate}
                            </div>

                            <h2 className="text-xl font-black text-white uppercase leading-none mb-3 group-hover:text-alert transition-colors drop-shadow-md">
                                {t.title}
                            </h2>

                            <p className="text-xs text-gray-500 font-mono line-clamp-3 mb-6 flex-1 font-light leading-relaxed">
                                {t.excerpt}
                            </p>
                            
                            <div className="border-t border-gray-800 pt-4 mt-auto flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                <FileText size={14} className="text-alert" />
                                Read Article
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default TransmissionsPage;