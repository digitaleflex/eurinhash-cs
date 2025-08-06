interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'muted';
  className?: string;
  animated?: boolean;
}

export default function Icon({ 
  name, 
  size = 'md',
  color = 'default',
  className = '',
  animated = false
}: IconProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl'
  };

  const colors = {
    default: 'text-white',
    primary: 'text-[#007CF0]',
    success: 'text-[#00C48C]',
    warning: 'text-yellow-400',
    muted: 'text-gray-400'
  };

  const animations = animated ? 'hover:scale-110 transition-transform duration-300' : '';

  return (
    <span className={`
      inline-block ${sizes[size]} ${colors[color]} ${animations} ${className}
    `}>
      {name}
    </span>
  );
}