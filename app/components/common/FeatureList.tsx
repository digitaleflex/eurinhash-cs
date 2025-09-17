import Grid from '../ui/Grid';
import FeatureCard from '../FeatureCard';

interface Feature {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  stats?: string;
}

interface FeatureListProps {
  features: Feature[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export default function FeatureList({ 
  features, 
  columns = 3,
  className = ''
}: FeatureListProps) {
  return (
    <Grid cols={columns} className={className}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          badge={feature.badge}
          stats={feature.stats}
        />
      ))}
    </Grid>
  );
}