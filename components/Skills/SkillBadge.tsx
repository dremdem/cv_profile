'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  delay?: number;
}

export default function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <div className="px-4 py-2 bg-pixel-gray border-2 border-matrix-green text-matrix-green font-terminal text-xs md:text-sm transition-all duration-200 group-hover:bg-matrix-green group-hover:text-matrix-dark group-hover:shadow-lg group-hover:shadow-matrix-green/50 relative overflow-hidden">
        {name}
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-cyan/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </div>
      {/* 8-bit shadow effect with animation */}
      <motion.div
        className="absolute inset-0 bg-matrix-green/20 transform translate-x-1 translate-y-1 -z-10"
        whileHover={{ translateX: 2, translateY: 2 }}
      ></motion.div>
    </motion.div>
  );
}
