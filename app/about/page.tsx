export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">À propos</h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
        Je conçois des produits numériques clairs et durables. Mon focus : stratégie,
        design et ingénierie robuste — avec simplicité, performance et résultats concrets.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <div className="h-28 w-28 rounded-full overflow-hidden border border-foreground/20 grayscale">
          {/* Placeholder avatar - replace with /me.jpg */}
          <div className="h-full w-full bg-foreground/10" />
        </div>
      </div>
    </section>
  );
}


