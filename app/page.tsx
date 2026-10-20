import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import ResultsSection from "@/components/home/results";
import ExpertiseSection from "@/components/home/expertise";
import BioSection from "@/components/home/bio";
import CTASection from "@/components/home/cta";
import { BlogSection } from "@/components/home/blog";

// Le layout fournit le titre, la description et l'Open Graph de la page
// d'accueil ; seul le canonical doit être déclaré ici.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ResultsSection />
      <ExpertiseSection />
      <BioSection />
      <BlogSection />
      <CTASection />
    </main>
  );
}
