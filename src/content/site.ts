export type NavItem = {
  id: string;
  label: string;
};

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Job = {
  id: string;
  company: string;
  role: string;
  url?: string;
  range: string;
  location: string;
  summary: string;
  projects: {
    name: string;
    stack: string[];
    points: string[];
  }[];
};

export type ProjectCategory =
  | "featured"
  | "ai"
  | "saas"
  | "edtech"
  | "corporate";

export type Project = {
  title: string;
  tag: string;
  description: string;
  features: string[];
  stack: string[];
  categories: ProjectCategory[];
  url?: string;
  image?: string;
  imageAlt?: string;
  monogram?: string;
  note?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Ali Adel",
  initials: "AA",
  title: "Frontend Engineer",
  tagline: "I develop things for the web.",
  intro:
    "I am a frontend engineer specializing in React, Next.js, and Vue, focused on building scalable, accessible interfaces — with full-stack range across Python and Django.",
  currentCompany: "CyberDefenders",
  currentCompanyUrl: "https://cyberdefenders.org/",
  location: "Cairo, Egypt",
  email: "aliadelali671@gmail.com",
  phone: "01144170158",
  github: "https://github.com/AlyAdelAly",
  linkedin: "https://linkedin.com/in/aly-adel",
} as const;

export const nav: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const socials: Social[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Phone", href: `tel:${profile.phone}`, icon: "phone" },
];

export const heroPhrases: string[] = [
  "shipping production UI, one component at a time",
  "turning Figma files into accessible React",
  "React · Next.js · Vue · TypeScript · Django",
  "open to frontend & full-stack roles",
];

export const about = {
  body: [
    "I'm a frontend engineer based in Cairo, Egypt, with hands-on experience across **React**, **Next.js**, **Vue**, and **Tailwind CSS**, plus growing full-stack work in **Python** and **Django**.",
    "My focus is building scalable, responsive, and performant web applications — with clean code practices, strong collaboration habits, and a solid foundation in data structures and algorithms.",
    "'ve worked on a cybersecurity training platform where I build features end to end, from multi-step wizards and analytics dashboards to interactive lab infrastructure.",
  ],
  stats: [
    { value: 3, suffix: "+", label: "Years building" },
    { value: 8, label: "Shipped projects" },
    { value: 4, label: "Companies" },
    { value: 3, label: "Core frameworks" },
  ] satisfies Stat[],
};

export const jobs: Job[] = [
  {
    id: "cyberdefenders",
    company: "CyberDefenders",
    role: "Full Stack Engineer",
    url: "https://cyberdefenders.org/",
    range: "Sep 2025 — Aug 2026",
    location: "Delaware, United States · Remote",
    summary:
      "Built and maintained full-stack features across a Next.js 16 / React 19 frontend and a Python/Django backend, with a custom design system and shadcn/ui, connected via RESTful APIs.",
    projects: [
      {
        name: "Cybersecurity Training Platform",
        stack: [
          "Next.js",
          "React",
          "Vue",
          "TypeScript",
          "Tailwind CSS",
          "Python",
          "Django",
          "TanStack Query",
          "Zustand",
        ],
        points: [
          "Delivered **Team Learning Tracks** end-to-end — multi-step track creation wizard, lab builder, member assignment, and team-leader analytics dashboards with completion trends, domain progress, and KPI cards.",
          "Built the **interactive labs experience** — multi-infrastructure credential and desktop switching, Guacamole session handling, and lab launch/terminate flows.",
          "Shipped **certification and enrollment flows** — SSR data fetching with rate-limit handling and course-extension purchase logic.",
          "Improved SEO and performance via Open Graph metadata, canonical tags, and Next.js image optimization; hardened CSV exports against formula injection.",
        ],
      },
    ],
  },
  {
    id: "algoriza",
    company: "Algoriza",
    role: "Frontend Developer",
    range: "Oct 2023 — Sep 2025",
    location: "Cairo, Egypt",
    summary:
      "Collaborated with backend developers to integrate RESTful APIs into scalable web apps, wrote maintainable React code, and built reusable components with Tailwind CSS and shadcn/ui.",
    projects: [
      {
        name: "Seeds — Educational Platform",
        stack: ["React", "Node.js", "Tailwind CSS", "Context API"],
        points: [
          "Platform for children aged 7–16 to learn coding through interactive sessions and quizzes.",
          "Built admin, parent, and student panels — the admin panel handled session scheduling, quiz creation, and performance tracking.",
        ],
      },
      {
        name: "Monshaat Portal",
        stack: ["Next.js", "Tailwind CSS", "shadcn/ui", "Jotai", "Odoo"],
        points: [
          "Employee portal for submitting and tracking requests like leave or remote work.",
          "Included performance reviews, internal communication, and company announcements.",
        ],
      },
      {
        name: "MAIA — Medical Consultation Platform",
        stack: ["React", "NestJS", "MongoDB", "Tailwind CSS", "Firebase"],
        points: [
          "Two-sided platform with AI-based medical chat and secure authentication.",
          "Integrated Stripe for payments and Firebase for real-time updates.",
        ],
      },
    ],
  },
  {
    id: "white-account",
    company: "White Account",
    role: "Frontend Developer · Part-Time",
    range: "Nov 2024 — Mar 2025",
    location: "Remote",
    summary:
      "Contributed to an enterprise-focused ERP solution for the Saudi market using Vue 3 — resolved frontend bugs, optimized UI responsiveness, and integrated components with RESTful APIs and backend services.",
    projects: [
      {
        name: "SaptecSystems — Internal Employee Portal",
        stack: ["Vue 3", "Tailwind CSS", "Pinia", "REST API", ".NET"],
        points: [
          "Designed a responsive UI with reusable Vue components.",
          "Integrated the frontend with backend services for real-time data.",
        ],
      },
    ],
  },
  {
    id: "branspect",
    company: "Branspect",
    role: "Frontend Developer",
    range: "Jan 2023 — Oct 2023",
    location: "Cairo, Egypt",
    summary:
      "Developed responsive web interfaces using React and Tailwind CSS; participated in requirement analysis and component architecture planning.",
    projects: [],
  },
];

export const projects: Project[] = [
  {
    title: "CAIA",
    tag: "AI · Healthcare",
    description:
      "An advanced AI assistant built to modernize medical coding — automating repetitive work, improving accuracy, and enforcing compliance so healthcare teams can stay focused on patient care.",
    features: [
      "AI Chatbot",
      "CMS 1500",
      "Form Generation",
      "Stripe Integration",
    ],
    stack: ["React", "Tailwind CSS", "Nest.js", "MongoDB"],
    categories: ["featured", "ai"],
    url: "https://www.expertocaia.com/",
    image: "/projects/caia.webp",
    imageAlt:
      "CAIA landing page — the smartest AI assistant for medical coders",
  },
  {
    title: "Salama AI",
    tag: "AI · Healthcare",
    description:
      "An AI-powered platform pairing a marketing landing page with a Pro chat application, where users upload files and interact with AI grounded in that content through a quota-based system.",
    features: [
      "AI Chat Integration",
      "File Upload & Processing",
      "Quota Management",
      "Content-based Q&A",
    ],
    stack: ["React", "NestJS", "Tailwind CSS", "MongoDB"],
    categories: ["featured", "ai"],
    url: "https://pro.salama.ai/",
    image: "/projects/salama.webp",
    imageAlt: "Salama AI Solutions landing page",
  },
  {
    title: "MAIA for Medical Consultations",
    tag: "AI · Healthcare",
    description:
      "A two-app platform pairing an admin dashboard with a user-facing app built around medical AI chat. Users manage profiles, subscriptions, and payments via Stripe, while admins oversee user data, support tickets, and notifications.",
    features: [
      "Medical AI Chat",
      "Subscription Management",
      "Admin Dashboard",
      "Real-time Updates",
    ],
    stack: ["React", "NestJS", "Stripe", "Mongoose", "Firebase"],
    categories: ["featured", "ai"],
    url: "https://expertomaia.ai/",
    image: "/projects/maia.webp",
    imageAlt:
      "MAIA landing page — precise medical answers, anytime, anywhere",
  },
  {
    title: "Cybersecurity Training Platform",
    tag: "CyberDefenders",
    description:
      "Team Learning Tracks with a multi-step creation wizard, lab builder, and team-leader analytics. Built the interactive labs experience with multi-infrastructure desktop switching and Guacamole session handling.",
    features: [
      "Team Learning Tracks",
      "Interactive Labs",
      "Analytics Dashboards",
      "Certification Flows",
    ],
    stack: ["Next.js", "React", "Vue", "TypeScript", "Django", "Zustand"],
    categories: ["featured", "saas", "edtech"],
    url: "https://cyberdefenders.org/",
    image: "/projects/cyberdefenders.png",
    imageAlt: "CyberDefenders homepage — build a world-class SOC team",
  },
  {
    title: "Seeds — Educational Platform",
    tag: "Algoriza",
    description:
      "Coding-education platform for children aged 7–16, teaching through interactive sessions and quizzes across separate admin, parent, and student experiences.",
    features: [
      "Admin Panel",
      "Parent & Student Portals",
      "Session Scheduling",
      "Quiz Builder",
    ],
    stack: ["React", "Node.js", "Tailwind CSS", "Context API"],
    categories: ["edtech"],
    monogram: "SD",
    note: "Client project",
  },
  {
    title: "Monshaat Portal",
    tag: "Algoriza",
    description:
      "Internal employee portal for submitting and tracking requests such as leave or remote work, with performance reviews, internal communication, and company announcements.",
    features: [
      "Request Workflows",
      "Performance Reviews",
      "Announcements",
      "Odoo Integration",
    ],
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui", "Jotai", "Odoo"],
    categories: ["saas", "corporate"],
    monogram: "MP",
    note: "Internal portal",
  },
  {
    title: "SaptecSystems — Employee Portal",
    tag: "White Account",
    description:
      "Internal portal within a larger enterprise ERP solution for the Saudi market. Designed a responsive UI with reusable Vue components, integrated with backend services for real-time data.",
    features: [
      "Reusable Components",
      "Responsive UI",
      "REST Integration",
      "Real-time Data",
    ],
    stack: ["Vue 3", "Tailwind CSS", "Pinia", "REST API", ".NET"],
    categories: ["saas", "corporate"],
    monogram: "SS",
    note: "Internal portal",
  },
  {
    title: "Col-Lab",
    tag: "Graduation · 2021",
    description:
      "An online development environment built for real-time communication and collaboration between developers. Graduation project at Ain Shams University, graded Excellent.",
    features: [
      "Real-time Collaboration",
      "Shared Workspaces",
      "In-browser Development",
      "Team Communication",
    ],
    stack: ["Ain Shams University", "2021"],
    categories: ["saas"],
    monogram: "CL",
    note: "Academic project",
  },
];

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "ai", label: "AI & Chatbots" },
  { id: "saas", label: "SaaS & Dashboards" },
  { id: "edtech", label: "EdTech" },
  { id: "corporate", label: "Corporate" },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"] },
  {
    label: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
    ],
  },
  { label: "Backend", items: ["Python", "Django", "Node.js", "NestJS"] },
  {
    label: "State Management",
    items: ["Redux", "Context API", "Jotai", "Pinia", "Zustand"],
  },
  {
    label: "Programming Concepts",
    items: ["OOP", "Data Structures", "Algorithms"],
  },
  {
    label: "Tools & Services",
    items: [
      "Git",
      "GitHub",
      "REST APIs",
      "TanStack Query",
      "Firebase",
      "Stripe",
    ],
  },
];

export const education = {
  degree: "Bachelor's Degree in Software Engineering",
  school: "Ain Shams University",
  range: "2017 — 2021",
  gpa: "GPA 3.0",
  project:
    "Graduation Project: **Col-Lab** — an online development environment with real-time communication and collaboration. Grade: Excellent.",
  military: "Military status: completed, Oct 2021 — Dec 2022.",
};
