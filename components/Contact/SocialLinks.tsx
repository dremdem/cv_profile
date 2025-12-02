'use client';

import { motion } from 'framer-motion';

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
      command: 'send',
      label: 'EMAIL',
      url: 'mailto:your.email@example.com',
      icon: '📧',
    },
    {
      command: 'connect',
      label: 'LINKEDIN',
      url: 'https://linkedin.com/in/yourusername',
      icon: '💼',
    },
    {
      command: 'view',
      label: 'GITHUB',
      url: 'https://github.com/yourusername',
      icon: '🐙',
    },
    {
      command: 'download',
      label: 'CV (PDF)',
      url: '/cv.pdf',
      icon: '📄',
    },
    {
      command: 'view',
      label: 'CV (MD)',
      url: '/cv.md',
      icon: '📝',
    },
  ];

  return (
    <div className="space-y-3">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
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
