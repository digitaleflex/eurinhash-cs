import Button from './ui/Button';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  description: string;
  onCTAClick: () => void;
  badges?: string[];
  socialProof?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  description, 
  onCTAClick, 
  badges = [],
  socialProof 
}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] opacity-90 -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007CF0]/20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C48C]/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title leading-tight">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto font-medium">
          {subtitle}
        </p>
        
        <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 relative z-20">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={onCTAClick}
            icon={<span>🚀</span>}
          >
            Accès VIP Gratuit
          </Button>
          
          {socialProof && (
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {socialProof}
            </div>
          )}
        </div>
        
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-300 bg-[#1A1F3C]/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-[#00C48C]">✓</span>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}