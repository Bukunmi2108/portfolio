import Link from "next/link";
import { Section } from "@/components/section";
import { formatDate, getRecentPosts } from "@/lib/writing";

export function WritingPreview() {
  const posts = getRecentPosts(3);

  return (
    <Section id="writing" label="Writing" title="Notes & papers">
      {posts.length === 0 ? (
        <p className="text-sm text-muted">Posts coming soon.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group flex flex-col gap-1.5 py-5"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted">
                    {formatDate(post.date)}
                  </span>
                  {post.status && (
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                      {post.status}
                    </span>
                  )}
                </div>
                <h3 className="font-medium tracking-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="text-sm text-muted">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Link
          href="/writing"
          className="font-mono text-xs transition-colors hover:text-accent"
        >
          View all →
        </Link>
      </div>
    </Section>
  );
}
