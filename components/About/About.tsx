'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/lib/data/personal-info';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="terminal-window"
        >
          <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>

          <div className="py-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="font-pixel text-2xl md:text-3xl text-matrix-green mb-2">
                {'>> WHO_AM_I.txt'}
              </h2>
              <div className="h-1 w-24 bg-matrix-green"></div>
            </motion.div>

            {/* System Initialization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-terminal text-matrix-green-dark text-sm mb-6 space-y-1"
            >
              <p>{'>'} SYSTEM INITIATED...</p>
              <p>{'>'} LOADING PROFILE...</p>
              <p>{'>'} STATUS: READY</p>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              {personalInfo.bio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                  className="font-code text-ghost leading-relaxed text-sm md:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Quick Stats/Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="border-l-4 border-matrix-green pl-4">
                <p className="font-terminal text-matrix-cyan text-sm">LOCATION</p>
                <p className="font-code text-ghost text-sm">{personalInfo.location}</p>
                <p className="font-code text-matrix-green-dark text-xs mt-1">{personalInfo.locationNote}</p>
              </div>
              <div className="border-l-4 border-matrix-cyan pl-4">
                <p className="font-terminal text-matrix-cyan text-sm">CONTACT</p>
                <p className="font-code text-ghost text-sm">{personalInfo.email}</p>
              </div>
            </motion.div>

            {/* Command Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="mt-6 font-terminal text-matrix-green text-sm"
            >
              <span>{'>'} profile.status</span>
              <span className="animate-blink ml-1">_</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Pixel Divider */}
        <div className="pixel-divider"></div>
      </div>
    </section>
  );
}
