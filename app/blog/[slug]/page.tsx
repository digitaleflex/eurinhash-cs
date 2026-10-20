import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, posts } from "@/lib/content/posts";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) return { title: "Article non trouvé" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedPost(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: { "@type": "Person", name: "Eurin Hash" },
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
          <time className="mt-5 block text-sm text-muted-foreground" dateTime={post.publishedAt}>
            Publié le {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
          </time>
        </header>

        {post.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
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
