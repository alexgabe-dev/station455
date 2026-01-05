import React from 'react';
import { Transmission } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  data: Transmission | null;
}

const FeaturedTransmission: React.FC<Props> = ({ data }) => {
  if (!data) return <div className="h-[400px] lg:h-[500px] w-full bg-void-gray animate-pulse rounded-md border border-gray-800"></div>;

  return (
    <Link to={`/blog/${data.slug}`} className="block">
        <div className="bg-void-gray text-white rounded-none border border-gray-800 overflow-hidden flex flex-col-reverse lg:flex-row h-auto lg:h-[500px] relative group hover:border-alert transition-colors duration-500">
            
            {/* Tech Decor */}
            <div className="absolute top-0 right-0 p-2 z-20">
                <div className="w-2 h-2 bg-alert animate-pulse rounded-full"></div>
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 lg:p-12 flex-1 flex flex-col justify-between bg-scanline relative z-10">
                <div>
                    <div className="text-alert text-[10px] md:text-xs font-mono font-bold mb-4 tracking-widest uppercase border-l-2 border-alert pl-3">
                        Incoming Transmission // {data.publishDate}
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-black leading-none mb-4 lg:mb-6 tracking-tight uppercase">
                        {data.title}
                    </h2>
                    <div className="text-gray-500 font-mono text-[10px] md:text-xs mb-4 lg:mb-6 flex items-center gap-2">
                        <span>READ_TIME: {data.readTime}</span>
                        <span className="w-px h-3 bg-gray-700"></span>
                        <span>AUTHOR: UNKNOWN</span>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-gray-400 max-w-xl font-light line-clamp-3 md:line-clamp-none">
                        {data.excerpt}
                    </p>
                </div>
                
                <div className="flex gap-2 md:gap-3 mt-6 lg:mt-8 flex-wrap">
                    {data.tags.map((tag, i) => (
                        <span 
                            key={i} 
                            className={`px-2 py-1 md:px-3 text-[9px] md:text-[10px] font-mono border border-gray-700 uppercase tracking-widest ${i === 0 ? 'bg-white text-black font-bold' : 'text-gray-400'}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 relative h-48 md:h-64 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-l border-gray-800">
                <img 
                    src={data.coverImage} 
                    alt={data.title}
                    loading="eager"
                    // @ts-ignore - React 19 supports fetchPriority but TS might complain depending on version
                    fetchPriority="high"
                    className="w-full h-full object-cover grayscale opacity-80 md:opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-6 h-6 md:w-8 md:h-8 border-t border-l border-white/30"></div>
                        <div className="w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/30"></div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-6 h-6 md:w-8 md:h-8 border-b border-l border-white/30"></div>
                        <div className="w-6 h-6 md:w-8 md:h-8 border-b border-r border-white/30"></div>
                    </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
        </div>
    </Link>
  );
};

export default FeaturedTransmission;