'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Experience } from '@/lib/data/experience';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  inView: boolean;
}

export default function ExperienceCard({ experience, index, inView }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 * index, duration: 0.6 }}
      className="relative group"
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-0 top-0 w-8 h-8 bg-matrix-dark border-4 border-matrix-green rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          className="w-3 h-3 bg-matrix-green rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </motion.div>

      {/* Level Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.3 + 0.2 * index, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="absolute -left-2 -top-2 bg-pixel-red text-ghost font-pixel text-xs px-2 py-1 rounded z-10 shadow-lg shadow-pixel-red/50"
      >
        LVL {experience.level}
      </motion.div>

      {/* Card Content */}
      <motion.div
        className="ml-12 terminal-window mb-8 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="terminal-header">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>

        <div className="py-4">
          {/* Quest Header */}
          <div className="mb-4">
            <div className="font-pixel text-xs text-matrix-cyan mb-2">
              LEVEL {experience.level} QUEST COMPLETED
            </div>
            <div className="h-px bg-matrix-green mb-3"></div>

            <h3 className="font-terminal text-xl text-matrix-green">
              {experience.company}
            </h3>
            <p className="font-code text-ghost text-sm mt-1">
              {experience.role}
            </p>
            <p className="font-terminal text-matrix-cyan text-xs mt-2">
              {experience.startDate} → {experience.endDate}
            </p>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="retro-button text-xs mb-4 w-full"
          >
            <span className="font-terminal">
              {isExpanded ? '▼ HIDE DETAILS' : '▶ SHOW ACHIEVEMENTS'}
            </span>
          </button>

          {/* Achievements (Collapsible) */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              <div>
                <p className="font-terminal text-matrix-cyan text-xs mb-2">
                  ACHIEVEMENTS:
                </p>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: idx * 0.1 }}
                      className="font-code text-ghost text-sm flex items-start"
                    >
                      <span className="text-matrix-green mr-2">→</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="pt-3 border-t border-matrix-green-dark">
                <p className="font-terminal text-matrix-cyan text-xs mb-2">
                  XP GAINED:
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <motion.span
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={isExpanded ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + idx * 0.05, type: 'spring' }}
                      className="font-code text-xs px-3 py-1 bg-matrix-dark border-2 border-matrix-green text-matrix-green rounded hover:bg-matrix-green hover:text-matrix-dark transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
