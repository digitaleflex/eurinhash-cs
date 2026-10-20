import Link from "next/link";
import { posts } from "@/lib/content/posts";

export const metadata = {
  title: "Insights | Architecture, IA & Cybersécurité",
  description:
    "Analyses d’Eurin Hash sur l’architecture logicielle, l’IA appliquée, la cybersécurité, le cloud et les décisions techniques.",
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-20">
      <header className="mb-20 text-center">
        <h1 className="mb-4 text-6xl font-black uppercase tracking-tighter">
          Insights <span className="text-accent">Techniques</span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Analyses, tutoriels et réflexions sur les infrastructures de demain.
        </p>
      </header>

      {sortedPosts.length > 0 ? (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <article className="h-full overflow-hidden border-b border-border/60 pb-6">
                <div className="mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-muted">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">Eurin Hash Insights</span>
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {post.category}
                </span>
                <h2 className="mb-3 mt-2 text-2xl font-bold leading-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
                  </time>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime} min de lecture</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-border px-6 py-24 text-center">
          <p className="text-muted-foreground">
            Les prochains articles sont en préparation. Revenez bientôt.
          </p>
        </div>
      )}
    </main>
  );
}
