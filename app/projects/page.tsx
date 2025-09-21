export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">Projets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1,2,3,4,5,6].map((i) => (
          <div
            key={i}
            className="group rounded-lg border border-foreground/15 bg-background p-4 sm:p-6 transition shadow-sm hover:shadow-[0_0_24px] hover:shadow-accent/20 hover:border-foreground/30"
          >
            <div className="h-40 rounded-md bg-foreground/5 mb-4 transition group-hover:scale-[1.01]" />
            <h3 className="font-medium mb-1">Projet {i}</h3>
            <p className="text-sm text-muted-foreground">Courte description du projet et du résultat.</p>
          </div>
        ))}
      </div>
    </section>
  );
}


