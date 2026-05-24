import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date string (YYYY-MM-DD); relied on for lexical sort. */
  date: string;
  summary: string;
  tags: string[];
  /** Optional badge, e.g. "working paper". */
  status?: string;
  draft: boolean;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

/** YAML parses an unquoted `date:` as a Date; normalize everything to ISO YYYY-MM-DD. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : "";
}

function readPost(slug: string): Post | null {
  const fullPath = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // Required fields drive identity/ordering — warn loudly rather than ship silent defaults.
  if (!data.title) console.warn(`[writing] ${slug}: missing "title" in frontmatter`);
  const date = toIsoDate(data.date);
  if (!date) console.warn(`[writing] ${slug}: missing or invalid "date" in frontmatter`);
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    console.warn(`[writing] ${slug}: "tags" is not a list; ignoring`);
  }

  return {
    slug,
    title: data.title ?? slug,
    date,
    summary: data.summary ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    status: data.status,
    draft: data.draft ?? false,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file.replace(/\.mdx$/, "")))
    .filter((post): post is Post => post !== null && !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const post = readPost(slug);
  if (!post || post.draft) return null;
  return post;
}

export function getRecentPosts(count: number): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
