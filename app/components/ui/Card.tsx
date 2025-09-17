interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function Card({ 
  children, 
  className = "", 
  hover = true, 
  glow = false,
  variant = 'default',
  padding = 'md',
  rounded = 'xl'
}: CardProps) {
  const variants = {
    default: 'bg-[#1A1F3C]/80 border-[#007CF0]/20',
    primary: 'bg-[#007CF0]/10 border-[#007CF0]/30',
    success: 'bg-[#00C48C]/10 border-[#00C48C]/30',
    glass: 'bg-white/5 border-white/10'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const roundings = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  return (
    <div className={`
      ${variants[variant]} backdrop-blur-sm border ${roundings[rounded]} ${paddings[padding]}
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