export const fileSystem: Record<string, any> = {
  "/portfolio/about.json": {
    name: "about.json",
    path: "/portfolio/about.json",
    language: "json",
    content: `{
  "name": "Pritam Priyabrata Palai",
  "title": "AI Engineer & Backend Developer",
  "mission": "Building scalable backend architectures and integrating advanced LLMs directly into the software lifecycle.",
  "core_philosophies": [
    {
      "title": "Scalability First",
      "description": "Designing systems that don't just grow, but thrive under exponential load."
    },
    {
      "title": "AI-Driven Architecture",
      "description": "Integrating predictive modeling and RAG architectures directly into the core workflows."
    }
  ],
  "background": {
    "education": [
      "B.E. Info Science | Present"
    ],
    "experience_log": [
      "[2023-PRESENT] Student & Independent Developer",
      "[2024] Builder of Volunteer Connect & AI Platforms"
    ]
  }
}`
  },
  "/portfolio/projects.json": {
    name: "projects.json",
    path: "/portfolio/projects.json",
    language: "json",
    content: `{
  "engineer": "Pritam Priyabrata Palai",
  "role": "AI & Backend Specialist",
  "projects": [
    {
      "name": "IntentScope",
      "stack": ["Next.js", "FastAPI", "Go", "PostgreSQL", "Docker", "LiteLLM"],
      "focus": "Intelligent API gateway for LLMs with dynamic routing and intent analysis",
      "github": "https://github.com/hg-ppp-2807-dev/intent-scope",
      "live_demo": "https://intent-scope.vercel.app"
    },
    {
      "name": "Volunteer Connect",
      "stack": ["Django", "Python", "Google Maps API", "PostgreSQL"],
      "focus": "Event scheduling & geolocation-based recommendations",
      "github": "https://github.com/pritampalai28/volunteer-connect",
      "live_demo": "https://example.com"
    }
  ]
}`
  },
  "/portfolio/skills.json": {
    name: "skills.json",
    path: "/portfolio/skills.json",
    language: "json",
    content: `{
  "engineer": "AI & Backend Systems",
  "stack": {
    "Deep_Learning_&_AI": [
      "RAG Architectures",
      "LLMs",
      "LangChain",
      "LangGraph",
      "Hugging Face"
    ],
    "Backend_Architecture": [
      "Go (Golang)",
      "Python (FastAPI/Django)",
      "Java",
      "Docker",
      "PostgreSQL"
    ],
    "Frontend": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ]
  },
  "status": "Ready for complex deployments"
}`
  }
};
