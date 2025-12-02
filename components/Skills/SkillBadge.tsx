'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  delay?: number;
}

export default function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="relative group"
    >
      <div className="px-4 py-2 bg-pixel-gray border-2 border-matrix-green text-matrix-green font-terminal text-xs md:text-sm transition-all duration-200 group-hover:bg-matrix-green group-hover:text-matrix-dark group-hover:shadow-lg group-hover:shadow-matrix-green/50">
        {name}
      </div>
      {/* 8-bit shadow effect */}
      <div className="absolute inset-0 bg-matrix-green/20 transform translate-x-1 translate-y-1 -z-10"></div>
    </motion.div>
  );
}
