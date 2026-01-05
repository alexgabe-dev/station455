import React from 'react';
import { Terminal, Mail, Radio, CheckCircle2 } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-void py-12 md:py-20 border-t border-gray-900 border-b relative overflow-hidden">
        {/* Background glow for atmosphere */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-alert/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Content: The Pitch */}
            <div className="w-full lg:w-1/2">
                <span className="font-mono text-alert text-xs uppercase tracking-widest mb-2 block border-l-2 border-alert pl-3">
                    Network Uplink
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.9] mb-6 uppercase tracking-tight">
                    Subscribe to<br/>Transmissions
                </h2>
                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-md">
                    Join our subspace frequency to receive updates directly to your terminal. 
                    Stay informed on the latest anomalies, logs, and station alerts.
                </p>

                {/* Benefits List - clearer than the previous "Status" boxes */}
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border border-gray-800 bg-void-gray/50 hover:border-alert/30 transition-colors group">
                        <div className="p-2 bg-black border border-gray-700 text-alert group-hover:bg-alert group-hover:text-black transition-colors">
                            <Radio size={18} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase text-sm mb-1">Priority Signals</h3>
                            <p className="text-xs text-gray-500 font-mono">Weekly notifications about new blog posts and intercepted signals.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border border-gray-800 bg-void-gray/50 hover:border-alert/30 transition-colors group">
                        <div className="p-2 bg-black border border-gray-700 text-white group-hover:bg-white group-hover:text-black transition-colors">
                            <Mail size={18} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase text-sm mb-1">Deep Space Digest</h3>
                            <p className="text-xs text-gray-500 font-mono">Monthly curated summary of the best content and station lore.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content: The Form */}
            <div className="w-full lg:w-1/2">
                <div className="bg-void-gray border border-gray-800 p-6 md:p-10 relative">
                    {/* Decor lines */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-alert"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-alert"></div>

                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        <Terminal size={20} className="text-alert" />
                        Initialize Connection
                    </h3>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-[10px] font-mono text-gray-500 uppercase mb-2">Identification (Email)</label>
                            <input 
                                type="email" 
                                placeholder="commander@station445.void" 
                                className="w-full bg-black border border-gray-700 px-4 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-alert focus:ring-1 focus:ring-alert transition-all font-mono text-sm"
                            />
                        </div>
                        
                        <div className="flex items-start gap-2 mb-2">
                             <input type="checkbox" id="consent" className="mt-1 bg-black border-gray-700 accent-alert" />
                             <label htmlFor="consent" className="text-[10px] text-gray-500 font-mono leading-tight">
                                 I agree to receive encrypted data packets from Station445. Frequency spamming is strictly prohibited by galactic law.
                             </label>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-white text-black font-black text-lg px-6 py-4 border border-white hover:bg-alert hover:text-black hover:border-alert transition-colors uppercase tracking-widest active:scale-[0.98] flex justify-center items-center gap-2 group"
                        >
                            <span>Establish Uplink</span>
                            <CheckCircle2 size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                         <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                            Secure Transmission // 256-bit Encryption
                         </span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;