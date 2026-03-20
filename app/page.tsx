import dynamic from 'next/dynamic';
import Hero from '@/components/home/hero';
import Problem from '@/components/home/problem';
import Principles from '@/components/home/principles';
import Approach from '@/components/home/approach';
import Expertise from '@/components/home/expertise';

const Ecosystem = dynamic(() => import('@/components/home/ecosystem'), {
  ssr: true,
});
const Depth = dynamic(() => import('@/components/home/depth'), {
  ssr: true,
});
const CTASection = dynamic(() => import('@/components/home/cta'), {
  ssr: true,
});

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
