'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '@/lib/data/personal-info';
import SocialLinks from './SocialLinks';
import VisitorCounter from './VisitorCounter';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get GoatCounter code from environment variable
  const goatCounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

  return (
    <section id="contact" className="py-20 px-4 relative z-10">
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
                {'>> CONNECT.sh'}
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
              <p>{'>'} INITIALIZING CONNECTION PROTOCOLS...</p>
              <p>{'>'} LOADING CONTACT METHODS...</p>
              <p>{'>'} STATUS: READY TO CONNECT</p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="md:col-span-1"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-matrix-green opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative border-4 border-matrix-green p-1 bg-matrix-dark">
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-terminal text-matrix-green text-lg">
                      {personalInfo.name}
                    </p>
                    <p className="font-code text-matrix-cyan text-sm">
                      {personalInfo.role}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <div className="md:col-span-2">
                <SocialLinks inView={inView} />
              </div>
            </div>

            {/* Command Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-8 font-terminal text-matrix-green text-sm"
            >
              <span>{'>'} connection.established</span>
              <span className="animate-blink ml-1">_</span>
            </motion.div>

            {/* Visitor Counter */}
            <VisitorCounter goatCounterCode={goatCounterCode} inView={inView} />
          </div>
        </motion.div>

        {/* Pixel Divider */}
        <div className="pixel-divider"></div>
      </div>
    </section>
  );
}
