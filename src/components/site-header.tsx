import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="site-header">
      <div className="container-shell flex h-[76px] items-center justify-between gap-5">
        <Link className="wordmark" href="/" aria-label="EURINHASH, accueil">
          EURINH<span>A</span>SH
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? "page" : undefined}
              className={`nav-link ${current === link.href ? "nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Parlons de votre projet <ArrowUpRight size={15} /></Link>
          </Button>
        </div>
        <details className="mobile-nav md:hidden">
          <summary aria-label="Ouvrir le menu"><Menu size={21} /></summary>
          <nav aria-label="Navigation mobile">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/contact" className="mobile-nav-cta">Parlons de votre projet ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
