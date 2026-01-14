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
    company: "Causify",
    role: "Backend Python Developer",
    startDate: "Dec 2022",
    endDate: "Present",
    achievements: [
      "Developed FastAPI microservices and ETL pipelines, reducing processing time by 35%",
      "Architected CI/CD workflows achieving 95% test coverage",
      "Data processing pipelines using Pandas and NumPy",
      "Built Dash applications for data visualization",
      "Managed AWS ECS deployments and S3 storage"
    ],
    technologies: ["FastAPI", "Python 3.10+", "Docker", "AWS ECS", "AWS S3", "Pandas", "NumPy", "Dash", "GitHub Actions"],
    level: 10
  },
  {
    id: "exp-2",
    company: "SXOPE",
    role: "Backend Python Developer",
    startDate: "May 2022",
    endDate: "Dec 2022",
    achievements: [
      "Built FastAPI endpoints serving 100+ healthcare providers",
      "Optimized Elasticsearch queries, improving performance by 40%",
      "Designed MySQL database models for healthcare automation",
      "Administered Kubernetes clusters for production workloads"
    ],
    technologies: ["FastAPI", "Python", "MySQL", "Elasticsearch", "Kubernetes"],
    level: 9
  },
  {
    id: "exp-3",
    company: "Zentist",
    role: "Backend Python Developer",
    startDate: "Aug 2021",
    endDate: "May 2022",
    achievements: [
      "Constructed GraphQL APIs processing 10,000+ insurance claims monthly",
      "Integrated 15+ third-party services for dental insurance workflows",
      "Developed Flask APIs with MySQL integration",
      "Managed Kubernetes deployments"
    ],
    technologies: ["GraphQL", "Flask", "Python", "MySQL", "Kubernetes"],
    level: 8
  },
  {
    id: "exp-4",
    company: "ParticleOne",
    role: "Backend Python Developer",
    startDate: "Sep 2020",
    endDate: "Aug 2021",
    achievements: [
      "Developed REST API client library for 20+ institutional clients",
      "Managed Airflow DAGs orchestrating 30+ jobs",
      "Built ETL pipelines with Python and Pandas",
      "Containerized applications with Docker"
    ],
    technologies: ["Python", "Pandas", "Docker", "Airflow"],
    level: 7
  },
  {
    id: "exp-5",
    company: "Stalins Lists",
    role: "Backend Python Developer",
    startDate: "Oct 2019",
    endDate: "Apr 2020",
    achievements: [
      "Website modernization project",
      "Developed Django REST Framework APIs",
      "Implemented PostgreSQL database backend"
    ],
    technologies: ["Django", "Django REST Framework", "PostgreSQL"],
    level: 6
  },
  {
    id: "exp-6",
    company: "AutoCruitment",
    role: "Backend Python Developer",
    startDate: "Dec 2018",
    endDate: "Mar 2019",
    achievements: [
      "Clinical trial matching platform (autocruitment.com)",
      "Built Django backend with OpenAPI specifications",
      "Integrated PostgreSQL and MongoDB databases"
    ],
    technologies: ["Django", "OpenAPI", "PostgreSQL", "MongoDB"],
    level: 5
  },
  {
    id: "exp-7",
    company: "PEAT Technology",
    role: "Backend Python Developer",
    startDate: "Jun 2018",
    endDate: "Oct 2018",
    achievements: [
      "Plantix agricultural advisory application",
      "Developed Flask backend with OpenAPI integration"
    ],
    technologies: ["Flask", "OpenAPI", "Python"],
    level: 4
  },
  {
    id: "exp-8",
    company: "Orbeliani",
    role: "Backend Python Developer",
    startDate: "Feb 2018",
    endDate: "Jul 2018",
    achievements: [
      "Georgian civic crowdfunding platform",
      "Built Django backend with PostgreSQL",
      "Handled DevOps and deployment tasks"
    ],
    technologies: ["Django", "PostgreSQL", "DevOps"],
    level: 3
  },
  {
    id: "exp-9",
    company: "Julius Streicher Anti-Prize",
    role: "Backend Python Developer",
    startDate: "Jan 2018",
    endDate: "Feb 2018",
    achievements: [
      "Voting platform application",
      "Developed Django 2.0 backend with MySQL"
    ],
    technologies: ["Django 2.0", "MySQL"],
    level: 2
  },
  {
    id: "exp-10",
    company: "JELT",
    role: "Backend Python Developer",
    startDate: "Feb 2017",
    endDate: "Aug 2017",
    achievements: [
      "Web scraper and database interface",
      "Built Flask backend",
      "Implemented MongoDB data storage",
      "Developed web scraping solutions"
    ],
    technologies: ["Flask", "MongoDB", "Web Scraping"],
    level: 1
  }
];
