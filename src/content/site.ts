/**
 * Single source of truth for site content.
 * Transcribed from BUKUNMI_AKINYEMI_AI_ENG.docx (the resume).
 * Project cards are reconciled against the actual repos (see PR notes):
 *  - Hallucination benchmark: "6 GPT variants" / "328 EN/AR prompts" match the repo.
 *  - RAG-vs-LoRA (legalai): intentionally omitted until the comparison is complete.
 */

export const site = {
  name: "Bukunmi Akinyemi",
  fullName: "Bukunmi Enoch Akinyemi",
  role: "Applied AI Engineer",
  // Hero positioning line (no eval-metric framing, no heart emoji).
  tagline:
    "Applied AI Engineer · Production legal-AI · RAG · Agents · Pipelines · LLB + MSc Financial Engineering",
  location: "Osun State, Nigeria",
  email: "bkakinyemi21@gmail.com",
  resumePath: "/resume.pdf",
  social: {
    github: "https://github.com/Bukunmi2108",
    linkedin: "https://www.linkedin.com/in/bukunmiakinyemi/",
  },
} as const;

/** About — the resume Profile, verbatim. */
export const about: string[] = [
  "Applied AI engineer building production legal-AI systems. LLB (First Class) and MSc Financial Engineering candidate. I ship RAG pipelines, evaluation frameworks, and agent systems in regulated, high-stakes domains.",
  "At Qanooni, I work across the applied-AI stack on a legal-AI product — DocETL pipeline orchestration, retrieval reranking, Pydantic AI agents, prompt and evaluation work. Before that I led a small team at CaseSimpli on AI-assisted contract drafting (FastAPI + Next.js + OpenAI Assistants).",
];

export type ProjectLink = { label: string; href: string };

export type Project = {
  title: string;
  problem: string;
  approach: string;
  detail: string;
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
  /** Private / no public repo. */
  privateWork?: boolean;
};

export const projects: Project[] = [
  {
    title: "Legal Citation Hallucination Benchmark",
    featured: true,
    problem:
      "LLMs fabricate and misattribute legal citations when answering without tools — a real liability risk for legal AI.",
    approach:
      "An async LLM-as-judge evaluation pipeline that scores citation accuracy across 328 EN/AR legal prompts and 6 GPT model variants with a 4-category hallucination rubric (correct, correct refusal, misattribution, fabrication).",
    detail:
      "Pluggable provider architecture (OpenAI / Azure / Anthropic / Google), Pydantic schemas, and resumable checkpointing across both the response-collection and judging phases.",
    stack: ["Python", "asyncio", "Pydantic", "OpenAI / Azure", "pandas"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Bukunmi2108/legal_hallucination_dataset_evaluation",
      },
    ],
  },
  {
    title: "Glory Schools — school platform",
    problem:
      "A school needed its own examination, e-learning, and management system instead of stitching together third-party tools.",
    approach:
      "Designed and shipped a full-stack platform end to end: a public website plus an authenticated portal for digital examinations, e-learning, and school management with role-based access.",
    detail:
      "TypeScript across web and mobile with a Python backend; JWT auth + RBAC, 99.9% uptime, serving 1,400+ books and 3,000+ videos. Live and in active use.",
    stack: ["TypeScript", "React", "Python", "Docker", "JWT / RBAC"],
    // Repos are private (Glory-Schools-Egbedi org); link the live products instead.
    links: [
      { label: "gloryschools.com", href: "https://gloryschools.com" },
      { label: "Portal", href: "https://portal.gloryschools.com" },
    ],
  },
  {
    title: "Legal Document Assistant (lda)",
    problem:
      "Legal Q&A needs grounded retrieval and persistent context, not one-shot prompting.",
    approach:
      "A production-shaped RAG stack with clean service-layer separation across chunking, retrieval, and inference, plus persisted chat state.",
    detail: "FastAPI + Chroma + LangChain.",
    stack: ["Python", "FastAPI", "Chroma", "LangChain"],
    links: [{ label: "GitHub", href: "https://github.com/Bukunmi2108/lda" }],
  },
  {
    title: "Econometrics: Cointegration & ECM/VECM (MScFE 610)",
    problem:
      "Do dual-listed Shell shares on the LSE and Euronext hold a long-run equilibrium, and how fast are deviations arbitraged away?",
    approach:
      "Engle–Granger and Johansen cointegration tests over 1,511 trading days, then a VECM to estimate the adjustment dynamics.",
    detail:
      "Law of one price holds (β ≈ 0.92); deviations correct at ~3.7%/day (γ = −0.037) with an 18.5-day half-life.",
    stack: ["Python", "statsmodels", "pandas", "NumPy"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Bukunmi2108/ml-journey/tree/main/notebooks/MSCFE0",
      },
    ],
  },
  {
    title: "ML from first principles",
    problem:
      "Understand autograd and language models by building them, not importing them.",
    approach:
      "Reimplemented micrograd's reverse-mode autograd (Value graph, topological backprop, MLP) and a makemore character-level model from scratch.",
    detail:
      "Gradients validated against PyTorch; bigram language model trained on 32,032 names.",
    stack: ["Python", "PyTorch (validation)", "NumPy"],
    links: [
      { label: "GitHub", href: "https://github.com/Bukunmi2108/ml-journey" },
    ],
  },
  {
    title: "LegalTex",
    problem:
      "Legal drafting needs precise, validated document structure that general-purpose editors don't enforce.",
    approach:
      "A web-based LaTeX editor for legal documents — real-time pdflatex compilation with chktex linting, a Monaco editor, and project storage by client/matter.",
    detail:
      "React/TypeScript + Vite frontend (Monaco, PDF.js) over a FastAPI + SQLite backend, with PDF and .tex export.",
    stack: ["React", "TypeScript", "FastAPI", "SQLite", "pdflatex / chktex"],
    links: [{ label: "GitHub", href: "https://github.com/Bukunmi2108/LegalTex" }],
  },
  {
    title: "Qanooni — production legal-AI",
    privateWork: true,
    problem:
      "Legal review at scale demands reliable pipelines, grounded retrieval, and agents lawyers can trust.",
    approach:
      "Work across the applied-AI stack: DocETL pipeline operators (quote-validation, paraphrase-correction), retrieval reranking, and the QCounsel Pydantic AI agent (26 tools).",
    detail:
      "Multilingual (English + Arabic) evaluation and prompt optimization; production AI ops on Langfuse traces.",
    stack: ["Python", "FastAPI", "Pydantic AI", "DocETL", "Langfuse"],
    // Codebase is private (CodeVerdict/monorepo); link the public product instead.
    links: [{ label: "qanooni.ai", href: "https://qanooni.ai" }],
  },
];

export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  /** Use "Present" for the current role; the timeline highlights it automatically. */
  end: string;
  bullets: string[];
  stack?: string;
};

export const experience: Experience[] = [
  {
    company: "Qanooni AI",
    role: "Software Engineer (Legal AI)",
    location: "Dubai-based · Remote",
    start: "Oct 2025",
    end: "Present",
    bullets: [
      "Contributed to DocETL pipeline orchestration (Split → ParallelMap → CodeMap → Reduce), including quote-validation and paraphrase-correction operators.",
      "Multilingual legal-AI: English + Arabic evaluation splits, jurisdiction-aware judge prompts. Ran pipeline evaluations and prompt optimizations.",
      "Worked on QCounsel — a Pydantic AI agent with 26 tools; scoped the evaluation framework, tool-routing classifier, and clarify-vs-act improvements.",
      "Production AI ops: feedback-triaged bug fixes from Langfuse trace IDs; span-level latency debugging; PostHog vs DB telemetry reconciliation for apply-rate analysis.",
    ],
    stack: "Python, FastAPI, Pydantic AI, DocETL, Langfuse, Claude API, pytest, Ruff, Pyright",
  },
  {
    company: "CaseSimpli Legal Tech Solutions",
    role: "Lead Software Engineer",
    location: "Remote",
    start: "Nov 2024",
    end: "Oct 2025",
    bullets: [
      "Built an AI-assisted legal document automation system that reduced contract drafting time by 30% while preserving lawyer-in-the-loop oversight.",
      "Built RAG pipelines for statutory materials and precedents, emphasizing citation grounding and controlled outputs.",
      "Developed an AI-powered legal chatbot; improved case-analysis efficiency by 25%.",
      "Collaborated with legal professionals to align system behavior with substantive legal expectations.",
    ],
    stack: "Python (FastAPI), Next.js, PostgreSQL, OpenAI Assistants, Azure",
  },
  {
    company: "Data Quotient Hub",
    role: "Frontend Web Engineer (Part-Time)",
    start: "Apr 2025",
    end: "Oct 2025",
    bullets: [
      "Shipped responsive enterprise UIs in Next.js + TypeScript for a data-management product.",
      "Worked with backend teams to integrate APIs, ensure system reliability, and improve performance.",
    ],
  },
  {
    company: "Glory Schools, Egbedi",
    role: "ICT Manager & Instructor",
    start: "2022",
    end: "2024",
    bullets: [
      "Built and maintained digital examination and e-learning platforms (99.9% uptime); implemented JWT authentication and role-based access control.",
      "Ongoing side delivery on the school-management platform (Python + React + Docker; 1,400+ books, 3,000+ videos; 35+ PRs).",
      "Taught practical programming and ICT.",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    school: "WorldQuant University",
    degree: "MSc, Financial Engineering",
    period: "In progress (2025–)",
    detail:
      "Coursework: Financial Econometrics — cointegration, ECM/VECM, LASSO, Diebold–Mariano testing.",
  },
  {
    school: "ESCAE Benin University, Cotonou",
    degree: "LLB Law, First Class Honours",
    period: "Sep 2018 – Aug 2022",
    detail:
      "GPA 4.92/5.0 (top 1% of cohort). Best Graduating Student, Faculty of Law. Student Senate President (Leadership Award). Thesis: “Capital Punishment in Nigeria: An Examination of Human Rights Law and its Locus Standi in International Society.”",
  },
];

export type TechGroup = { label: string; items: string[] };

export const technical: TechGroup[] = [
  {
    label: "AI / LLM systems",
    items: [
      "RAG pipelines (hybrid search, reranking, citation grounding)",
      "LLM-as-judge evaluation",
      "Prompt engineering",
      "Pydantic AI agents",
      "Structured outputs",
      "Tool calling",
      "MCP-aware design",
      "Langfuse",
      "LangChain",
      "LlamaIndex",
      "DocETL",
      "FAISS",
      "Chroma",
      "Vector databases",
      "Claude API",
      "OpenAI API",
    ],
  },
  {
    label: "Languages",
    items: ["Python (FastAPI, SQLAlchemy, Pydantic, pytest, Ruff)", "TypeScript", "SQL"],
  },
  {
    label: "Infrastructure",
    items: ["PostgreSQL", "Docker", "AWS", "Azure", "GitHub Actions", "CI/CD", "OAuth 2.0", "JWT"],
  },
  {
    label: "Quantitative ML / Econometrics",
    items: [
      "PyTorch",
      "NumPy",
      "scikit-learn",
      "statsmodels",
      "Time-series analysis",
      "Cointegration",
      "Error correction models",
    ],
  },
];

export const certifications: string[] = [
  "Foundations of Financial Engineering — WorldQuant University",
  "Fundamentals of LLMs — DeepLearning.AI",
  "Advanced Learning Algorithms — Coursera ML Specialization",
  "Unsupervised Learning, Recommenders, Reinforcement Learning — Coursera ML Specialization",
  "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
  "Applied Data Science Lab — WorldQuant University",
  "Clio Certified Administrator (Legal Practice Management)",
  "Introduction to Cybersecurity — Cisco Networking Academy",
  "McKinsey Forward Program (Leadership & Strategy)",
];

export const languages: string[] = [
  "English (Full Professional Proficiency)",
  "Yoruba (Native)",
];
