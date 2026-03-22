import dynamic from 'next/dynamic';
import Hero from "@/components/home/hero";
import ResultsSection from "@/components/home/results";
import ExpertiseSection from "@/components/home/expertise";
import BioSection from "@/components/home/bio";
import CommunitySection from "@/components/home/community";
import CTASection from "@/components/home/cta";
import { EventsSection } from "@/components/home/events";
import { BlogSection } from "@/components/home/blog";
import { ResourcesSection } from "@/components/home/resources";

export default function Home() {
  return (
    <main>
      <Hero />
      <ResultsSection />
      <ExpertiseSection />
      <CommunitySection />
      <EventsSection />
      <BlogSection />
      <ResourcesSection />
      <BioSection />
      <CTASection />
    </main>
  );
}
