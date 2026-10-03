import Hero from "@/components/home/hero";
import ResultsSection from "@/components/home/results";
import ExpertiseSection from "@/components/home/expertise";
import BioSection from "@/components/home/bio";
import CTASection from "@/components/home/cta";
import { BlogSection } from "@/components/home/blog";

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
