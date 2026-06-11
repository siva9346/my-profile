export const personalInfo = {
  name: "Sivaprasath V",
  title: "Full Stack Developer & Generative AI Engineer",
  email: "sivavelmurugan8@gmail.com",
  phone: "+91 63855 99822",
  location: "Coimbatore, Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/sivaprasath-v",
  github: "https://github.com/sivaprasath-v",
  website: "https://sivaprasath.dev",
  bio: "Full Stack Developer and Generative AI Engineer with 3+ years of experience building production-grade React.js, Next.js, and LLM-powered applications. I specialize in bridging frontend excellence with AI integration — from crafting pixel-perfect interfaces to architecting RAG pipelines and agentic AI workflows. Currently at Vigo Retail, I lead frontend development for a high-performance eCommerce platform while exploring the frontier of AI-augmented developer tooling.",
  resumeUrl: "/resume.pdf",
} as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "", label: "Domains Mastered" },
  { value: 40, suffix: "%", label: "Faster Compliance" },
  { value: 35, suffix: "%", label: "Faster Load Time" },
] as const;

export const typewriterRoles = [
  "Full Stack Developer",
  "Generative AI Engineer",
  "React.js Expert",
  "LLM Integration Specialist",
] as const;

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux", level: 85 },
    ],
  },
  {
    title: "AI / LLM",
    icon: "Brain",
    skills: [
      { name: "OpenAI GPT-4", level: 90 },
      { name: "LangChain", level: 85 },
      { name: "RAG Pipelines", level: 88 },
      { name: "Mistral", level: 80 },
      { name: "DeepSeek", level: 78 },
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: [
      { name: "Python", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "AWS Lambda", level: 82 },
      { name: "AWS EC2", level: 80 },
      { name: "DynamoDB", level: 78 },
      { name: "AWS Amplify", level: 85 },
      { name: "Vercel", level: 92 },
    ],
  },
];

export const marqueeSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "OpenAI",
  "LangChain",
  "AWS",
  "Docker",
  "PostgreSQL",
  "TailwindCSS",
  "Node.js",
  "Playwright",
  "GraphQL",
  "Redis",
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "full-time" | "intern";
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    company: "Vigo Retail",
    role: "Software Engineer",
    period: "Dec 2025 – Present",
    type: "full-time",
    bullets: [
      "Lead frontend development for a high-performance retail eCommerce platform serving thousands of daily active users",
      "Architected a micro-frontend module system using Next.js 14, reducing time-to-feature by 30%",
      "Integrated AI-powered product recommendation engine using OpenAI embeddings and vector search",
      "Implemented real-time inventory sync with WebSockets and optimistic UI updates",
      "Reduced bundle size by 35% through code splitting, lazy loading, and advanced Webpack optimizations",
    ],
  },
  {
    company: "Sense7ai",
    role: "Software Engineer",
    period: "Sep 2023 – Jul 2025",
    type: "full-time",
    bullets: [
      "Built Verixa Copilot — a Generative AI assistant for GxP compliance documentation, cutting manual review time by 40%",
      "Designed RAG pipelines using LangChain + OpenAI GPT-4 with FAISS vector store for intelligent document retrieval",
      "Developed Zita ATS, an AI-powered recruitment platform processing 10,000+ resumes/month with NLP matching",
      "Created a standalone API portal with interactive OpenAPI documentation, reducing developer onboarding time by 50%",
      "Built Figma–MCP–Playwright automated testing pipeline achieving 85% UI test coverage",
    ],
  },
  {
    company: "Sense7ai",
    role: "Frontend Developer Intern",
    period: "Apr 2023 – Aug 2023",
    type: "intern",
    bullets: [
      "Developed reusable React component library adopted across 3 internal products",
      "Implemented responsive layouts and micro-animations improving user engagement by 25%",
      "Collaborated with design team to translate Figma mockups into pixel-perfect React components",
      "Wrote unit tests with Jest and React Testing Library, maintaining 80%+ code coverage",
    ],
  },
];

export interface Project {
  title: string;
  company: string;
  description: string;
  tech: string[];
  link: string;
  featured: boolean;
  personal?: boolean;
}

export const projects: Project[] = [
  {
    title: "Retail eCommerce Platform",
    company: "Vigo Retail",
    description:
      "High-performance retail eCommerce platform with AI-powered product recommendations, real-time inventory management, and micro-frontend architecture serving thousands of daily users.",
    tech: ["Next.js 14", "TypeScript", "Tailwind", "OpenAI", "PostgreSQL", "AWS"],
    link: "#",
    featured: true,
  },
  {
    title: "Verixa Copilot",
    company: "Sense7ai",
    description:
      "Generative AI GxP compliance assistant that automates pharmaceutical documentation review. Uses RAG pipelines with LangChain + GPT-4 to reduce compliance audit time by 40%.",
    tech: ["Python", "FastAPI", "LangChain", "OpenAI GPT-4", "FAISS", "React.js"],
    link: "#",
    featured: true,
  },
  {
    title: "Zita ATS",
    company: "Sense7ai",
    description:
      "AI-powered applicant tracking system processing 10,000+ resumes/month with intelligent NLP-based candidate matching, automated screening, and recruiter workflow automation.",
    tech: ["React.js", "Node.js", "Python", "NLP", "AWS Lambda", "DynamoDB"],
    link: "#",
    featured: true,
  },
  {
    title: "Standalone API Portal",
    company: "Sense7ai",
    description:
      "Interactive developer API portal with live OpenAPI documentation, code generation, and sandbox testing environment. Reduced developer onboarding time by 50%.",
    tech: ["Next.js", "TypeScript", "FastAPI", "OpenAPI 3.0", "Tailwind"],
    link: "#",
    featured: false,
  },
  {
    title: "Figma–MCP–Playwright Pipeline",
    company: "Personal Project",
    description:
      "AI-augmented testing pipeline I built that reads Figma design specs via MCP protocol, auto-generates Playwright test cases, and runs automated visual regression testing — achieving 85% test coverage with zero manual test writing.",
    tech: ["Playwright", "MCP", "Figma API", "Python", "AI/LLM", "CI/CD"],
    link: "#",
    featured: false,
    personal: true,
  },
];

export const education = {
  degree: "B.E. Mechanical Engineering",
  institution: "Kongu Engineering College",
  period: "2019 – 2023",
  cgpa: "84.6%",
  tagline: "Engineering roots. AI future.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
