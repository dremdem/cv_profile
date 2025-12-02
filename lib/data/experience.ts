export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies: string[];
  level: number;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Company Inc.",
    role: "Senior Full Stack Developer",
    startDate: "Jan 2022",
    endDate: "Present",
    achievements: [
      "Led development of microservices architecture serving 1M+ users",
      "Reduced API response time by 40% through optimization",
      "Mentored team of 5 junior developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    level: 3
  },
  {
    id: "exp-2",
    company: "Digital Solutions Ltd.",
    role: "Full Stack Developer",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    achievements: [
      "Built real-time collaboration features for SaaS platform",
      "Integrated payment systems processing $2M+ annually",
      "Improved application performance and user experience",
      "Collaborated with cross-functional teams on product features"
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Kubernetes"],
    level: 2
  },
  {
    id: "exp-3",
    company: "StartUp Ventures",
    role: "Frontend Developer",
    startDate: "Jun 2018",
    endDate: "Feb 2020",
    achievements: [
      "Developed responsive web applications from scratch",
      "Implemented state management and routing solutions",
      "Worked closely with designers to create pixel-perfect UIs",
      "Participated in agile development process"
    ],
    technologies: ["React", "JavaScript", "CSS3", "REST APIs"],
    level: 1
  }
];
