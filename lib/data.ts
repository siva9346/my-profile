export const personalInfo = {
  name: "Sivaprasath V",
  title: "Full Stack Developer & Generative AI Engineer",
  email: "sivavelmurugan8@gmail.com",
  phone: "+91 63855 99822",
  linkedin: "https://www.linkedin.com/in/sivaprasathai/",
  github: "https://github.com/siva9346",
  location: "Coimbatore, Tamil Nadu, India",
  photo: "/photo.jpg",
  resume: "/resume/Sivaprasath_V_Resume.pdf",
  bio: "I build intelligent web applications at the intersection of React, AI, and cloud — turning complex ideas into scalable, user-facing products.",
  stats: [
    { value: "3+",    label: "Years Experience" },
    { value: "4",     label: "Domains" },
    { value: "1000+", label: "Users Served" },
  ],
  roles: [
    "Full Stack Developer",
    "Generative AI Engineer",
    "React.js Specialist",
    "LLM Application Builder",
    "FastAPI & AWS Expert",
  ],
};

export const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  ai:       ["OpenAI GPT-4", "LangChain", "RAG Pipelines", "Mistral", "DeepSeek"],
  backend:  ["Python", "FastAPI", "Sql"],
  cloud:    ["AWS Lambda", "EC2", "DynamoDB", "Amplify", "Vercel"],
};

export const marqueeSkills = [
  "React.js", "Next.js", "TypeScript", "Python", "FastAPI",
  "OpenAI GPT-4", "LangChain", "RAG", "Tailwind CSS", "Redux",
  "AWS Lambda", "DynamoDB", "Vercel", "Figma", "Playwright", "CrewAI",
];

export const experience = [
  {
    id: 1,
    company: "Vigo Retail",
    role: "Software Engineer",
    period: "Dec 2025 – Present",
    location: "Chennai, Tamil Nadu",
    current: true,
    bullets: [
      "Building a warehouse-based eCommerce platform for 500+ MSMEs with React.js, TypeScript, and Material UI.",
      "Developing real-time inventory, order management, and logistics tracking modules.",
      "Integrating REST APIs with Redux state management for seamless cross-module data flow.",
      "Implementing responsive UI components with a strong focus on performance and accessibility.",
      "Collaborating in an agile team to ship features on bi-weekly release cycles.",
    ],
  },
  {
    id: 2,
    company: "Sense7ai",
    role: "Software Engineer",
    period: "Sep 2023 – Nov 2025",
    location: "Coimbatore, Tamil Nadu",
    current: false,
    bullets: [
      "Built Verixa Copilot — a Generative AI pharma compliance assistant using FastAPI, OpenAI GPT-4, and Mistral with RAG pipelines.",
      "Engineered Zita ATS, an AI recruitment platform used by 200+ enterprise recruiters with OpenAI-powered candidate matching.",
      "Developed a standalone API portal on AWS Lambda + API Gateway serving 1000+ daily API requests.",
      "Led frontend architecture decisions across 3 products using React.js, TypeScript, and Chart.js.",
      "Reduced AI response latency by 40% through prompt caching and streaming response optimisations.",
    ],
  },
  {
    id: 3,
    company: "Sense7ai",
    role: "Frontend Developer Intern",
    period: "Apr 2023 – Aug 2023",
    location: "Coimbatore, Tamil Nadu",
    current: false,
    bullets: [
      "Developed reusable React component library consumed across 2 product lines.",
      "Converted Figma mockups to pixel-perfect TypeScript components with Tailwind CSS.",
      "Integrated REST API endpoints and handled complex form validation with React Hook Form.",
      "Participated in code reviews and adopted team coding standards for scalable frontend architecture.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Retail eCommerce Platform",
    company: "Vigo Retail",
    personal: false,
    stack: ["React.js", "TypeScript", "Material UI", "Redux", "REST APIs"],
    description:
      "Warehouse-based ordering system built for 500+ MSMEs — real-time inventory tracking, order lifecycle management, and logistics dashboards.",
    github: "https://github.com/siva9346",
    live: "",
  },
  {
    id: 2,
    title: "Verixa Copilot",
    company: "Sense7ai",
    personal: false,
    stack: ["React.js", "FastAPI", "OpenAI", "Mistral", "Chart.js"],
    description:
      "Generative AI assistant for pharma compliance teams — RAG-powered document Q&A, regulation gap analysis, and auto-generated compliance reports.",
    github: "",
    live: "",
  },
  {
    id: 3,
    title: "Zita ATS Platform",
    company: "Sense7ai",
    personal: false,
    stack: ["React.js", "TypeScript", "OpenAI API", "Django"],
    description:
      "AI-powered applicant tracking system used by 200+ enterprise recruiters — intelligent candidate scoring, JD parsing, and interview scheduling.",
    github: "",
    live: "",
  },
  {
    id: 4,
    title: "Standalone API Portal",
    company: "Sense7ai",
    personal: false,
    stack: ["React.js", "AWS Lambda", "API Gateway", "JWT", "Python"],
    description:
      "Serverless API management portal handling 1000+ daily requests — JWT authentication, rate limiting, API key management, and usage analytics.",
    github: "",
    live: "",
  },
  {
    id: 5,
    title: "Figma–MCP–Playwright AI Pipeline",
    company: "Personal Project",
    personal: true,
    stack: ["Playwright", "CrewAI", "Python", "Figma MCP"],
    description:
      "Generative AI testing pipeline that reads Figma designs via MCP and auto-generates Playwright test scripts — eliminating manual test writing.",
    github: "https://github.com/siva9346",
    live: "",
  },
];

export const education = {
  degree: "B.E. Mechanical Engineering",
  college: "Kongu Engineering College, Perundurai",
  period: "2019 – 2023",
  aggregate: "84.6%",
  highlights: [
    "Strong mathematics and analytical problem-solving foundation",
    "Final year project: IoT-based predictive maintenance system",
    "Transitioned to software engineering through self-directed learning in React & Python",
  ],
};

export type Experience = (typeof experience)[number];
export type Project = (typeof projects)[number];
