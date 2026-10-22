import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell flex min-h-[65vh] flex-col items-start justify-center py-24">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight">Cette page n’existe pas.</h1>
        <p className="mt-4 max-w-xl leading-7 text-white/60">Le lien est peut-être incorrect ou la page a été déplacée.</p>
        <div className="mt-8"><Button asChild variant="secondary"><Link href="/"><ArrowLeft size={16} /> Retour à l’accueil</Link></Button></div>
      </main>
      <SiteFooter />
    </>
  );
}
