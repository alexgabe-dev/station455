import React from 'react';
import { EchoSignal } from '../types';
import { Play, Activity } from 'lucide-react';

interface Props {
  signals: EchoSignal[];
}

const EchoSignals: React.FC<Props> = ({ signals }) => {
  return (
    <section className="bg-void border-t border-gray-900 py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Player Card */}
            <div className="w-full lg:w-1/2 bg-void-gray border border-gray-800 p-6 relative">
                 {/* Decor */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-alert"></div>

                <div className="flex gap-6 mb-8 border-b border-gray-800 pb-6">
                    <div className="w-24 h-24 bg-black border border-gray-700 flex items-center justify-center flex-shrink-0">
                         <Activity className="text-alert animate-pulse" size={32} />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-alert uppercase tracking-widest mb-1 block">Live_Feed</span>
                        <h3 className="text-2xl font-black text-white mt-1">STATION 445 RADIO</h3>
                        <p className="text-xs text-gray-500 font-mono mt-2">AMBIENT // SYNTH // VOID</p>
                    </div>
                </div>

                <div className="space-y-1">
                    {signals.length === 0 ? (
                        <div className="text-gray-500 font-mono text-xs p-4 text-center">NO_SIGNALS_DETECTED</div>
                    ) : (
                        signals.map((signal) => (
                            <div key={signal.id} className="flex items-center justify-between group cursor-pointer py-3 px-3 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-alert">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <span className="font-mono text-xs w-12 text-gray-500 group-hover:text-alert transition-colors">{signal.episode}</span>
                                    <span className="text-sm font-medium truncate text-gray-300 group-hover:text-white transition-colors">{signal.title}</span>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <Play size={12} className="fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs text-gray-600 font-mono">{signal.duration}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right: CTA */}
            <div className="w-full lg:w-1/2 pt-4">
                <h2 className="text-6xl font-black text-white leading-[0.9] mb-8 uppercase tracking-tight">
                    Cosmic<br/>Music<br/>Player
                </h2>
                <p className="text-gray-400 max-w-sm mb-8 font-mono text-sm">
                    Listen to the sounds of the universe. Curated tracks for deep space travel and void exploration.
                </p>
                
                <button className="bg-transparent text-alert font-bold font-mono text-lg px-8 py-4 w-full lg:w-auto border border-alert hover:bg-alert hover:text-black transition-all uppercase tracking-widest">
                    Start Listening
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default EchoSignals;