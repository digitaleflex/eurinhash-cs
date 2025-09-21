export default function Home() {
  return (
    <section className="relative isolate">
      {/* Grid + gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* faint grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* soft radial gradient */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent_60%)]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Minimal triangle logo */}
          <svg
            className="h-16 w-16 text-foreground/80 transition duration-300 hover:rotate-3"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <path d="M50 10 L90 85 H10 Z" fill="currentColor" />
          </svg>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Concevoir et livrer avec clarté.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            J’apporte des outils et un savoir‑faire cloud pour créer des expériences web
            rapides, sécurisées et personnalisées.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30 w-full sm:w-auto min-h-[44px]"
            >
              Démarrer un projet
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent w-full sm:w-auto min-h-[44px]"
            >
              Voir mes projets
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
