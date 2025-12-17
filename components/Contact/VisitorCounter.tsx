'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VisitorCounterProps {
  goatCounterCode?: string;
  inView: boolean;
}

export default function VisitorCounter({ goatCounterCode, inView }: VisitorCounterProps) {
  const [count, setCount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Only render if GoatCounter is configured
  if (!goatCounterCode) {
    return null;
  }

  useEffect(() => {
    // Only fetch when component is in view
    if (!inView) return;

    const fetchCount = async () => {
      try {
        // GoatCounter JSON API endpoint for site-wide total
        const response = await fetch(
          `https://${goatCounterCode}.goatcounter.com/counter/.json`,
          { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch counter');
        }

        const data = await response.json();
        // Extract count from response (formatted string like "1,234")
        setCount(data.count || '0');
        setError(false);
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [goatCounterCode, inView]);

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
        <div className="absolute inset-0 bg-matrix-green opacity-20 blur-md animate-pulse"></div>

        {/* Counter badge with Matrix styling */}
        <div className="relative border-2 border-matrix-green bg-matrix-dark/90 px-4 py-2 shadow-lg shadow-matrix-green/20">
          {loading ? (
            <span className="text-matrix-green-dark text-xs">LOADING...</span>
          ) : error ? (
            <span className="text-red-500 text-xs">ERROR</span>
          ) : (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-matrix-green font-bold text-lg tracking-wider drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]"
              style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.8)' }}
            >
              {count}
            </motion.span>
          )}
        </div>

        {/* Corner accents for cool effect */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-matrix-cyan"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-matrix-cyan"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-matrix-cyan"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-matrix-cyan"></div>
      </div>
    </motion.div>
  );
}
