'use client';

import { motion } from 'framer-motion';

interface VisitorCounterProps {
  goatCounterCode?: string;
  inView: boolean;
}

export default function VisitorCounter({ goatCounterCode, inView }: VisitorCounterProps) {
  // Only render if GoatCounter is configured
  if (!goatCounterCode) {
    return null;
  }

  // GoatCounter SVG counter URL
  const counterUrl = `https://${goatCounterCode}.goatcounter.com/counter//.svg`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.0, duration: 0.5 }}
      className="mt-6 font-terminal text-matrix-green-dark text-sm flex items-center gap-3"
    >
      <span className="text-matrix-green">{'>'} VISITORS_LOGGED:</span>
      <div className="relative inline-block">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-matrix-cyan opacity-10 blur-sm"></div>

        {/* Counter badge with Matrix styling */}
        <div className="relative border border-matrix-green/30 bg-matrix-dark/80 px-3 py-1">
          <img
            src={counterUrl}
            alt="Visitor count"
            className="inline-block opacity-90 brightness-125 contrast-125 hue-rotate-[60deg] saturate-150"
            style={{
              filter: 'brightness(1.25) contrast(1.25) hue-rotate(60deg) saturate(1.5)',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
