import Card from './ui/Card';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  stats?: string;
}

export default function FeatureCard({ icon, title, description, badge, stats }: FeatureCardProps) {
  return (
    <Card hover glow className="group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#007CF0] group-hover:text-[#00C48C] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>
      {badge && (
        <div className="inline-flex items-center gap-2 text-sm text-[#00C48C] bg-[#00C48C]/10 px-3 py-1 rounded-full">
          <span>✓</span>
          {badge}
        </div>
      )}
      {stats && (
        <div className="mt-3 text-sm font-semibold text-[#007CF0]">
          {stats}
        </div>
      )}
    </Card>
  );
}