import Link from "next/link";
import { ReactNode } from "react";

type TocItem = { id: string; label: string };

interface LegalPageProps {
  title: string;
  description?: string;
  toc?: TocItem[];
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPage({ title, description, toc = [], lastUpdated, children }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
      <header className="mb-10">
        <nav className="text-sm mb-4 text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-foreground transition-colors">Accueil</Link></li>
            <li>/</li>
            <li><span className="text-foreground">{title}</span></li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-3xl">{description}</p>
        )}
        {lastUpdated && (
          <div className="mt-3 text-xs text-muted-foreground">Dernière mise à jour : {lastUpdated}</div>
        )}
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </article>

        <aside className="lg:sticky lg:top-24 h-fit hidden lg:block">
          <div className="rounded-2xl border border-foreground/10 bg-background p-4">
            <div className="text-sm font-semibold mb-3">Sommaire</div>
            <nav className="text-sm space-y-2">
              {toc.map((item) => (
                <div key={item.id}>
                  <Link href={`#${item.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}


