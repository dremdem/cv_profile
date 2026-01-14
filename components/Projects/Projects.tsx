'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '@/lib/data/projects';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 px-4 relative z-10">
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
                {'>> SIDE_QUESTS.log'}
              </h2>
              <div className="h-1 w-24 bg-matrix-green"></div>
            </motion.div>

            {/* System Initialization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-terminal text-matrix-green-dark text-sm mb-8 space-y-1"
            >
              <p>{'>'} LOADING PROJECT DATABASE...</p>
              <p>{'>'} PARSING NOTABLE BUILDS...</p>
              <p>{'>'} STATUS: LOADED</p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{
                    delay: 0.6 + index * 0.15,
                    duration: 0.6,
                    type: 'spring',
                  }}
                  className="group"
                >
                  <div className="bg-matrix-dark border-2 border-matrix-green p-6 rounded hover:border-matrix-cyan hover:bg-matrix-green-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-matrix-green/20 h-full">
                    <div className="flex flex-col h-full">
                      {/* Icon and Title */}
                      <div className="flex items-center space-x-3 mb-3">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="text-3xl flex-shrink-0"
                        >
                          {project.icon}
                        </motion.div>
                        <h3 className="font-terminal text-lg text-matrix-green group-hover:text-matrix-cyan transition-colors">
                          {project.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-code text-ghost text-sm mb-4 flex-grow">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-terminal px-2 py-1 bg-matrix-green-dark border border-matrix-green text-matrix-green rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar Effect */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 bg-gradient-to-r from-matrix-green to-matrix-cyan mt-4"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Command Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-8 font-terminal text-matrix-green text-sm"
            >
              <span>{'>'} projects.loaded</span>
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
