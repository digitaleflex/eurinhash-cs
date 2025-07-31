interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = "", hover = true, glow = false }: CardProps) {
  return (
    <div className={`
      bg-[#1A1F3C]/80 backdrop-blur-sm border border-[#007CF0]/20 rounded-xl p-6
      ${hover ? 'hover:border-[#007CF0]/50 hover:scale-105 transition-all duration-300' : ''}
      ${glow ? 'shadow-lg shadow-[#007CF0]/10 hover:shadow-[#007CF0]/20' : ''}
      relative overflow-hidden group
      ${className}
    `}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#007CF0]/5 to-[#00C48C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}