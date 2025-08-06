import Heading from '../ui/Heading';
import Text from '../ui/Text';
import Badge from '../ui/Badge';
import Flex from '../ui/Flex';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'success' | 'info' | 'warning';
  }>;
  centered?: boolean;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  description,
  badges = [],
  centered = true,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`py-16 ${className}`}>
      <div className={centered ? 'text-center' : ''}>
        <Heading level={1} gradient centered={centered} className="mb-6">
          {title}
        </Heading>
        
        {subtitle && (
          <Text size="xl" color="muted" centered={centered} className="mb-6 max-w-3xl mx-auto">
            {subtitle}
          </Text>
        )}
        
        {description && (
          <Text size="lg" color="muted" centered={centered} className="mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </Text>
        )}
        
        {badges.length > 0 && (
          <Flex justify="center" wrap className="mb-8">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant}>
                <span>✓</span>
                {badge.text}
              </Badge>
            ))}
          </Flex>
        )}
      </div>
    </div>
  );
}