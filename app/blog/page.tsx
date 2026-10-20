import Link from "next/link";
import { posts } from "@/lib/content/posts";

export const metadata = {
  title: "Articles | Eurin Hash",
  description:
    "Des explications et retours d’expérience d’Eurin Hash sur les logiciels, le cloud, la cybersécurité et l’intelligence artificielle.",
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-20">
      <header className="mb-16 max-w-3xl">
        <p className="mb-4 text-sm font-semibold text-accent">Articles et retours d’expérience</p>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
          Comprendre la tech, <span className="text-accent">sans se perdre dans le jargon.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Des explications, des tutoriels et des leçons tirées de projets. Chaque article présente un sujet, explique pourquoi il compte et détaille les choix techniques utiles pour aller plus loin.
        </p>
      </header>

      {sortedPosts.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <article className="h-full overflow-hidden border-b border-border/60 pb-6">
                <div className="mb-5 flex aspect-video items-center justify-center overflow-hidden bg-muted">
                  {post.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="px-4 text-center text-sm text-muted-foreground">Article d’Eurin Hash</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-accent">{post.category}</span>
                <h2 className="mb-3 mt-2 text-xl font-bold leading-tight transition-colors group-hover:text-accent sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} min de lecture</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">Les archives sont en cours de préparation.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Les anciens articles doivent être récupérés avant leur remise en ligne. Nous les republierons après vérification afin de préserver leur contenu et leurs liens.
          </p>
        </div>
      )}
    </main>
  );
}
