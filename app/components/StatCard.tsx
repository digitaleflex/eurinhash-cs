interface StatCardProps {
  value: string;
  label: string;
  color?: 'blue' | 'green' | 'purple';
  trend?: string;
}

export default function StatCard({ value, label, color = 'blue', trend }: StatCardProps) {
  const colors = {
    blue: 'text-[#007CF0]',
    green: 'text-[#00C48C]',
    purple: 'text-purple-400'
  };

  return (
    <div className="text-center p-6 rounded-xl bg-[#1A1F3C]/50 backdrop-blur-sm border border-[#007CF0]/20 hover:border-[#007CF0]/50 transition-all duration-300 group">
      <div className={`text-4xl font-bold ${colors[color]} mb-2 group-hover:scale-110 transition-transform`}>
        {value}
      </div>
      <div className="text-gray-300 text-sm font-medium">
        {label}
      </div>
      {trend && (
        <div className="text-xs text-[#00C48C] mt-1 flex items-center justify-center gap-1">
          <span>↗</span>
          {trend}
        </div>
      )}
    </div>
  );
}