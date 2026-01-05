import React, { useRef, useEffect, useState } from 'react';

const FrequencyVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    
    // Configuration
    const barWidth = 4;
    const gap = 2;
    const baseHeight = 20;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const draw = () => {
      // Clear canvas with a slight trail effect for "ghosting"
      ctx.fillStyle = 'rgba(26, 26, 26, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numBars = Math.ceil(canvas.width / (barWidth + gap));
      const centerY = canvas.height / 2;
      
      offset += 0.1; // Animation speed

      for (let i = 0; i < numBars; i++) {
        // Create a complex wave using multiple sines
        const x = i * (barWidth + gap);
        
        // Intensity modifier based on mouse hover
        const intensity = isHovered ? 2.5 : 1.0;
        const noise = Math.random() * (isHovered ? 30 : 5);

        // Sine wave math
        const y1 = Math.sin(i * 0.1 + offset) * 20;
        const y2 = Math.sin(i * 0.05 - offset * 2) * 20;
        const height = Math.abs(y1 + y2 + noise) * intensity + baseHeight;

        // Color logic
        if (height > 80) {
            ctx.fillStyle = '#ff4500'; // Alert color for peaks
        } else {
            ctx.fillStyle = '#333333'; // Void gray for normal
        }

        // Draw mirrored bars
        ctx.fillRect(x, centerY - height / 2, barWidth, height);
      }
      
      // Draw a center line
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.strokeStyle = '#ff4500';
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div 
        className="w-full h-full relative group cursor-crosshair overflow-hidden border border-gray-800 bg-void-dark"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        {/* Overlay UI elements */}
        <div className="absolute top-2 left-2 text-[9px] font-mono text-alert pointer-events-none">
            LIVE_SPECTRUM_ANALYSIS
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-gray-500 pointer-events-none">
            {isHovered ? 'SIGNAL_LOCK: DETECTED' : 'SIGNAL_LOCK: SCANNING...'}
        </div>
        
        {/* Scan line overlay */}
        <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default FrequencyVisualizer;