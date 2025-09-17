import { useState } from 'react';
import { Card, Button, Badge, Heading, Text, Icon } from './ui';

interface ProgramCardProps {
  id: string;
  title: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  description: string;
  skills: string[];
  certification: string;
  career: string[];
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function ProgramCard({
  id,
  title,
  duration,
  level,
  price,
  description,
  skills,
  certification,
  career,
  icon,
  color
}: ProgramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = {
    blue: {
      primary: 'text-[#007CF0]',
      bg: 'bg-[#007CF0]/10',
      border: 'border-[#007CF0]/30',
      hover: 'hover:border-[#007CF0]/60'
    },
    green: {
      primary: 'text-[#00C48C]',
      bg: 'bg-[#00C48C]/10',
      border: 'border-[#00C48C]/30',
      hover: 'hover:border-[#00C48C]/60'
    },
    purple: {
      primary: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/30',
      hover: 'hover:border-purple-400/60'
    },
    orange: {
      primary: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-400/30',
      hover: 'hover:border-orange-400/60'
    },
    red: {
      primary: 'text-red-400',
      bg: 'bg-red-400/10',
      border: 'border-red-400/30',
      hover: 'hover:border-red-400/60'
    }
  };

  const levelColors = {
    'Débutant': 'bg-green-500/20 text-green-400',
    'Intermédiaire': 'bg-yellow-500/20 text-yellow-400',
    'Avancé': 'bg-red-500/20 text-red-400'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <Card 
      hover 
      glow 
      className={`group transition-all duration-300 ${colors[color].border} ${colors[color].hover}`}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon name={icon} size="xl" color={color === 'blue' ? 'primary' : color === 'green' ? 'success' : 'default'} animated />
        <Badge variant={level === 'Débutant' ? 'success' : level === 'Intermédiaire' ? 'warning' : 'default'} size="sm">
          {level}
        </Badge>
      </div>

      <Heading level={3} className={`mb-3 ${colors[color].primary} group-hover:scale-105 transition-transform`}>
        {title}
      </Heading>

      <Text color="muted" className="mb-4 leading-relaxed">
        {description}
      </Text>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon name="⏱️" size="sm" />
            <Text size="sm" color="muted">{duration}</Text>
          </div>
        </div>
        <Text size="lg" weight="bold" color={color === 'blue' ? 'primary' : 'success'}>
          {formatPrice(price)}
        </Text>
      </div>

      {/* Skills preview */}
      <div className="mb-4">
        <Text size="sm" weight="semibold" className="mb-2">Compétences clés :</Text>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="default" size="sm">
              +{skills.length - 3} autres
            </Badge>
          )}
        </div>
      </div>

      {/* Expand/Collapse button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mb-4"
        icon={<span>{isExpanded ? '▲' : '▼'}</span>}
      >
        {isExpanded ? 'Voir moins' : 'Voir plus de détails'}
      </Button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-700/50 animate-in slide-in-from-top duration-300">
          {/* All skills */}
          <div>
            <Text size="sm" weight="semibold" className="mb-2">Toutes les compétences :</Text>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="info" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div className={`p-3 rounded-lg ${colors[color].bg}`}>
            <Text size="sm" weight="semibold" className="mb-1">Certification :</Text>
            <Text size="sm" color="muted">{certification}</Text>
          </div>

          {/* Career opportunities */}
          <div>
            <Text size="sm" weight="semibold" className="mb-2">Débouchés professionnels :</Text>
            <ul className="space-y-1">
              {career.map((job, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Icon name="✓" size="sm" color="success" />
                  <Text size="sm" color="muted">{job}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          icon={<span>🚀</span>}
          onClick={() => console.log(`Register for ${title}`)}
        >
          S'inscrire maintenant
        </Button>
      </div>
    </Card>
  );
}