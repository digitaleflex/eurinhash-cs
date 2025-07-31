interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'dark' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
}

export default function Section({ 
  children, 
  className = "", 
  background = 'default',
  padding = 'lg'
}: SectionProps) {
  const backgrounds = {
    default: "",
    dark: "bg-[#1A1F3C]",
    gradient: "bg-gradient-to-r from-[#007CF0]/10 to-[#00C48C]/10"
  };
  
  const paddings = {
    sm: "py-12",
    md: "py-16", 
    lg: "py-20"
  };

  return (
    <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}