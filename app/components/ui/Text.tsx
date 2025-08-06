interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  centered?: boolean;
}

export default function Text({ 
  children, 
  size = 'base',
  color = 'default',
  weight = 'normal',
  className = '',
  centered = false
}: TextProps) {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const colors = {
    default: 'text-white',
    muted: 'text-gray-300',
    primary: 'text-[#007CF0]',
    success: 'text-[#00C48C]',
    warning: 'text-yellow-400'
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  return (
    <p className={`
      ${sizes[size]} ${colors[color]} ${weights[weight]}
      ${centered ? 'text-center' : ''}
      ${className}
    `}>
      {children}
    </p>
  );
}