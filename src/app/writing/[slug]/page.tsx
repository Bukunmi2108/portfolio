import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Pluggable } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/writing";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const path = `/writing/${slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      // Override the inherited homepage URL with this post's canonical URL.
      url: path,
      // Explicit so OG inherits the site card (Next drops the file image when a
      // deeper route sets its own openGraph object).
      images: ["/og.png"],
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm] as Pluggable[],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
    ] as Pluggable[],
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Link
        href="/writing"
        className="font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        ← Writing
      </Link>

      <header className="mt-8">
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
        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-[0.7rem] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose mt-10">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      {(newer || older) && (
        <nav className="mt-16 flex justify-between gap-4 border-t border-border pt-8 font-mono text-xs">
          {older ? (
            <Link
              href={`/writing/${older.slug}`}
              className="max-w-[45%] text-muted transition-colors hover:text-foreground"
            >
              ← {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/writing/${newer.slug}`}
              className="max-w-[45%] text-right text-muted transition-colors hover:text-foreground"
            >
              {newer.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
