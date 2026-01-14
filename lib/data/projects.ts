export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  icon: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "FastAPI Microservices",
    description: "Production-ready microservices architecture with Celery for distributed task processing and async job queues",
    technologies: ["FastAPI", "Celery", "Redis", "Docker"],
    icon: "⚡"
  },
  {
    id: "proj-2",
    name: "Distributed Health Checker",
    description: "Kafka-based distributed system for monitoring website availability and performance across multiple regions",
    technologies: ["Kafka", "Python", "PostgreSQL", "Docker"],
    icon: "🔍"
  },
  {
    id: "proj-3",
    name: "Serverless Backend",
    description: "AWS Lambda serverless architecture for scalable API endpoints with automatic scaling and cost optimization",
    technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    icon: "☁️"
  },
  {
    id: "proj-4",
    name: "AI Telegram Chatbot",
    description: "Intelligent chatbot with natural language processing capabilities and a companion web interface for management",
    technologies: ["Python", "Telegram API", "OpenAI", "FastAPI"],
    icon: "🤖"
  }
];
