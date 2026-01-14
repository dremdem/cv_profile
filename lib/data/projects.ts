export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  icon: string;
  category: 'code-sample' | 'pet-project' | 'open-source';
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  // Code Samples / Test Assignments
  {
    id: "proj-1",
    name: "FastAPI Microservices",
    description: "XML processing microservice architecture with Celery for distributed task processing",
    technologies: ["FastAPI", "Celery", "Redis", "Docker"],
    icon: "⚡",
    category: "code-sample",
    githubUrl: "https://github.com/dremdem/fastapi_celery_xml"
  },
  {
    id: "proj-2",
    name: "Kafka Site Checker",
    description: "Distributed website health monitoring system using Kafka message broker",
    technologies: ["Kafka", "Python", "PostgreSQL", "Docker"],
    icon: "🔍",
    category: "code-sample",
    githubUrl: "https://github.com/dremdem/site_checker"
  },
  {
    id: "proj-3",
    name: "Serverless Kanban",
    description: "AWS Lambda-based backend API for Kanban board application",
    technologies: ["AWS Lambda", "API Gateway", "Python"],
    icon: "☁️",
    category: "code-sample",
    githubUrl: "https://github.com/dremdem/kanban-board-backend"
  },
  {
    id: "proj-4",
    name: "REST API Example",
    description: "Clean REST API implementation with Flask, SQLAlchemy, Marshmallow and Alembic",
    technologies: ["Flask", "SQLAlchemy", "Marshmallow", "Alembic"],
    icon: "🔧",
    category: "code-sample",
    githubUrl: "https://github.com/dremdem/autods_test_asg"
  },

  // Personal / Pet Projects
  {
    id: "proj-5",
    name: "Stupid Chat Bot",
    description: "AI-powered Telegram chatbot with web interface for interactive conversations",
    technologies: ["Python", "Telegram API", "OpenAI", "FastAPI"],
    icon: "🤖",
    category: "pet-project",
    githubUrl: "https://github.com/dremdem/stupid_chat_bot",
    liveUrl: "https://stupidbot.dremdem.ru"
  },
  {
    id: "proj-6",
    name: "CV Profile",
    description: "Personal portfolio with Matrix/8-bit aesthetic and automated CI/CD pipeline",
    technologies: ["Next.js", "TypeScript", "Docker", "GitHub Actions"],
    icon: "👾",
    category: "pet-project",
    githubUrl: "https://github.com/dremdem/cv_profile",
    liveUrl: "https://dremdem.ru"
  },

  // Open Source Contributions
  {
    id: "proj-7",
    name: "pytest-monitor-backend",
    description: "Flask/MongoDB backend for pytest test monitoring and metrics collection",
    technologies: ["Flask", "MongoDB", "Python"],
    icon: "🧪",
    category: "open-source",
    githubUrl: "https://github.com/dremdem/pytest-monitor-backend"
  },
  {
    id: "proj-8",
    name: "tldr",
    description: "Contributed Russian translations to the tldr-pages project",
    technologies: ["Markdown", "Translation"],
    icon: "📚",
    category: "open-source",
    githubUrl: "https://github.com/dremdem/tldr"
  }
];

export const projectCategories = {
  'code-sample': {
    title: 'CODE_SAMPLES',
    description: 'Test assignments & code examples'
  },
  'pet-project': {
    title: 'PET_PROJECTS',
    description: 'Personal side projects'
  },
  'open-source': {
    title: 'OPEN_SOURCE',
    description: 'Contributions to open source'
  }
};
