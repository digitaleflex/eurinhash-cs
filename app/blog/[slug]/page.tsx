import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, posts } from "@/lib/content/posts";
import { formatPublishedDate, toPublishedDateString, toPublishedISOString } from "@/lib/content/dates";
import { createPageMetadata, siteConfig } from "@/lib/metadata";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) {
    return { title: "Article non trouvé", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: toPublishedISOString(post.publishedAt),
    image: post.thumbnail ? { url: post.thumbnail, alt: post.title } : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) notFound();

  const postUrl = new URL(`/blog/${post.slug}`, siteConfig.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: new URL(post.thumbnail ?? siteConfig.ogImage, siteConfig.url).toString(),
    datePublished: toPublishedISOString(post.publishedAt),
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose prose-invert max-w-none lg:prose-xl">
        <header className="not-prose mb-12">
          <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
            ← Tous les insights
          </Link>
          <div className="mb-4 mt-8 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <span className="text-muted-foreground" aria-hidden="true">•</span>
            <span className="text-xs text-muted-foreground">{post.readingTime} min de lecture</span>
          </div>
          <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
          <p className="border-l-4 border-accent pl-6 text-xl italic leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <time className="mt-5 block text-sm text-muted-foreground" dateTime={toPublishedDateString(post.publishedAt)}>
            Publié le {formatPublishedDate(post.publishedAt)}
          </time>
        </header>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="mb-12 aspect-video w-full rounded-2xl object-cover shadow-2xl"
          />
        )}

        <div
          className="content-area"
          dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.contentHtml) }}
        />
      </article>
    </main>
  );
}
