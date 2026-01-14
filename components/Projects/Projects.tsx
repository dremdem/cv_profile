'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects, projectCategories, Project } from '@/lib/data/projects';

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        type: 'spring',
      }}
      className="group"
    >
      <div className="bg-matrix-dark border-2 border-matrix-green p-5 rounded hover:border-matrix-cyan hover:bg-matrix-green-dark transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-matrix-green/20 h-full">
        <div className="flex flex-col h-full">
          {/* Icon and Title */}
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="text-2xl flex-shrink-0"
            >
              {project.icon}
            </motion.div>
            <h4 className="font-terminal text-base text-matrix-green group-hover:text-matrix-cyan transition-colors">
              {project.name}
            </h4>
          </div>

          {/* Description */}
          <p className="font-code text-ghost text-xs mb-3 flex-grow leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-terminal px-1.5 py-0.5 bg-matrix-green-dark border border-matrix-green/50 text-matrix-green rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-matrix-green/30">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-terminal text-matrix-green hover:text-matrix-cyan transition-colors group/link"
            >
              <span className="text-matrix-cyan">$</span>
              <span>git clone</span>
              <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-terminal text-matrix-green hover:text-matrix-cyan transition-colors group/link"
              >
                <span className="text-matrix-cyan">$</span>
                <span>open --live</span>
                <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategorySection({
  category,
  categoryProjects,
  inView,
  startIndex
}: {
  category: 'code-sample' | 'pet-project' | 'open-source';
  categoryProjects: Project[];
  inView: boolean;
  startIndex: number;
}) {
  const categoryInfo = projectCategories[category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mb-8 last:mb-0"
    >
      {/* Category Header */}
      <div className="mb-4 flex items-center space-x-3">
        <span className="font-terminal text-matrix-cyan text-sm">
          {'//'}
        </span>
        <span className="font-terminal text-matrix-green text-sm">
          {categoryInfo.title}.dir
        </span>
        <span className="font-code text-ghost text-xs hidden sm:inline">
          - {categoryInfo.description}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categoryProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={startIndex + index}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const codeSamples = projects.filter(p => p.category === 'code-sample');
  const petProjects = projects.filter(p => p.category === 'pet-project');
  const openSource = projects.filter(p => p.category === 'open-source');

  return (
    <section id="projects" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-5xl">
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
              <p>{'>'} SCANNING PROJECT DIRECTORIES...</p>
              <p>{'>'} FOUND: {projects.length} repositories</p>
              <p>{'>'} STATUS: INDEXED</p>
            </motion.div>

            {/* Categories */}
            <CategorySection
              category="code-sample"
              categoryProjects={codeSamples}
              inView={inView}
              startIndex={0}
            />

            <CategorySection
              category="pet-project"
              categoryProjects={petProjects}
              inView={inView}
              startIndex={codeSamples.length}
            />

            <CategorySection
              category="open-source"
              categoryProjects={openSource}
              inView={inView}
              startIndex={codeSamples.length + petProjects.length}
            />

            {/* Command Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 font-terminal text-matrix-green text-sm"
            >
              <span>{'>'} ls -la complete</span>
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
