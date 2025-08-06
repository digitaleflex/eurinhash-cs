interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  gradient?: boolean;
  centered?: boolean;
}

export default function Heading({ 
  children, 
  level = 2, 
  className = '',
  gradient = false,
  centered = false
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizes = {
    1: 'text-4xl md:text-6xl',
    2: 'text-3xl md:text-5xl',
    3: 'text-2xl md:text-4xl',
    4: 'text-xl md:text-3xl',
    5: 'text-lg md:text-2xl',
    6: 'text-base md:text-xl'
  };

  const baseClasses = `
    font-bold leading-tight
    ${sizes[level]}
    ${gradient ? 'bg-gradient-to-r from-[#007CF0] to-[#00C48C] bg-clip-text text-transparent' : ''}
    ${centered ? 'text-center' : ''}
    ${className}
  `;

  return (
    <Tag className={baseClasses}>
      {children}
    </Tag>
  );
}