import Button from '../ui/Button';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import Flex from '../ui/Flex';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  variant?: 'default' | 'gradient' | 'minimal';
  className?: string;
}

export default function CTASection({ 
  title, 
  description, 
  primaryButton,
  secondaryButton,
  variant = 'default',
  className = ''
}: CTASectionProps) {
  const content = (
    <div className="text-center">
      <Heading level={2} gradient className="mb-4">
        {title}
      </Heading>
      <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
        {description}
      </Text>
      <Flex justify="center" gap="lg" className="flex-col sm:flex-row">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#007CF0] to-[#00C48C] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <Button
            variant="primary"
            size="lg"
            onClick={primaryButton.onClick}
            icon={primaryButton.icon}
            className="relative"
          >
            {primaryButton.text}
          </Button>
        </div>
        {secondaryButton && (
          <Button
            variant="outline"
            size="lg"
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.text}
          </Button>
        )}
      </Flex>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className={`py-16 ${className}`}>
        {content}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`py-16 ${className}`}>
        <div className="bg-gradient-to-r from-[#007CF0]/10 to-[#00C48C]/10 rounded-2xl p-12 border border-[#007CF0]/20">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${className}`}>
      <Card variant="primary" padding="xl" rounded="2xl" glow>
        {content}
      </Card>
    </div>
  );
}