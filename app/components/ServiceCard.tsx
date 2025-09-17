import { Card, Button, Badge, Heading, Text, Icon } from './ui';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  icon: string;
  popular?: boolean;
  onRequestQuote: (serviceId: string, serviceTitle: string) => void;
}

export default function ServiceCard({
  id,
  title,
  description,
  price,
  duration,
  includes,
  icon,
  popular = false,
  onRequestQuote
}: ServiceCardProps) {
  return (
    <Card 
      hover 
      glow={popular}
      className={`group relative ${popular ? 'border-[#00C48C] bg-[#00C48C]/5' : ''}`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="success" className="px-4 py-1">
            ⭐ Plus populaire
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <Icon name={icon} size="xl" color="primary" animated />
        <div className="text-right">
          <Text size="lg" weight="bold" color="primary" className="mb-1">
            {price}
          </Text>
          <Text size="sm" color="muted">
            {duration}
          </Text>
        </div>
      </div>

      <Heading level={3} className="mb-3 text-[#007CF0] group-hover:text-[#00C48C] transition-colors">
        {title}
      </Heading>

      <Text color="muted" className="mb-6 leading-relaxed">
        {description}
      </Text>

      {/* Includes */}
      <div className="mb-6">
        <Text size="sm" weight="semibold" className="mb-3">
          ✅ Ce qui est inclus :
        </Text>
        <ul className="space-y-2">
          {includes.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Icon name="✓" size="sm" color="success" />
              <Text size="sm" color="muted">{item}</Text>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Button
        variant={popular ? "primary" : "outline"}
        size="lg"
        className="w-full"
        onClick={() => onRequestQuote(id, title)}
        icon={<span>💬</span>}
      >
        Demander un devis
      </Button>

      {/* Additional info for popular service */}
      {popular && (
        <div className="mt-4 p-3 bg-[#00C48C]/10 rounded-lg border border-[#00C48C]/30">
          <Text size="xs" color="success" weight="semibold" className="flex items-center gap-2">
            <Icon name="⚡" size="sm" />
            Réponse sous 2h • Satisfaction garantie
          </Text>
        </div>
      )}
    </Card>
  );
}