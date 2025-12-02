'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import MatrixRain from './MatrixRain';
import { personalInfo } from '@/lib/data/personal-info';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="terminal-window"
        >
          <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
          </div>

          {/* Profile Section */}
          <div className="space-y-6 py-8">
            {/* Pixel Art Profile Photo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-32 h-32 mx-auto border-4 border-matrix-green rounded-lg pixel-art overflow-hidden"
            >
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Name with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="font-pixel text-3xl md:text-5xl text-matrix-green mb-2">
                <span className="glitch" data-text={personalInfo.name}>
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter Effect for Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-terminal text-xl md:text-2xl text-matrix-cyan"
            >
              <span className="mr-2">{'>'}</span>
              <TypeAnimation
                sequence={[
                  personalInfo.role,
                  2000,
                  'Full Stack Developer',
                  2000,
                  'Problem Solver',
                  2000,
                  'Code Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
              <span className="animate-blink">_</span>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="pt-6"
            >
              <button
                className="retro-button"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Press Start
              </button>
            </motion.div>

            {/* System Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-terminal text-sm text-matrix-green-dark space-y-1 pt-4"
            >
              <p>{'>'} System initialized...</p>
              <p>{'>'} Loading portfolio data...</p>
              <p>{'>'} Ready to execute...</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-matrix-green text-2xl"
          >
            ▼
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
