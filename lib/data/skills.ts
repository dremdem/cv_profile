export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'language' | 'framework' | 'tool' | 'soft';
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "TypeScript", level: 90, category: "language" },
  { name: "JavaScript", level: 95, category: "language" },
  { name: "Python", level: 85, category: "language" },
  { name: "Go", level: 75, category: "language" },
  { name: "Rust", level: 70, category: "language" },

  // Frameworks & Libraries
  { name: "React", level: 95, category: "framework" },
  { name: "Next.js", level: 90, category: "framework" },
  { name: "Node.js", level: 90, category: "framework" },
  { name: "Express", level: 85, category: "framework" },
  { name: "Vue.js", level: 80, category: "framework" },
  { name: "FastAPI", level: 75, category: "framework" },

  // Tools & Platforms
  { name: "Docker", level: 85, category: "tool" },
  { name: "Kubernetes", level: 75, category: "tool" },
  { name: "AWS", level: 80, category: "tool" },
  { name: "Git", level: 95, category: "tool" },
  { name: "PostgreSQL", level: 85, category: "tool" },
  { name: "Redis", level: 80, category: "tool" },

  // Soft Skills
  { name: "Problem Solving", level: 95, category: "soft" },
  { name: "Team Leadership", level: 85, category: "soft" },
  { name: "Communication", level: 90, category: "soft" },
  { name: "Agile/Scrum", level: 85, category: "soft" },
];

export const skillCategories = {
  language: "Programming Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools & Platforms",
  soft: "Soft Skills"
};
