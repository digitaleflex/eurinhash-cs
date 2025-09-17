import Section from '../ui/Section';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  background?: 'transparent' | 'dark' | 'gradient';
}

export default function ContentSection({ 
  title, 
  subtitle, 
  children,
  className = '',
  centered = false,
  background = 'transparent'
}: ContentSectionProps) {
  const backgrounds = {
    transparent: '',
    dark: 'bg-[#0A0F2C]/50 backdrop-blur-sm',
    gradient: 'bg-gradient-to-r from-[#1A1F3C]/50 to-[#007CF0]/20'
  };

  return (
    <Section className={`${backgrounds[background]} ${className}`}>
      {(title || subtitle) && (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
          {title && (
            <Heading level={2} gradient centered={centered} className="mb-4">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text size="lg" color="muted" centered={centered} className="max-w-3xl mx-auto">
              {subtitle}
            </Text>
          )}
        </div>
      )}
      {children}
    </Section>
  );
}