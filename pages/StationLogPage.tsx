
import React from 'react';
import { ScanLine } from 'lucide-react';

const StationLogPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-void pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* === SECTION 1: STATION MANIFEST (ABOUT) === */}
        <div className="border border-gray-800 bg-void-gray p-8 md:p-16 relative overflow-hidden mb-16">
            {/* Background details */}
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="20" fill="white" />
                </svg>
            </div>

            <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-8 relative z-10">
                Station Log
            </h1>
            
            <div className="space-y-12 font-mono text-sm text-gray-400 relative z-10">
                <div>
                    <strong className="text-white block mb-3 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 w-max">Identity</strong>
                    <p className="leading-relaxed">
                        Station445 is a phantom frequency etched into the cosmic microwave background—a rogue transmission that shouldn't exist.
                    </p>
                </div>

                <div>
                    <strong className="text-white block mb-3 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 w-max">Mission</strong>
                    <p className="leading-relaxed">
                        Our directive is to intercept, decrypt, and broadcast signals that defy conventional explanation. From the music of dying stars to the whispered protocols of lost colony ships, Station445 serves as a lighthouse in the cosmic dark.
                    </p>
                </div>

                <div>
                    <strong className="text-white block mb-3 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 w-max">Status</strong>
                    <p className="leading-relaxed">
                        The station is currently operating at <span className="text-alert font-bold">94% efficiency</span>. Life support is offline. Automated transmission protocols are active.
                    </p>
                </div>

                <div>
                    <strong className="text-white block mb-3 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 w-max">Detection History</strong>
                    <p className="leading-relaxed">
                        Detected in 2026 on 445.000 kHz amid pulsar noise, Station445 first appeared as static bursts during aphelion alignment. No carrier wave origin could be determined. Triangulation attempts failed simultaneously across Budapest, Mauna Kea, and Arecibo remnants.
                    </p>
                </div>

                <div>
                    <strong className="text-white block mb-4 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 w-max">Spectral Analysis</strong>
                    <p className="mb-4">Deep signal processing reveals a layered architecture:</p>
                    <ul className="grid gap-3">
                        <li className="flex items-center gap-4 bg-black/40 p-3 border-l-2 border-gray-700 hover:border-alert transition-colors">
                            <span className="text-alert font-bold font-mono text-xs">01</span>
                            <span className="text-gray-300">Base layer mimics the Big Bang echo at 1420 MHz (Hydrogen Line).</span>
                        </li>
                        <li className="flex items-center gap-4 bg-black/40 p-3 border-l-2 border-gray-700 hover:border-alert transition-colors">
                            <span className="text-alert font-bold font-mono text-xs">02</span>
                            <span className="text-gray-300">Overlaid with human voices reciting art manifestos in extinct dialects.</span>
                        </li>
                        <li className="flex items-center gap-4 bg-black/40 p-3 border-l-2 border-gray-700 hover:border-alert transition-colors">
                            <span className="text-alert font-bold font-mono text-xs">03</span>
                            <span className="text-gray-300">Pulsar rhythms encoding synthwave structures.</span>
                        </li>
                        <li className="flex items-center gap-4 bg-black/40 p-3 border-l-2 border-gray-700 hover:border-alert transition-colors">
                            <span className="text-alert font-bold font-mono text-xs">04</span>
                            <span className="text-gray-300">Embedded visual data bursts containing fractal nebulae geometry.</span>
                        </li>
                    </ul>
                </div>
                
                <div className="p-4 border border-alert bg-alert/5 mt-8 flex items-start gap-3">
                    <div className="w-2 h-2 bg-alert rounded-full mt-1.5 animate-pulse shrink-0"></div>
                    <p className="text-alert font-bold text-xs">WARNING: Prolonged exposure to specific frequencies may induce temporal dissonance.</p>
                </div>
            </div>
            
             <div className="mt-12 pt-8 border-t border-gray-700 flex justify-between font-mono text-xs text-gray-600">
                <span>SIGNAL_ORIGIN: UNKNOWN</span>
                <span>FIRST_CONTACT: 2026</span>
            </div>
        </div>
        
        <div className="text-center text-xs font-mono text-gray-600">
            <ScanLine size={16} className="mx-auto mb-2 text-alert animate-pulse" />
            <p>END OF OPEN ACCESS LOGS</p>
            <p className="mt-2">For classified visual data, please access via the Surveillance Feed terminal on the main deck.</p>
        </div>

      </div>
    </div>
  );
};

export default StationLogPage;
