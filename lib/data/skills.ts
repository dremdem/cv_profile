export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'language' | 'framework' | 'tool' | 'soft';
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "language" },
  { name: "SQL", level: 85, category: "language" },
  { name: "JavaScript", level: 75, category: "language" },
  { name: "HTML", level: 80, category: "language" },

  // Frameworks & Libraries
  { name: "Django", level: 90, category: "framework" },
  { name: "Django REST Framework", level: 90, category: "framework" },
  { name: "Flask", level: 90, category: "framework" },
  { name: "FastAPI", level: 95, category: "framework" },
  { name: "GraphQL", level: 85, category: "framework" },
  { name: "Pandas", level: 85, category: "framework" },
  { name: "NumPy", level: 80, category: "framework" },

  // Tools & Platforms
  { name: "Docker", level: 90, category: "tool" },
  { name: "Docker Compose", level: 90, category: "tool" },
  { name: "Kubernetes", level: 80, category: "tool" },
  { name: "AWS ECS", level: 85, category: "tool" },
  { name: "AWS S3", level: 85, category: "tool" },
  { name: "Linux", level: 90, category: "tool" },
  { name: "Bash", level: 85, category: "tool" },
  { name: "Git", level: 90, category: "tool" },
  { name: "PostgreSQL", level: 90, category: "tool" },
  { name: "MySQL", level: 85, category: "tool" },
  { name: "MongoDB", level: 85, category: "tool" },
  { name: "Oracle", level: 75, category: "tool" },
  { name: "MSSQL", level: 75, category: "tool" },
  { name: "Elasticsearch", level: 80, category: "tool" },
  { name: "Airflow", level: 75, category: "tool" },
  { name: "Pytest", level: 85, category: "tool" },
  { name: "GitHub Actions", level: 80, category: "tool" },
  { name: "Dash", level: 75, category: "tool" },

  // Soft Skills
  { name: "Backend Development", level: 95, category: "soft" },
  { name: "API Design", level: 90, category: "soft" },
  { name: "Data Processing", level: 85, category: "soft" },
  { name: "DevOps", level: 85, category: "soft" },
  { name: "AI Assistance (Copilot/ChatGPT/Claude)", level: 90, category: "soft" },
];

export const skillCategories = {
  language: "Programming Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools & Platforms",
  soft: "Soft Skills"
};
