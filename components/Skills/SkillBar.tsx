'use client';

import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-terminal text-ghost text-sm md:text-base">{name}</span>
        <span className="font-terminal text-matrix-cyan text-xs md:text-sm">{level}%</span>
      </div>
      <div className="relative h-6 bg-pixel-gray border-2 border-matrix-green-dark overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 scanlines"></div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className="relative h-full bg-gradient-to-r from-matrix-green-dark to-matrix-green"
          style={{
            boxShadow: `0 0 10px rgba(0, 255, 65, 0.5)`,
          }}
        >
          {/* Pixel Effect Overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.2) 2px,
                rgba(0, 0, 0, 0.2) 4px
              )`
            }}
          ></div>
        </motion.div>

        {/* Grid Lines */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-matrix-green-dark/30"
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
