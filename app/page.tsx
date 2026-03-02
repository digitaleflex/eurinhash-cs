import Hero from '@/components/home/hero';
import Problem from '@/components/home/problem';
import Principles from '@/components/home/principles';
import Approach from '@/components/home/approach';
import Expertise from '@/components/home/expertise';
import Ecosystem from '@/components/home/ecosystem';
import Depth from '@/components/home/depth';
import CTASection from '@/components/home/cta';

export default function Home() {
  return (
    <main className="relative isolate flex flex-col gap-0 overflow-x-hidden">
      <Hero />
      <Problem />
      <Principles />
      <Approach />
      <Expertise />
      <Ecosystem />
      <Depth />
      <CTASection />
    </main>
  );
}
