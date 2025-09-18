import { Code2, Cloud, Brain } from "lucide-react";

export default function SkillsPage() {
  const items = [
    { icon: Code2, label: "Ingénierie" },
    { icon: Cloud, label: "Cloud" },
    { icon: Brain, label: "IA" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">Compétences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-foreground/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-sm">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


