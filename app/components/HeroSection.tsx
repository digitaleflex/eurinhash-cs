import Button from "./ui/Button";
import Image from "next/image";

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
  socialProof,
}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] -z-30" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C]/85 via-[#1A1F3C]/80 to-[#007CF0]/75 -z-10" />

      {/* Animated overlay effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007CF0]/15 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C48C]/15 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

      {/* Subtle grid overlay for tech feel */}
      <div
        className="absolute inset-0 opacity-10 -z-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 124, 240, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 124, 240, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto text-center relative z-10">
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#007CF0] rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#00C48C] rounded-full opacity-80 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-[#007CF0] rounded-full opacity-70 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <div
            className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#00C48C] rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title leading-tight drop-shadow-2xl">
          {title}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto font-medium drop-shadow-lg">
          {subtitle}
        </p>

        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 relative z-20">
          <div className="relative group">
            {/* Glow effect behind button */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#007CF0] to-[#00C48C] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <Button
              variant="primary"
              size="lg"
              onClick={onCTAClick}
              icon={<span>🚀</span>}
              className="relative shadow-2xl"
            >
              Accès VIP Gratuit
            </Button>
          </div>

          {socialProof && (
            <div className="text-sm text-gray-300 flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg" />
              <span className="drop-shadow-sm">{socialProof}</span>
            </div>
          )}
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm text-gray-200 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
              >
                <span className="text-[#00C48C] drop-shadow-sm">✓</span>
                <span className="drop-shadow-sm">{badge}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
