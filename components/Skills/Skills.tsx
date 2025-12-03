'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, skillCategories } from '@/lib/data/skills';
import SkillBar from './SkillBar';
import SkillBadge from './SkillBadge';

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const languageSkills = skills.filter(s => s.category === 'language');
  const frameworkSkills = skills.filter(s => s.category === 'framework');
  const databaseSkills = skills.filter(s => s.category === 'database');
  const toolSkills = skills.filter(s => s.category === 'tool');

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
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
              className="mb-8"
            >
              <h2 className="font-pixel text-2xl md:text-3xl text-matrix-green mb-2">
                {'>> SKILL_TREE.sh'}
              </h2>
              <div className="h-1 w-24 bg-matrix-green"></div>
            </motion.div>

            {/* System Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-terminal text-matrix-green-dark text-sm mb-8 space-y-1"
            >
              <p>{'>'} LOADING SKILL DATA...</p>
              <p>{'>'} PARSING ABILITIES...</p>
              <p>{'>'} RENDERING STATS...</p>
            </motion.div>

            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="font-terminal text-matrix-cyan text-lg md:text-xl mb-4">
                {skillCategories.language}
              </h3>
              {languageSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.8 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Frameworks & Libraries */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="font-terminal text-matrix-cyan text-lg md:text-xl mb-4">
                {skillCategories.framework}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {frameworkSkills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    delay={1.4 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Tools & Platforms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="font-terminal text-matrix-cyan text-lg md:text-xl mb-4">
                {skillCategories.tool}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {toolSkills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    delay={2.0 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Databases */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="font-terminal text-matrix-cyan text-lg md:text-xl mb-4">
                {skillCategories.database}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {databaseSkills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    delay={1.7 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Command Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 3.0, duration: 0.5 }}
              className="mt-6 font-terminal text-matrix-green text-sm"
            >
              <span>{'>'} skills.load_complete</span>
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
