/**
 * Source of truth for the dynamic site content (about, projects, experience,
 * education, certifications, link lists). Static shell copy — hero headline,
 * tagline, contact blurb, meta tags — lives in index.html.
 */

export const site = {
  email: "bkakinyemi21@gmail.com",
  resumePath: "/resume.pdf",
  social: {
    github: "https://github.com/Bukunmi2108",
    linkedin: "https://www.linkedin.com/in/bukunmiakinyemi/",
  },
} as const;

export type SiteLink = {
  label: string;
  href: string;
  /** Rendered as a filled button instead of a pill. */
  primary?: boolean;
};

export const heroLinks: SiteLink[] = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Resume", href: site.resumePath },
];

export const contactLinks: SiteLink[] = [
  { label: site.email, href: `mailto:${site.email}`, primary: true },
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
];

/** Method → demonstrated range → human line. No titles, no labels. */
export const about: string[] = [
  "Everything here runs the same loop: model the system, measure it honestly, ship it, leave the internals visible. The captioner shows where it looked. The recommender documents what it can't do. The production agents came with their evaluation frameworks.",
  "The range below is demonstrated rather than claimed — vision models trained from scratch, recommenders, LLM evaluation at benchmark scale, agents in production legal work, and a school platform that's been live for four years. Currently adding financial engineering to the toolkit (MSc, in progress).",
  "When not modeling: reading, pencil art, piano.",
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
    title: "capit — a glass-box image captioner",
    featured: true,
    problem:
      "Most captioners hand you a sentence and nothing else. If a model can't show its work, you can't trust — or learn from — it.",
    approach:
      "A Show, Attend and Tell reimplementation — frozen ResNet-50 encoder, Bahdanau attention + LSTM decoder trained from scratch on Flickr8k — whose UI exposes every internal: word-by-word attention heatmaps and the beam-search candidates it rejected, with BLIP running beside it as a deliberate closed-box foil.",
    detail:
      "BLEU-4 23.63 / CIDEr 62.8 (beam 5, Karpathy test split). Attention is genuinely concentrated: the top 5 of 196 cells hold ~32% of the mass. Trained on a single Colab T4; served from a self-contained model artifact on a HF Space.",
    stack: ["PyTorch", "ResNet-50", "Bahdanau attention", "beam search", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://capit-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/capit" },
      { label: "Model (HF)", href: "https://huggingface.co/Bukunmi2108/capit-sat" },
    ],
  },
  {
    title: "givemore — a MovieLens recommender",
    featured: true,
    problem:
      "Recommender demos usually hide a heavyweight serving stack — or quietly call someone else's API.",
    approach:
      "Item-item collaborative filtering (adjusted cosine, IUF-weighted, ≥5 co-rating threshold) blended with TF-IDF content similarity and a Bayesian-weighted popularity fallback — all precomputed offline, so the API never trains anything.",
    detail:
      "The whole model ships as a 9 MB SQLite artifact behind a read-only FastAPI with zero ML dependencies; the frontend is framework-free Vite + TypeScript. Honest about its limits by design.",
    stack: ["Python", "pandas", "scikit-learn", "SQLite", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://givemore-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/givemore" },
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
    title: "Econometrics: Cointegration & ECM/VECM",
    problem:
      "Do dual-listed Shell shares on the LSE and Euronext hold a long-run equilibrium, and how fast are deviations arbitraged away?",
    approach:
      "Engle–Granger and Johansen cointegration tests over 1,511 trading days, then a VECM to estimate the adjustment dynamics.",
    detail:
      "Law of one price holds (β ≈ 0.92); deviations correct at ~3.7%/day (γ = −0.037) with an 18.5-day half-life. MScFE 610 coursework.",
    stack: ["Python", "statsmodels", "pandas", "NumPy"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Bukunmi2108/ml-journey/tree/main/notebooks/MSCFE0",
      },
    ],
  },
  {
    title: "Legal Citation Hallucination Benchmark",
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
    links: [
      { label: "gloryschools.com", href: "https://gloryschools.com" },
      { label: "Portal", href: "https://portal.gloryschools.com" },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  /** Use "Present" for the current role. */
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
    stack:
      "Python, FastAPI, Pydantic AI, DocETL, Langfuse, Claude API, pytest, Ruff, Pyright",
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
      "GPA 4.92/5.0 (top 1% of cohort). Best Graduating Student, Faculty of Law. Student Senate President (Leadership Award).",
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
