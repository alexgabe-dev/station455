import React, { useEffect, useState } from 'react';
import EchoSignals from '../components/EchoSignals';
import { getEchoes } from '../services/stationService';
import { EchoSignal } from '../types';

const MusicPage: React.FC = () => {
  const [echoes, setEchoes] = useState<EchoSignal[]>([]);

  useEffect(() => {
    getEchoes().then(setEchoes);
  }, []);

  return (
    <div className="min-h-screen bg-void pt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
            Station<br/>Radio
        </h1>
        <p className="font-mono text-alert text-sm tracking-widest">
            // TUNING_IN...
        </p>
      </div>
      
      {/* Reusing the player component */}
      <EchoSignals signals={echoes} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-gray-500 font-mono text-xs leading-relaxed">
          <p className="max-w-2xl">
              DEEP_SPACE_AUDIO_LOGS: The music broadcast on Station 445 is a collection of intercepted frequencies, ambient nebula resonance, and recovered audio data from derelict vessels.
          </p>
      </div>
    </div>
  );
};

export default MusicPage;