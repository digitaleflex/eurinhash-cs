export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 md:px-8 py-24 md:py-32">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Contact</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Nom</label>
            <input id="name" className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 outline-hidden focus-visible:outline-2 focus-visible:outline-ring" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 outline-hidden focus-visible:outline-2 focus-visible:outline-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="message">Message</label>
          <textarea id="message" rows={5} className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 outline-hidden focus-visible:outline-2 focus-visible:outline-ring" />
        </div>
        <button type="submit" className="inline-flex items-center rounded-md border border-foreground/20 px-5 py-2 text-sm transition hover:border-accent hover:text-accent hover:shadow-[0_0_24px] hover:shadow-accent/30">Envoyer</button>
      </form>
    </section>
  );
}


