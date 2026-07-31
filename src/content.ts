/**
 * Source of truth for the dynamic site content (about, projects, experience,
 * education, certifications, link lists). Static shell copy - hero headline,
 * tagline, contact blurb, meta tags - lives in index.html.
 *
 * Copy convention: no em dashes in prose; use spaced hyphens ( - ). Date
 * ranges use en dashes, matching the resume.
 *
 * Disclosure rules are binding. Qanooni work is confidential and described in
 * the abstract only, with no repository names and no unapproved metrics.
 * CaseSimpli, the school platform, tailor, and workspace-infra are private
 * sources: architecture and scale may be described, repository names may not.
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

export type OpenToWork = {
  /** Master switch. */
  enabled: boolean;
  /** Optional ISO date (YYYY-MM-DD); past it the chip auto-hides even if enabled. */
  until?: string;
  /** Inviting micro-copy shown next to the pulse while collapsed. */
  teaser: string;
  /** Headline inside the expanded panel. */
  label: string;
  /** Availability line, e.g. "Available immediately · remote or Dubai". */
  availability: string;
  /** Roles the visitor should know you're open to. */
  roles: string[];
  /** One-line pitch revealed on expand. */
  pitch: string;
  /** Call-to-action shown in the expanded panel. */
  cta: SiteLink;
};

export const openToWork: OpenToWork = {
  enabled: true,
  until: "2026-09-30",
  teaser: "status: open · expand",
  label: "Open to work",
  availability: "Available now · remote-first (Dubai / UK friendly)",
  roles: [
    "AI / ML Engineer",
    "LLM & Agent Engineer",
    "Backend / Distributed Systems",
    "Applied ML",
  ],
  pitch: "Event-driven backends, tool-using agents, and models trained from scratch.",
  cta: { label: "Get in touch", href: `mailto:${site.email}`, primary: true },
};

export const contactLinks: SiteLink[] = [
  { label: site.email, href: `mailto:${site.email}`, primary: true },
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
];

/** Method → demonstrated range → human line. No titles, no labels. */
export const about: string[] = [
  "I build systems that hold up under load and tell you when they don't - event-driven backends, tool-using agents, and models trained from scratch. Seven shipped in the last six months, most of them deployed, all of them tested.",
  "The same loop runs through all of it: model the system, measure it honestly, ship it, leave the internals visible. Tideo names its failure modes in its test suite - dead-letter queues, deduplication, backpressure, retry-after. Capit shows you where it looked and which beam candidates it rejected. The production agents came with their evaluation frameworks attached.",
  "Twenty months of that has been paid AI engineering in legal technology - a domain where every citation is checkable and a hallucination is a liability. That constraint is the transferable part: it applies anywhere correctness is auditable, which is most of fintech, healthcare, and compliance. The First Class law degree sits behind the domain depth rather than in front of the engineering.",
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
    title: "tideo - distributed video transcoding pipeline",
    featured: true,
    problem:
      "Turning one upload into an adaptive-quality stream is easy to demo and hard to make survive failure. Workers die mid-encode, the same file arrives twice, and a naive retry storm takes down the thing it was meant to protect.",
    approach:
      "Two brokers, split on purpose. Kafka carries facts - append-only, partitioned by job_id, replayed safely by independent consumer groups. RabbitMQ carries commands - acked, deleted, competing consumers. A single dispatcher is the only bridge between them, guarding duplicates with an idempotent SET NX. Redis holds hot state and streams progress over pub/sub; PostgreSQL is the cold store and event audit log.",
    detail:
      "The split is load-bearing: stop RabbitMQ and the API still accepts jobs, and replaying the audit log never re-runs a transcode. 48 test modules name the failure modes directly - dead-letter queues, deduplication, backpressure, retry-after, rate limiting, event envelopes - alongside a classified FFmpeg-stderr corpus and chaos drills. Renditions encode in parallel on Celery workers and fan back into one HLS package with poster frames, a scrubbable storyboard, and optional faster-whisper captions. The live backend runs on an ephemeral HF Space, so shared output links are temporary by design.",
    stack: [
      "Python",
      "FastAPI",
      "Kafka (KRaft)",
      "RabbitMQ",
      "Celery",
      "Redis",
      "PostgreSQL",
      "FFmpeg",
      "Docker",
    ],
    links: [
      { label: "Live demo", href: "https://tideo.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/tideo" },
    ],
  },
  {
    title: "aristotle - source-aware research assistant",
    featured: true,
    problem:
      "An assistant that answers from the open web is only useful if you can see where each claim came from, and only safe if the code it runs can't reach anything that matters.",
    approach:
      "Four independently deployable services - agent API, model gateway, search, and an isolated Python sandbox - behind a client that streams reasoning, tool activity, sources, and answer text over WebSockets. A tool-using Pydantic AI agent routes between web search, uploaded-document tools, and sandboxed execution, with a hosted primary model and a llama.cpp-compatible fallback.",
    detail:
      "Each service carries its own Dockerfile and README, deployed by three separate GitHub Actions workflows. 16 test modules cover cancellation mid-run, sandbox client behavior, workspace capabilities, research evals, and a deploy contract. Reads text, Markdown, JSON, CSV, HTML, PDF, and DOCX; runs Python and returns downloadable charts. Under active development - current defaults favor experimentation over hardened access control.",
    stack: [
      "Python",
      "FastAPI",
      "Pydantic AI",
      "PostgreSQL",
      "SearXNG",
      "WebSockets",
      "React",
      "Docker",
    ],
    links: [
      { label: "Live demo", href: "https://aristotle-five.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/aristotle" },
    ],
  },
  {
    title: "capit - a glass-box image captioner",
    problem:
      "Most captioners hand you a sentence and nothing else. If a model can't show its work, you can't trust - or learn from - it.",
    approach:
      "A Show, Attend and Tell reimplementation - frozen ResNet-50 encoder, Bahdanau attention + LSTM decoder trained from scratch on Flickr8k - whose UI exposes every internal: word-by-word attention heatmaps and the beam-search candidates it rejected, with BLIP running beside it as a deliberate closed-box foil.",
    detail:
      "BLEU-4 23.63 / CIDEr 62.80 (beam 5, Karpathy test split). Attention is genuinely concentrated: the top 5 of 196 cells hold ~32% of the mass. 21 test modules over the training pipeline, including a single-batch overfit gate that fails the build if the model can't memorize one batch. Trained on a single Colab T4; served from a self-contained model artifact on an HF Space.",
    stack: ["PyTorch", "ResNet-50", "Bahdanau attention", "beam search", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://capit-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/capit" },
      { label: "Model (HF)", href: "https://huggingface.co/Bukunmi2108/capit-sat" },
    ],
  },
  {
    title: "givemore - a MovieLens recommender",
    problem:
      "Recommender demos usually hide a heavyweight serving stack - or quietly call someone else's API.",
    approach:
      "Item-item collaborative filtering (adjusted cosine, IUF-weighted, ≥5 co-rating threshold) blended with TF-IDF content similarity and a Bayesian-weighted popularity fallback - all precomputed offline, so the API never trains anything.",
    detail:
      "The whole model ships as a 9 MB SQLite artifact behind a read-only FastAPI with zero ML dependencies; the frontend is framework-free Vite + TypeScript. A small service by design, with a correspondingly small test suite, and honest in the UI about what it can't do.",
    stack: ["Python", "pandas", "scikit-learn", "SQLite", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://givemore-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/givemore" },
    ],
  },
  {
    title: "School management platform",
    privateWork: true,
    problem:
      "A school running on disconnected third-party tools for examinations, learning materials, fees, and admissions - none of which talked to each other, and none of which it owned.",
    approach:
      "One platform covering digital examinations, e-learning, a digital library, messaging, payments, admissions, and role-gated administration, with web and mobile clients over a Python API.",
    detail:
      "Around 900 files across TypeScript and Python, with separate CI for the API and web app. JWT authentication and role-based access control spanning student, parent, teacher, and administrator roles; 1,400+ books and 3,000+ videos served at 99.9% uptime. First built alongside my ICT role at the school, then rebuilt end to end across 2025-2026. Live and in daily use; source is private.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / RBAC"],
    links: [
      { label: "gloryschools.com", href: "https://gloryschools.com" },
      { label: "Portal", href: "https://portal.gloryschools.com" },
    ],
  },
  {
    title: "tailor - evidence-linked resume composition",
    privateWork: true,
    problem:
      "Resume tools generate plausible text. The failure that actually matters is a claim no evidence supports - and a generator with no notion of evidence can't tell the difference.",
    approach:
      "A human-in-the-loop workspace that judges whether a job description is worth pursuing, searches maintained resume, career, GitHub, and portfolio evidence, then proposes typed, validated edits for approval. Every proposed change traces to the evidence record that licenses it, and private sources carry explicit disclosure policy enforced at runtime.",
    detail:
      "A YAML-defined Pydantic AI agent behind a stateless FastAPI service, with validated resume snapshots, browser preview, and deterministic PDF export through WeasyPrint. Session state is deliberately disposable - closing the tab discards it. Runs as a container on a self-hosted VPS behind scale-to-zero. Source is private.",
    stack: ["Python", "FastAPI", "Pydantic AI", "WeasyPrint", "React", "Docker"],
    links: [],
  },
  {
    title: "workspace-infra - self-hosted deployment platform",
    privateWork: true,
    problem:
      "Running several side projects on managed platforms costs more than the projects are worth, and every new app otherwise reinvents its own deploy, TLS, and backups.",
    approach:
      "A shared VPS gateway that applications opt into rather than rebuild: Caddy terminating HTTPS, Sablier stopping idle containers and starting them again on the next request, a Docker socket proxy, shared PostgreSQL, and a documented deployment contract each app implements.",
    detail:
      "Deliberately small - 23 files of shell, Makefiles, and Compose, plus documentation for onboarding an app, health contracts, server bootstrap, and backup and restore including offsite copies. Tailor deploys onto it and never touches the shared platform itself. Source is private.",
    stack: ["Docker", "Caddy", "Sablier", "PostgreSQL", "Shell", "Make"],
    links: [],
  },
  {
    title: "LLM citation-hallucination benchmark",
    problem:
      "Language models fabricate and misattribute citations when answering without tools. Anywhere a citation is checkable, that's a liability rather than a quirk.",
    approach:
      "An async LLM-as-judge evaluation pipeline scoring citation accuracy across 328 English and Arabic prompts and 6 frontier models, with a four-category rubric: correct, correct refusal, misattribution, fabrication.",
    detail:
      "Pluggable provider architecture (OpenAI / Azure / Anthropic / Google), Pydantic schemas, and resumable checkpointing across both the response-collection and judging phases. Modeled on Stanford RegLab's legal_hallucinations. A research pipeline rather than a service: around 30 files, and no test suite of its own.",
    stack: ["Python", "asyncio", "Pydantic", "OpenAI / Azure", "pandas"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Bukunmi2108/legal_hallucination_dataset_evaluation",
      },
    ],
  },
  {
    title: "ML from first principles",
    problem: "Understand autograd and language models by building them, not importing them.",
    approach:
      "Reimplemented micrograd's reverse-mode autograd (Value graph, topological backprop, MLP) and the makemore series from scratch, through tokenization and transformer language models.",
    detail:
      "Gradients validated against PyTorch; bigram language model trained on 32,032 names. Maintained continuously since February 2026 alongside the MSc financial-econometrics work.",
    stack: ["Python", "PyTorch (validation)", "NumPy"],
    links: [{ label: "GitHub", href: "https://github.com/Bukunmi2108/ml-journey" }],
  },
  {
    title: "Econometrics: cointegration & ECM/VECM",
    problem:
      "Do dual-listed Shell shares on the LSE and Euronext hold a long-run equilibrium, and how fast are deviations arbitraged away?",
    approach:
      "Engle-Granger and Johansen cointegration tests over 1,511 trading days, then a VECM to estimate the adjustment dynamics.",
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
    role: "AI Engineer",
    location: "Dubai-based · Remote",
    start: "Oct 2025",
    end: "Jun 2026",
    bullets: [
      "Built and shipped production LLM systems - agents, document pipelines, and evaluation harnesses - in a regulated, correctness-critical domain.",
      "Built QCounsel, a multi-tool Pydantic AI agent running inside Microsoft Word for research, drafting, and litigation workflows; designed its evaluation framework, tool-routing classifier, and clarify-vs-act logic.",
      "Shipped multilingual evaluation infrastructure: English and Arabic evaluation splits, jurisdiction-aware LLM-as-judge prompts, pipeline evaluations, and prompt optimization.",
      "Integrated DocETL pipeline orchestration for document processing at scale (Split → ParallelMap → CodeMap → Reduce).",
      "Production AI ops: triaged bugs from Langfuse trace IDs; span-level latency debugging; PostHog vs database telemetry reconciliation for apply-rate analysis.",
    ],
    stack:
      "Python, FastAPI, Pydantic AI, DocETL, Langfuse, Anthropic & OpenAI API, pytest, Ruff, Pyright",
  },
  {
    company: "CaseSimpli Legal Tech Solutions",
    role: "Lead Software Engineer",
    location: "Remote",
    start: "Nov 2024",
    end: "Oct 2025",
    bullets: [
      "Led engineering on an AI-assisted document automation platform as sole engineer.",
      "Built the document automation system end to end, cutting contract drafting time by 30% while preserving human-in-the-loop review.",
      "Built retrieval-augmented generation pipelines over statutory and precedent corpora, with citation grounding and controlled, schema-constrained outputs.",
      "Developed a domain-specific conversational assistant; improved case-analysis efficiency by 25%.",
      "Worked directly with domain experts to align system behavior with substantive correctness requirements.",
    ],
    stack: "Python (FastAPI), Next.js, PostgreSQL, OpenAI Assistants, Azure",
  },
  {
    company: "Data Quotient Hub",
    role: "Frontend Web Engineer (Part-Time)",
    start: "Apr 2025",
    end: "Oct 2025",
    bullets: [
      "Part-time frontend engineering alongside full-time backend and AI work.",
      "Shipped responsive enterprise UIs in Next.js + TypeScript for a data-management product; integrated backend APIs and improved client-side performance.",
    ],
  },
  {
    company: "Glory Schools, Egbedi",
    role: "ICT Manager & Instructor",
    start: "2022",
    end: "2024",
    bullets: [
      "Ran the school's ICT function and taught practical programming.",
      "Built and operated the first digital examination and e-learning platforms, with JWT authentication and role-based access control.",
      "Later rebuilt the platform end to end as a full management system - see Selected work above.",
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
    school: "ESCAE Benin University, Cotonou",
    degree: "LLB Law, First Class Honours",
    period: "2018–2022",
    detail:
      "GPA 4.92/5.0 (top 1% of cohort). Best Graduating Student, Faculty of Law. Student Senate President (Leadership Award).",
  },
  {
    school: "WorldQuant University",
    degree: "MSc Financial Engineering",
    period: "2025–present",
    detail:
      "Financial econometrics: cointegration, ECM/VECM, LASSO, Diebold-Mariano testing.",
  },
  {
    school: "University of the People",
    degree: "BSc Computer Science",
    period: "2026–present",
    detail: "In progress.",
  },
];

export const certifications: string[] = [
  "Fundamentals of LLMs - DeepLearning.AI",
  "Advanced Learning Algorithms - Coursera ML Specialization",
  "Unsupervised Learning, Recommenders, Reinforcement Learning - Coursera ML Specialization",
  "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate - Sep 2025",
  "Applied Data Science Lab - WorldQuant University",
  "Foundations of Financial Engineering - WorldQuant University",
];
