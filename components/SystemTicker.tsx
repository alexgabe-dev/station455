import React from 'react';

const SystemTicker: React.FC = () => {
  const messages = [
    "SECTOR 7G STATUS: NOMINAL",
    "background_radiation: 0.045 mSv",
    "INCOMING_PACKET: DECRYPTING...",
    "OORT_CLOUD_SENSOR: ONLINE",
    "VOID_RELAY: ACTIVE",
    "ANOMALY_DETECTED: SECTOR 4",
    "STATION_INTEGRITY: 94%",
    "LAST_BOOT: CYCLE 440",
  ];

  return (
    <div className="w-full bg-black border-y border-gray-900 overflow-hidden py-2 select-none">
      <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite] hover:pause">
        {[...messages, ...messages, ...messages].map((msg, i) => (
          <div key={i} className="mx-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-alert/50 rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-alert transition-colors cursor-help">
              {msg}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default SystemTicker;