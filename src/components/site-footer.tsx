import Link from "next/link";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell grid gap-10 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link className="wordmark text-lg" href="/">EURINH<span>A</span>SH</Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
            Architecture technologique et entrepreneuriat numérique. Des idées pensées avec méthode, des solutions construites pour le réel.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
          <Link href="/projets" className="hover:text-white">Projets</Link>
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/a-propos" className="hover:text-white">À propos</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <a href="https://github.com/digitaleflex" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><Github size={17} /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={17} /></a>
        </div>
      </div>
      <div className="container-shell flex flex-col gap-2 border-t border-white/[0.08] py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} EURINHASH. Tous droits réservés.</span>
        <span>Conçu avec intention. Construit avec méthode.</span>
      </div>
    </footer>
  );
}
