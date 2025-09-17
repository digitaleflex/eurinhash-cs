interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'info' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-gray-200 border-white/20',
    success: 'bg-[#00C48C]/10 text-[#00C48C] border-[#00C48C]/20',
    info: 'bg-[#007CF0]/10 text-[#007CF0] border-[#007CF0]/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`
      inline-flex items-center gap-2 rounded-full backdrop-blur-md border
      ${variants[variant]} ${sizes[size]} ${className}
      hover:bg-opacity-20 transition-all duration-300
    `}>
      {children}
    </span>
  );
}