
import React from 'react';
import { X, Github, Code, Cpu, Calendar, HelpCircle, Terminal } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: "MISSION_DIRECTIVE (Purpose)",
      answer: "This station was constructed for entertainment purposes. A creative exploration of cosmic horror and sci-fi aesthetics designed to test the limits of minimalist vertical interfaces.",
      icon: <HelpCircle size={16} />
    },
    {
      question: "ARCHITECT (Creator)",
      answer: (
        <span className="flex items-center gap-2 flex-wrap">
          Made by Alex Gabe.
          <a href="https://github.com/alexgabe-dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-alert hover:underline bg-white/5 px-2 py-0.5 border border-alert/20 rounded-sm">
            <Github size={12} /> github.com/alexgabe-dev
          </a>
        </span>
      ),
      icon: <Cpu size={16} />
    },
    {
      question: "CONSTRUCTION_DATE",
      answer: "Station operational since 2025.01.05. Built with a love for sci-fi interfaces and void-like atmospheres.",
      icon: <Calendar size={16} />
    },
    {
      question: "SYSTEM_ARCHITECTURE (Tech Stack)",
      answer: (
        <div className="space-y-2">
          <p>Core systems running on:</p>
          <ul className="list-disc list-inside font-mono text-xs text-gray-500 space-y-1 ml-2">
            <li><span className="text-gray-300">React 19</span> (Frontend Core)</li>
            <li><span className="text-gray-300">TypeScript</span> (Type Safety Protocols)</li>
            <li><span className="text-gray-300">TailwindCSS</span> (Visual Styling)</li>
            <li><span className="text-gray-300">Lucide-React</span> (Iconography)</li>
            <li><span className="text-gray-300">Vite</span> (Build System)</li>
          </ul>
        </div>
      ),
      icon: <Code size={16} />
    },
    {
      question: "SIGNAL_ORIGIN (Lore)",
      answer: "Transmissions originate from Sector 7G, simulating a deep-space relay station drifting near a unstable wormhole. No actual subspace signals are generated... yet.",
      icon: <Terminal size={16} />
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-void-dark border border-gray-800 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900/50">
          <h2 className="text-white font-mono text-lg uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-alert rounded-full animate-pulse"></span>
            Station_FAQ_Database
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 bg-scanline custom-scrollbar">
          {faqs.map((item, idx) => (
            <div key={idx} className="group">
              <h3 className="text-alert font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                {item.icon} {item.question}
              </h3>
              <div className="text-gray-400 font-inter font-light leading-relaxed border-l-2 border-gray-800 pl-4 group-hover:border-alert transition-colors text-sm md:text-base">
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 text-center">
          <span className="font-mono text-[10px] text-gray-600 uppercase">END_OF_FILE // STATION445</span>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
