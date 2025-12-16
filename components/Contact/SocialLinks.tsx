'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data/personal-info';

interface SocialLink {
  command: string;
  label: string;
  url: string;
  icon: string;
}

interface SocialLinksProps {
  inView: boolean;
}

export default function SocialLinks({ inView }: SocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      command: 'email',
      label: personalInfo.email,
      url: `mailto:${personalInfo.email}`,
      icon: '📧',
    },
    {
      command: 'telegram',
      label: 'dremdem',
      url: personalInfo.links.telegram,
      icon: '✈️',
    },
    {
      command: 'linkedin',
      label: 'vladimiryakovenko-7b666686',
      url: personalInfo.links.linkedin,
      icon: '💼',
    },
    {
      command: 'github',
      label: 'dremdem',
      url: personalInfo.links.github,
      icon: '🐙',
    },
    {
      command: 'cv-pdf',
      label: 'yakovenko_python_en.pdf',
      url: 'https://github.com/dremdem/cv/blob/master/yakovenko_python_en.pdf',
      icon: '📄',
    },
    {
      command: 'cv-md',
      label: 'yakovenko_python_en.md',
      url: 'https://github.com/dremdem/cv/blob/master/yakovenko_python_en.md',
      icon: '📝',
    },
  ];

  return (
    <div className="space-y-3">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.command}
          href={link.url}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          className="block group"
        >
          <div className="font-terminal text-sm bg-matrix-dark border-2 border-matrix-green px-4 py-3 rounded hover:bg-matrix-green-dark hover:border-matrix-cyan transition-all duration-300 transform hover:translate-x-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{link.icon}</span>
                <div>
                  <span className="text-matrix-cyan">$ {link.command} </span>
                  <span className="text-matrix-green">{link.label.toLowerCase()}</span>
                </div>
              </div>
              <span className="text-matrix-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
