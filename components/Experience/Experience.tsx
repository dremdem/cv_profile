'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences } from '@/lib/data/experience';
import ExperienceCard from './ExperienceCard';

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-pixel text-2xl md:text-3xl text-matrix-green mb-2">
            {'>> QUEST_LOG.md'}
          </h2>
          <div className="h-1 w-24 bg-matrix-green"></div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-terminal text-matrix-cyan text-sm mt-4"
          >
            {'>'} Loading quest history...
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute left-4 top-0 w-0.5 bg-matrix-green-dark"
          ></motion.div>

          {/* Experience Cards */}
          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Command Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 font-terminal text-matrix-green text-sm"
        >
          <span>{'>'} quest_log.complete</span>
          <span className="animate-blink ml-1">_</span>
        </motion.div>

        {/* Pixel Divider */}
        <div className="pixel-divider"></div>
      </div>
    </section>
  );
}
