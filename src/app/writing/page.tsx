import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and working papers on applied AI, legal-AI, and evaluation.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Writing
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Notes &amp; papers
      </h1>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">Posts coming soon.</p>
      ) : (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-1.5 py-5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-muted">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    · {post.readingTime}
                  </span>
                  {post.status && (
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                      {post.status}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="text-sm text-muted">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
