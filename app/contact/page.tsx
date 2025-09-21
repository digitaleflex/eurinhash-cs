export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 md:px-8 py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Contact</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Nom</label>
            <input id="name" className="w-full rounded-md border border-foreground/20 bg-background px-3 py-3 outline-hidden focus-visible:outline-2 focus-visible:outline-ring min-h-[44px]" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" className="w-full rounded-md border border-foreground/20 bg-background px-3 py-3 outline-hidden focus-visible:outline-2 focus-visible:outline-ring min-h-[44px]" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="message">Message</label>
          <textarea id="message" rows={5} className="w-full rounded-md border border-foreground/20 bg-background px-3 py-3 outline-hidden focus-visible:outline-2 focus-visible:outline-ring min-h-[120px]" />
        </div>
        <button type="submit" className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent hover:shadow-[0_0_24px] hover:shadow-accent/30 w-full sm:w-auto min-h-[44px]">Envoyer</button>
      </form>
    </section>
  );
}


