import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'minimal' | 'full';
}

export function Logo({
  size = 'md',
  showText = true,
  variant = 'default',
}: LogoProps) {
  const sizeClasses = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const LogoImage = () => (
    <div className="relative flex items-center justify-center">
      {/* Light Mode Logo (Pour fond clair) */}
      <Image
        src="/eurinhash_web_logo_fondclair.png"
        alt="Eurin Hash Logo"
        width={140}
        height={40}
        className="dark:hidden h-auto w-auto"
        style={{ maxHeight: sizeClasses[size] * 1.5 }}
        priority
      />
      {/* Dark Mode Logo (Pour fond sombre) */}
      <Image
        src="/eurinhash_web_logo_fondsombre.png"
        alt="Eurin Hash Logo"
        width={140}
        height={40}
        className="hidden dark:block h-auto w-auto"
        style={{ maxHeight: sizeClasses[size] * 1.5 }}
      />
    </div>
  );

  // Pour la variante full, on utilise la même logique car les images contiennent déjà le texte et le logo
  const FullLogoImage = LogoImage;

  if (variant === 'full') {
    return (
      <Link href="/" className="flex items-center gap-3 group">
        <FullLogoImage />
      </Link>
    );
  }

  // Minimal and Default variants use the Icon
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <LogoImage />
    </Link>
  );
}

