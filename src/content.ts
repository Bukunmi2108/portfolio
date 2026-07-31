/**
 * Source of truth for the dynamic site content (about, projects, experience,
 * education, certifications, link lists). Static shell copy - hero headline,
 * tagline, contact blurb, meta tags - lives in index.html.
 *
 * Copy convention: no em dashes in prose; use spaced hyphens ( - ). Date
 * ranges use en dashes, matching the resume.
 *
 * Projects are two-layer. `summary` + `proof` are the skim surface rendered on
 * the card; `problem` / `approach` / `detail` are the argument, revealed in the
 * dialog at #work/<slug>. Keep the card layer factual and the dialog layer
 * prose, so a skimmer reads evidence and never has to read voice.
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
  availability: "Available now · remote-first",
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
  "I build systems that hold up under load and tell you when they don’t - event-driven backends, tool-using agents, and models trained from scratch. Seven shipped in the last six months, most deployed, all tested.",
  "The same loop runs through all of it: model the system, measure it honestly, ship it, leave the internals visible. Tideo names its failure modes in its test suite. Capit shows you where it looked and which beam candidates it rejected. The production agents came with their evaluation frameworks attached.",
  "Twenty months of that has been paid AI engineering in legal technology, a domain where every citation is checkable and a hallucination is a liability. That constraint is the transferable part: it applies anywhere correctness is auditable, which covers most of fintech, healthcare, and compliance. The First Class law degree sits behind the domain depth, not in front of the engineering.",
  "When not modeling: reading, pencil art, piano.",
];

export type ProjectLink = { label: string; href: string };

export type Project = {
  /** URL fragment id: the dialog opens at #work/<slug>. */
  slug: string;
  title: string;
  /** One line on the card: what this is. */
  summary: string;
  /** Scannable hard facts shown as chips on the card. */
  proof: string[];
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
    slug: "tideo",
    title: "tideo",
    featured: true,
    summary:
      "One upload becomes a full HLS ladder, encoded in parallel across a distributed pipeline.",
    proof: ["48 test modules", "Kafka · RabbitMQ · Redis · PostgreSQL", "Deployed"],
    problem:
      "A video upload has to become every resolution a viewer might need, encoded in parallel, without redoing work already done. Meanwhile workers die mid-encode and the same file gets uploaded twice.",
    approach:
      "Two brokers with separate jobs. Kafka carries facts: append-only, partitioned by job_id, replayable by independent consumer groups. RabbitMQ carries commands: acked, deleted, competing consumers. A single dispatcher bridges them and guards duplicates with an idempotent SET NX. Redis holds hot state and streams progress over pub/sub; PostgreSQL keeps terminal state and the event audit log.",
    detail:
      "The separation is load-bearing. Stop RabbitMQ and the API still accepts jobs; replay the audit log and nothing re-transcodes. The test suite names its failure modes directly: dead-letter queues, deduplication, backpressure, retry-after, rate limiting, event envelopes, plus a classified FFmpeg-stderr corpus and chaos drills. Output is a single HLS package with poster frames, a scrubbable storyboard, and optional faster-whisper captions. The live backend sits on an ephemeral HF Space, so shared output links expire.",
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
      { label: "API & docs", href: "https://bukunmi2108-tideo.hf.space/docs" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/tideo" },
    ],
  },
  {
    slug: "aristotle",
    title: "aristotle",
    featured: true,
    summary: "A research assistant that cites its sources and runs generated code in a sandbox.",
    proof: ["4 deployable services", "16 test modules", "3 deploy pipelines"],
    problem:
      "Two requirements pull against each other: an assistant should answer from live sources you can check, and it should be able to execute code without that code reaching anything important.",
    approach:
      "Four services deploy independently: agent API, model gateway, search, and an isolated Python sandbox. A tool-using Pydantic AI agent routes between web search, uploaded-document tools, and sandboxed execution, streaming reasoning, tool activity, sources, and answer text over WebSockets. A hosted primary model falls back to a llama.cpp-compatible service.",
    detail:
      "Each service carries its own Dockerfile, README, and GitHub Actions workflow. Tests cover cancellation mid-run, sandbox client behavior, workspace capabilities, research evals, and a deploy contract. Reads text, Markdown, JSON, CSV, HTML, PDF, and DOCX; runs Python and returns downloadable charts. Still in active development, with defaults tuned for experimentation over hardened access control.",
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
    slug: "capit",
    title: "capit",
    summary: "Show, Attend and Tell trained from scratch, with the attention made visible.",
    proof: ["BLEU-4 23.63 / CIDEr 62.80", "21 test modules", "Trained on one T4"],
    problem:
      "Most captioners hand you a sentence and nothing else. If a model can’t show its work, you can’t trust it or learn from it.",
    approach:
      "A frozen ResNet-50 encoder, Bahdanau attention, and an LSTM decoder trained on Flickr8k. The interface exposes word-by-word attention heatmaps and the beam candidates the decoder rejected, with BLIP running alongside as a closed-box contrast.",
    detail:
      "BLEU-4 23.63 / CIDEr 62.80 at beam 5 on the Karpathy split. Attention concentrates: the top 5 of 196 cells carry about 32% of the mass. The suite includes a single-batch overfit gate that fails the build when the model cannot memorize one batch. Trained on a single Colab T4 and served from a self-contained artifact on an HF Space.",
    stack: ["PyTorch", "ResNet-50", "Bahdanau attention", "beam search", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://capit-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/capit" },
      { label: "Model (HF)", href: "https://huggingface.co/Bukunmi2108/capit-sat" },
    ],
  },
  {
    slug: "givemore",
    title: "givemore",
    summary: "A MovieLens recommender whose entire model ships as a 9 MB SQLite file.",
    proof: ["9 MB model artifact", "Zero ML deps at serve time", "Deployed"],
    problem:
      "Recommender demos usually hide a heavyweight serving stack, or quietly call someone else’s API.",
    approach:
      "Item-item collaborative filtering (adjusted cosine, IUF-weighted, ≥5 co-rating threshold) blended with TF-IDF content similarity and a Bayesian-weighted popularity fallback. Everything is precomputed offline, so the API never trains anything.",
    detail:
      "The model ships as a 9 MB SQLite artifact behind a read-only FastAPI with no ML dependencies; the frontend is framework-free Vite and TypeScript. A small service with a correspondingly small test suite, and a UI that states plainly what it cannot do.",
    stack: ["Python", "pandas", "scikit-learn", "SQLite", "FastAPI", "Vite + TS"],
    links: [
      { label: "Live demo", href: "https://givemore-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/Bukunmi2108/givemore" },
    ],
  },
  {
    slug: "school-platform",
    title: "School management platform",
    privateWork: true,
    summary:
      "Examinations, e-learning, library, payments, and admissions for a school that owns its stack.",
    proof: ["~900 files", "99.9% uptime", "Web + mobile clients"],
    problem:
      "A school was running examinations, learning materials, fees, and admissions across four systems that did not talk to each other, none of which it owned.",
    approach:
      "One platform covering digital examinations, e-learning, a digital library, messaging, payments, admissions, and role-gated administration, with web and mobile clients over a Python API.",
    detail:
      "Around 900 files of TypeScript and Python, with separate CI for the API and the web app. JWT authentication and role-based access control spanning student, parent, teacher, and administrator roles; 1,400+ books and 3,000+ videos served at 99.9% uptime. First built alongside my ICT role at the school, then rebuilt end to end across 2025-2026. Live and in daily use; source is private.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "JWT / RBAC"],
    links: [
      { label: "gloryschools.com", href: "https://gloryschools.com" },
      { label: "Portal", href: "https://portal.gloryschools.com" },
    ],
  },
  {
    slug: "tailor",
    title: "tailor",
    privateWork: true,
    summary: "A resume composer that refuses to make a claim no evidence supports.",
    proof: ["Typed, validated edits", "Deterministic PDF export", "Self-hosted"],
    problem:
      "Resume tools generate plausible text. The failure that matters is a claim with nothing behind it, and a generator with no model of evidence cannot tell the difference.",
    approach:
      "A human-in-the-loop workspace that judges whether a job description is worth pursuing, searches maintained resume, career, GitHub, and portfolio evidence, then proposes typed edits for approval. Each proposed change traces to the evidence record that licenses it, and private sources carry disclosure policy enforced at runtime.",
    detail:
      "A YAML-defined Pydantic AI agent behind a stateless FastAPI service, with validated resume snapshots, browser preview, and deterministic PDF export through WeasyPrint. Session state is disposable: closing the tab discards it. Runs as a container on a self-hosted VPS behind scale-to-zero. Source is private.",
    stack: ["Python", "FastAPI", "Pydantic AI", "WeasyPrint", "React", "Docker"],
    links: [],
  },
  {
    slug: "workspace-infra",
    title: "workspace-infra",
    privateWork: true,
    summary: "A shared VPS gateway that side projects deploy onto instead of rebuilding.",
    proof: ["23 files", "Scale-to-zero", "Documented backup/restore"],
    problem:
      "Managed platforms cost more than a hobby project is worth, and every new app otherwise reinvents TLS, deploys, and backups from nothing.",
    approach:
      "A shared gateway applications opt into: Caddy terminating HTTPS, Sablier stopping idle containers and starting them again on the next request, a Docker socket proxy, shared PostgreSQL, and a documented deployment contract each app implements.",
    detail:
      "Small and documented: 23 files of shell, Makefiles, and Compose, plus docs covering how to onboard an app, health contracts, server bootstrap, and backup and restore including offsite copies. Tailor deploys onto it and never touches the shared platform itself. Source is private.",
    stack: ["Docker", "Caddy", "Sablier", "PostgreSQL", "Shell", "Make"],
    links: [],
  },
  {
    slug: "citation-benchmark",
    title: "LLM citation-hallucination benchmark",
    summary: "How often six frontier models fabricate a citation, measured across two languages.",
    proof: ["6 models × 328 prompts", "English + Arabic", "4-category rubric"],
    problem:
      "Language models fabricate and misattribute citations when they answer without tools. Anywhere a citation can be checked, that is a liability.",
    approach:
      "An async LLM-as-judge pipeline scoring citation accuracy across 328 English and Arabic prompts and 6 frontier models, against a four-category rubric: correct, correct refusal, misattribution, fabrication.",
    detail:
      "Pluggable providers (OpenAI, Azure, Anthropic, Google), Pydantic schemas, and resumable checkpointing across both the collection and judging phases. Modeled on Stanford RegLab’s legal_hallucinations. This is a research pipeline, not a service: about 30 files, with no test suite of its own.",
    stack: ["Python", "asyncio", "Pydantic", "OpenAI / Azure", "pandas"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Bukunmi2108/legal_hallucination_dataset_evaluation",
      },
    ],
  },
  {
    slug: "ml-first-principles",
    title: "ML from first principles",
    summary: "micrograd and makemore rebuilt from scratch, maintained as a running notebook.",
    proof: ["Gradients checked against PyTorch", "32,032-name corpus", "Maintained since Feb 2026"],
    problem: "Understand autograd and language models by building them instead of importing them.",
    approach:
      "Reimplemented micrograd’s reverse-mode autograd (Value graph, topological backprop, MLP), then worked the makemore series through tokenization and transformer language models.",
    detail:
      "Gradients validated against PyTorch; bigram language model trained on 32,032 names. Maintained continuously since February 2026 alongside the MSc financial-econometrics work.",
    stack: ["Python", "PyTorch (validation)", "NumPy"],
    links: [{ label: "GitHub", href: "https://github.com/Bukunmi2108/ml-journey" }],
  },
  {
    slug: "econometrics",
    title: "Cointegration & ECM/VECM",
    summary:
      "Do dual-listed Shell shares hold a long-run equilibrium, and how fast does it correct?",
    proof: ["1,511 trading days", "β ≈ 0.92", "18.5-day half-life"],
    problem:
      "Dual-listed shares of one company trade on two exchanges. If the law of one price holds, deviations should correct, and the speed of that correction is measurable.",
    approach:
      "Engle-Granger and Johansen cointegration tests over 1,511 trading days, then a VECM to estimate the adjustment dynamics.",
    detail:
      "The law of one price holds (β ≈ 0.92); deviations correct at about 3.7%/day (γ = −0.037), an 18.5-day half-life. MScFE 610 coursework.",
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
      "Ran the school’s ICT function and taught practical programming.",
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
    detail: "Financial econometrics: cointegration, ECM/VECM, LASSO, Diebold-Mariano testing.",
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
